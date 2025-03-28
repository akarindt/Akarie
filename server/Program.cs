using System.Net;
using System.Threading.RateLimiting;
using dotenv.net;
using Microsoft.Extensions.Caching.Distributed;
using server.Endpoints;
using server.Helpers;
using server.Middlewares;
using server.Response;

DotEnv.Load();

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddStackExchangeRedisCache(options =>
{
	var redisHost = Environment.GetEnvironmentVariable("REDIS_HOST");
	var redisPort = Environment.GetEnvironmentVariable("REDIS_PORT");
	var redisPassword = Environment.GetEnvironmentVariable("REDIS_PASS");

	options.Configuration = $"{redisHost}:{redisPort}";
	options.ConfigurationOptions = new StackExchange.Redis.ConfigurationOptions()
	{
		Password = redisPassword,
		AbortOnConnectFail = true,
		EndPoints = { options.Configuration },
	};
});

builder.Services.AddRateLimiter(options =>
{
	options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(httpContext =>
		RateLimitPartition.GetFixedWindowLimiter(
			partitionKey: httpContext.Request.Headers.Host.ToString(),
			factory: partition => new FixedWindowRateLimiterOptions
			{
				AutoReplenishment = true,
				PermitLimit = Constants.PERMIT_LIMIT,
				QueueLimit = Constants.QUEUE_LIMIT,
				Window = Constants.WINDOW,
			}
		)
	);

	options.OnRejected = async (context, token) =>
	{
		context.HttpContext.Response.StatusCode = (int)HttpStatusCode.TooManyRequests;
		context.HttpContext.Response.ContentType = "application/json";

		if (context.Lease.TryGetMetadata(MetadataName.RetryAfter, out var retryAfter))
		{
			await context.HttpContext.Response.WriteAsJsonAsync(
				new ErrorResponse(
					HttpStatusCode.TooManyRequests,
					"Too many request.",
					$"Please try again after {retryAfter.TotalMinutes} minute(s)."
				),
				token
			);
		}
		else
		{
			await context.HttpContext.Response.WriteAsJsonAsync(
				new ErrorResponse(HttpStatusCode.TooManyRequests, "Too many request.", "Please try again later."),
				token
			);
		}
	};
});

builder.Services.AddCors(options =>
{
	options.AddPolicy(
		name: "_default",
		builder =>
		{
			builder
				.WithOrigins(
					[
						Environment.GetEnvironmentVariable("ALLOWED_HTTP_DOMAIN")!,
						Environment.GetEnvironmentVariable("ALLOWED_HTTPS_DOMAIN")!,
					]
				)
				.AllowAnyHeader()
				.AllowAnyMethod();
		}
	);
});

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
	app.UseSwaggerUI(options =>
	{
		options.SwaggerEndpoint("/swagger/doc.json", "v1");
	});
}

app.UseStaticFiles();
app.UseMiddleware<GlobalErrorHandlingMiddlewares>();

app.UseRateLimiter();
app.UseHttpsRedirection();
app.UseCors("_default");

app.MapGroup("/github").WithTags("Github").MapGithubEndpoint(app.Services.GetRequiredService<IDistributedCache>());
app.MapGroup("/discord").WithTags("Discord").MapDiscordEndpoint(app.Services.GetRequiredService<IDistributedCache>());

app.Run();
