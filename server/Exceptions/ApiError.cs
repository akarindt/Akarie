namespace server.Exceptions
{
	public class ApiError(int _statusCode, string _title, string _message) : Exception(_message)
	{
		public int StatusCode { get; } = _statusCode;
		public string Title { get; } = _title;
	}
}
