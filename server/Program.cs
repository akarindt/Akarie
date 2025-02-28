using System.Threading.RateLimiting;
using dotenv.net;
using server.Endpoints;
using server.Helpers;
using server.Middlewares;
using server.Response;

DotEnv.Load();

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();
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
        var rejectionStatusCode = 429;
        context.HttpContext.Response.StatusCode = rejectionStatusCode;
        context.HttpContext.Response.ContentType = "application/json";

        if (context.Lease.TryGetMetadata(MetadataName.RetryAfter, out var retryAfter))
        {
            await context.HttpContext.Response.WriteAsJsonAsync(
                new ErrorResponse(
                    rejectionStatusCode,
                    "Too many request.",
                    $"Please try again after {retryAfter.TotalMinutes} minute(s)."
                ),
                token
            );
        }
        else
        {
            await context.HttpContext.Response.WriteAsJsonAsync(
                new ErrorResponse(
                    rejectionStatusCode,
                    "Too many request.",
                    "Please try again later."
                ),
                token
            );
        }
    };
});

var app = builder.Build();
if (app.Environment.IsDevelopment())
    app.MapOpenApi();

app.UseMiddleware<GlobalErrorHandlingMiddlewares>();

app.UseRateLimiter();
app.UseHttpsRedirection();

app.MapGroup("/api/v1/").WithTags("Github").MapGithubEndpoint();
app.Run();
