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
                context.Response.StatusCode = apiErr.StatusCode;
                await context.Response.WriteAsJsonAsync(
                    new ErrorResponse(apiErr.StatusCode, apiErr.Title, apiErr.Message)
                );
            }
            catch (Exception)
            {
                var internalServerError = 500;
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = internalServerError;
                await context.Response.WriteAsJsonAsync(
                    new ErrorResponse(
                        internalServerError,
                        "An error occurred.",
                        "Internal Server Error."
                    )
                );
            }
        }
    }
}
