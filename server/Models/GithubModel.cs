namespace server.Models
{
    public class GithubUserInfo(string _avatarUrl, string _url, string _name, string _bio)
    {
        public string AvatarUrl { get; set; } = _avatarUrl;
        public string Url { get; set; } = _url;
        public string Name { get; set; } = _name;
        public string Bio { get; set; } = _bio;
    }

    public class GithubRepos(
        string _name,
        string _htmlUrl,
        string _description,
        int _stargazersCount,
        int _watchersCount,
        int _forksCount
    )
    {
        public string Name { get; set; } = _name;
        public string HtmlUrl { get; set; } = _htmlUrl;
        public string Description { get; set; } = _description;
        public int StargazersCount { get; set; } = _stargazersCount;
        public int WatchersCount { get; set; } = _watchersCount;
        public int ForksCount { get; set; } = _forksCount;
    }
}
