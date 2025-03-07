namespace server.Models
{
	public class GithubUserInfo
	{
		public string avatar_url { get; set; } = string.Empty;
		public string url { get; set; } = string.Empty;
		public string name { get; set; } = string.Empty;
		public string bio { get; set; } = string.Empty;
	}

	public class GithubRepos
	{
		public string name { get; set; } = string.Empty;
		public string html_url { get; set; } = string.Empty;
		public string description { get; set; } = string.Empty;
		public int stargazers_count { get; set; }
		public int watchers_count { get; set; }
		public int forks_count { get; set; }
		public string created_at { get; set; } = string.Empty;
		public string language { get; set; } = string.Empty;
	}
}
