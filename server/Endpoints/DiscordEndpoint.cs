using System.ComponentModel.DataAnnotations;
using System.Net;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using RestSharp;
using server.Exceptions;
using server.Helpers;
using server.Models;
using server.Response;

namespace server.Endpoints
{
	public static class DiscordEndpoint
	{
		public static IEndpointRouteBuilder MapDiscordEndpoint(this IEndpointRouteBuilder builder, IDistributedCache cache)
		{
			builder.MapGet(
				"user/info",
				async (HttpContext context) =>
				{
					var responseData = await cache.GetOrSetAsync(
						context.Request.GetEncodedUrl(),
						async () =>
						{
							var userDiscordId =
								Environment.GetEnvironmentVariable("USER_DISCORD_ID")
								?? throw new ApiError(
									HttpStatusCode.InternalServerError,
									"Internal Server Error.",
									"Internal Server Error."
								);

							var discordBotToken =
								Environment.GetEnvironmentVariable("DISCORD_BOT_TOKEN")
								?? throw new ApiError(
									HttpStatusCode.InternalServerError,
									"Internal Server Error.",
									"Internal Server Error."
								);

							var client = new RestClient($"https://discord.com/api/v10/users/{userDiscordId}");
							var request = new RestRequest { Method = Method.Get };
							request.AddHeader("Authorization", $"Bot {discordBotToken}");

							var response = await client.ExecuteAsync(request);
							if (!response.IsSuccessful)
							{
								throw new ApiError(HttpStatusCode.BadRequest, "Bad request.", "Unable to fetch Discord API");
							}

							if (string.IsNullOrEmpty(response.Content))
							{
								throw new ApiError(HttpStatusCode.NotFound, "Not found.", "Discord user not found.");
							}

							var data =
								JsonConvert.DeserializeObject<DiscordUserInfo>(response.Content)
								?? throw new ApiError(
									HttpStatusCode.BadRequest,
									"Data conversion error.",
									"Cannot convert response data."
								);

							return data;
						}
					);

					return Results.Json(
						new ApiResponse<DiscordUserInfo>(HttpStatusCode.OK, "Success.", responseData!),
						contentType: "application/json"
					);
				}
			);

			builder.MapPost(
				"user/contact",
				async ([FromBody] ContactModel body) =>
				{
					var validationResults = new List<ValidationResult>();
					var context = new ValidationContext(body);

					if (!Validator.TryValidateObject(body, context, validationResults, true))
					{
						throw new ApiError(HttpStatusCode.NotAcceptable, "Validation error.", "Please check again.");
					}

					var userDiscordId =
						Environment.GetEnvironmentVariable("USER_DISCORD_ID")
						?? throw new ApiError(
							HttpStatusCode.InternalServerError,
							"Internal Server Error.",
							"Internal Server Error."
						);
					var webhookUrl =
						Environment.GetEnvironmentVariable("DISCORD_WEBHOOK_URL")
						?? throw new ApiError(
							HttpStatusCode.InternalServerError,
							"Internal Server Error.",
							"Internal Server Error."
						);

					var client = new RestClient(webhookUrl);
					var request = new RestRequest { Method = Method.Post };

					request.AddBody(
						new
						{
							content = $"<@{userDiscordId}> New Form submission arrived!",
							embeds = new[]
							{
								new
								{
									fields = new[]
									{
										new
										{
											name = "Name",
											value = body.name,
											inline = true,
										},
										new
										{
											name = "Email",
											value = body.email,
											inline = true,
										},
										new
										{
											name = "Message",
											value = body.message,
											inline = false,
										},
									},
									color = Constants.PRIMARY_EMBED_COLOR,
									timestamp = DateTime.UtcNow.ToString("o"),
								},
							},
							allowed_mentions = new { parse = new[] { "users" } },
						}
					);

					var response = await client.ExecuteAsync(request);
					var message = response.IsSuccessful ? "Success." : "Failed";
					return Results.Json(
						new ApiResponse<string>(response.StatusCode, message, message),
						contentType: "application/json"
					);
				}
			);
			return builder;
		}
	}
}
