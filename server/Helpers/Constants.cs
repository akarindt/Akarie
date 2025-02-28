namespace server.Helpers
{
    public static class Constants
    {
        public static readonly int PERMIT_LIMIT = 60;
        public static readonly int QUEUE_LIMIT = 0;
        public static readonly TimeSpan WINDOW = TimeSpan.FromMinutes(1);
        public static readonly string USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36";
    }
}
