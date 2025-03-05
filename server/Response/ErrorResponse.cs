using System.Net;

namespace server.Response
{
	public class ErrorResponse(HttpStatusCode _statusCode, string _title, string _message)
	{
		public HttpStatusCode StatusCode { get; set; } = _statusCode;
		public string Title { get; set; } = _title;
		public string Message { get; set; } = _message;
	}
}
