namespace server.Endpoints
{
    public static class EmailEndpoint
    {
        public static IEndpointRouteBuilder MapEmailEndpoint(this IEndpointRouteBuilder builder)
        {
            builder.MapPost("user/mail", async () =>
            {
                
            });
            return builder;
        }
    }
}