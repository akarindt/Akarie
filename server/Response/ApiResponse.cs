namespace server.Response
{
    public class ApiResponse<T>(int _statusCode, string _responseText, T _data)
    {
        public int StatusCode { get; set; } = _statusCode;
        public string ResponseText { get; set; } = _responseText;
        public T Data { get; set; } = _data;
    }
}
