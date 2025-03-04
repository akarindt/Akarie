using System.Net;
using server.Exceptions;
using server.Response;

namespace server.Middlewares
{
	public class GlobalErrorHandlingMiddlewares(RequestDelegate next)
	{
		private readonly RequestDelegate _next = next;

		public async Task InvokeAsync(HttpContext context)
		{
			try
			{
				await _next(context);
			}
			catch (ApiError apiErr)
			{
				context.Response.ContentType = "application/json";
				context.Response.StatusCode = (int)apiErr.StatusCode;
				await context.Response.WriteAsJsonAsync(new ErrorResponse(apiErr.StatusCode, apiErr.Title, apiErr.Message));
			}
			catch (Exception ex)
			{
				context.Response.ContentType = "application/json";
				context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

				var message =
					Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development"
						? ex.Message
						: "Internal Server Error";

				await context.Response.WriteAsJsonAsync(
					new ErrorResponse(HttpStatusCode.InternalServerError, "An error occurred.", message)
				);
			}
		}
	}
}
