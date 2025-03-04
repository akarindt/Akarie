using System.Net;

namespace server.Exceptions
{
	public class ApiError(HttpStatusCode _statusCode, string _title, string _message) : Exception(_message)
	{
		public HttpStatusCode StatusCode { get; } = _statusCode;
		public string Title { get; } = _title;
	}
}
