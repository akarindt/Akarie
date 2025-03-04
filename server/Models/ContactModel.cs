using System.ComponentModel.DataAnnotations;

namespace server.Models
{
	public class ContactModel
	{
		[Required(ErrorMessage = "Name is required")]
		public string name { get; set; } = string.Empty;

		[EmailAddress(ErrorMessage = "Invalid email format")]
		public string email { get; set; } = string.Empty;

		[Required(ErrorMessage = "Message is required"), MaxLength(1024, ErrorMessage = "Max length 1024 characters")]
		public string message { get; set; } = string.Empty;
	}
}
