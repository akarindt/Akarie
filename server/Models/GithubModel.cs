using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace server.Models
{
    public class GithubUserInfo(string _avatar_url, string _url, string _name, string _bio)
    {
        public string avatar_url { get; set; } = _avatar_url;
        public string url { get; set; } = _url;
        public string name { get; set; } = _name;
        public string bio { get; set; } = _bio;
    }

    public class GithubRepos(string _name, string _html_url, string _description, int _stargazers_count, int _watchers_count, int _forks_count, string _created_at)
    {
        public string name { get; set; } = _name;
        public string html_url { get; set; } = _html_url;
        public string description { get; set; } = _description;
        public int stargazers_count { get; set; } = _stargazers_count;
        public int watchers_count { get; set; } = _watchers_count;
        public int forks_count { get; set; } = _forks_count;
        public string created_at { get; set; } = _created_at;

    }
}
