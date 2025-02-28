namespace server.Response
{
    public class ErrorResponse(int _statusCode, string _title, string _message)
    {
        public int StatusCode { get; set; } = _statusCode;
        public string Title { get; set; } = _title;
        public string Messgae { get; set; } = _message;
    }
}
