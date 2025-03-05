export interface GithubUserInfo {
    avatar_url: string;
    url: string;
    name: string;
    bio: string;
}

export interface GithubRepos {
    name: string;
    html_url: string;
    description: string;
    stargazers_count: number;
    watchers_count: number;
    forks_count: number;
    created_at: string;
}
