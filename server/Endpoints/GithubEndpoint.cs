using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp;
using server.Helpers;
using server.Models;

namespace server.Endpoints
{
    public static class GithubEndpoint
    {
        public static IEndpointRouteBuilder MapGithubEndpoint(this IEndpointRouteBuilder builder)
        {
            builder.MapGet("user/info", async () =>
            {
                var client = new RestClient($"{Environment.GetEnvironmentVariable("GITHUB_BASE_API")}/user");
                var request = new RestRequest
                {
                    Method = Method.Get
                };
                request.AddHeader("Authorization", $"token {Environment.GetEnvironmentVariable("GITHUB_TOKEN")}");
                request.AddHeader("User-Agent", Constants.USER_AGENT);
                request.AddHeader("Accept", "application/vnd.github.v3+json");

                var response = await client.ExecuteAsync(request);
            });

            return builder;
        }
    }
}
