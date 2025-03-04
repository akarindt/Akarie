using System.Net;

namespace server.Response
{
	public class ApiResponse<T>(HttpStatusCode _statusCode, string _responseText, T _data)
	{
		public HttpStatusCode StatusCode { get; set; } = _statusCode;
		public string ResponseText { get; set; } = _responseText;
		public T Data { get; set; } = _data;
	}
}
