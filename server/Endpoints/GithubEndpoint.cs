using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp;
using server.Exceptions;
using server.Helpers;
using server.Models;
using server.Response;
using System.Collections.Concurrent;
using System.Reflection.Metadata.Ecma335;

namespace server.Endpoints
{
    public static class GithubEndpoint
    {
        public static IEndpointRouteBuilder MapGithubEndpoint(this IEndpointRouteBuilder builder)
        {
            builder.MapGet(
                "user/info",
                async () =>
                {
                    var client = new RestClient($"{Environment.GetEnvironmentVariable("GITHUB_BASE_API")}/user");

                    var request = new RestRequest { Method = Method.Get };
                    request.AddHeader("Authorization", $"token {Environment.GetEnvironmentVariable("GITHUB_TOKEN")}");
                    request.AddHeader("User-Agent", Constants.USER_AGENT);
                    request.AddHeader("Accept", "application/vnd.github.v3+json");

                    var response = (await client.ExecuteAsync(request)).Content ?? throw new ApiError(400, "Bad request.", "Cannot fetch Github API.");
                    var data = JsonConvert.DeserializeObject<GithubUserInfo>(response) ?? throw new ApiError(404, "Not found.", "User not found.");

                    var responseData = new ApiResponse<GithubUserInfo>(200, "Success.", data);
                    return Results.Json(responseData);
                }
            );

            builder.MapGet(
                "repos/info",
                async () =>
                {
                    var repos = Constants.REPOS;
                    var data = new ConcurrentBag<GithubRepos>();

                    var request = new RestRequest { Method = Method.Get };
                    request.AddHeader("Authorization", $"token {Environment.GetEnvironmentVariable("GITHUB_TOKEN")}");
                    request.AddHeader("User-Agent", Constants.USER_AGENT);
                    request.AddHeader("Accept", "application/vnd.github.v3+json");

                    async Task<GithubRepos?> fetch(string repo)
                    {
                        var client = new RestClient($"{Environment.GetEnvironmentVariable("GITHUB_BASE_API")}/{repo}");

                        var response = (await client.ExecuteAsync(request)).Content;
                        if (response == null) return null;

                        var converted = JsonConvert.DeserializeObject<GithubRepos>(response);
                        return converted;
                    }

                    await Task.WhenAll(repos.Select(async repo =>
                    {
                        var fetchRepo = await fetch(repo);
                        if (fetchRepo != null)
                        {
                            data.Add(fetchRepo);
                        }
                    }));

                    var responseData = new ApiResponse<IEnumerable<GithubRepos>>(200, "Success.", data.OrderBy(x => x.created_at).ToList());
                    return Results.Json(responseData);
                }
            );
            return builder;
        }
    }
}
