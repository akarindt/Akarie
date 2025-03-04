using System.Collections.Concurrent;
using System.Net;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using RestSharp;
using server.Exceptions;
using server.Helpers;
using server.Models;
using server.Response;

namespace server.Endpoints
{
	public static class GithubEndpoint
	{
		public static IEndpointRouteBuilder MapGithubEndpoint(this IEndpointRouteBuilder builder, IDistributedCache cache)
		{
			builder.MapGet(
				"user/info",
				async (HttpContext context) =>
				{
					var responseData = await cache.GetOrSetAsync(
						context.Request.GetEncodedUrl(),
						async () =>
						{
							var baseApi =
								Environment.GetEnvironmentVariable("GITHUB_BASE_API")
								?? throw new ApiError(
									HttpStatusCode.InternalServerError,
									"Internal Server Error.",
									"Internal Server Error."
								);

							var githubToken =
								Environment.GetEnvironmentVariable("GITHUB_TOKEN")
								?? throw new ApiError(
									HttpStatusCode.InternalServerError,
									"Internal Server Error.",
									"Internal Server Error."
								);

							var client = new RestClient($"{baseApi}/user");
							var request = new RestRequest { Method = Method.Get };

							request.AddHeader("Authorization", $"token {githubToken}");
							request.AddHeader("User-Agent", Constants.USER_AGENT);
							request.AddHeader("Accept", "application/vnd.github.v3+json");

							var response = await client.ExecuteAsync(request);

							if (!response.IsSuccessful)
							{
								throw new ApiError(HttpStatusCode.BadRequest, "Bad request.", "Unable to fetch Github API.");
							}

							if (string.IsNullOrEmpty(response.Content))
							{
								throw new ApiError(HttpStatusCode.NotFound, "Not found.", "Github user not found.");
							}

							var data =
								JsonConvert.DeserializeObject<GithubUserInfo>(response.Content)
								?? throw new ApiError(
									HttpStatusCode.BadRequest,
									"Data conversion error.",
									"Cannot convert response data."
								);

							return data;
						}
					);

					return Results.Json(
						new ApiResponse<GithubUserInfo>(HttpStatusCode.OK, "Success.", responseData!),
						contentType: "application/json"
					);
				}
			);

			builder.MapGet(
				"repos/info",
				async (HttpContext context) =>
				{
					var responseData = await cache.GetOrSetAsync(
						context.Request.GetEncodedUrl(),
						async () =>
						{
							var baseApi =
								Environment.GetEnvironmentVariable("GITHUB_BASE_API")
								?? throw new ApiError(
									HttpStatusCode.InternalServerError,
									"Internal Server Error.",
									"Internal Server Error."
								);

							var githubToken =
								Environment.GetEnvironmentVariable("GITHUB_TOKEN")
								?? throw new ApiError(
									HttpStatusCode.InternalServerError,
									"Internal Server Error.",
									"Internal Server Error."
								);

							var repos = Constants.REPOS;
							var data = new ConcurrentBag<GithubRepos>();

							var request = new RestRequest { Method = Method.Get };
							request.AddHeader("Authorization", $"token {githubToken}");
							request.AddHeader("User-Agent", Constants.USER_AGENT);
							request.AddHeader("Accept", "application/vnd.github.v3+json");

							async Task<GithubRepos?> fetch(string repo)
							{
								var client = new RestClient($"{baseApi}/{repo}");

								var response = await client.ExecuteAsync(request);

								if (!response.IsSuccessful)
								{
									return null;
								}

								if (string.IsNullOrEmpty(response.Content))
								{
									return null;
								}

								var converted =
									JsonConvert.DeserializeObject<GithubRepos>(response.Content)
									?? throw new ApiError(
										HttpStatusCode.BadRequest,
										"Data conversion error.",
										"Cannot convert response data."
									);
								return converted;
							}

							await Task.WhenAll(
								repos.Select(async repo =>
								{
									var fetchRepo = await fetch(repo);
									if (fetchRepo != null)
									{
										data.Add(fetchRepo);
									}
								})
							);

							return data.OrderBy(x => x.created_at).ToList();
						}
					);

					return Results.Json(
						new ApiResponse<IEnumerable<GithubRepos>>(HttpStatusCode.OK, "Success.", responseData!),
						contentType: "application/json"
					);
				}
			);
			return builder;
		}
	}
}
