import { Skill } from '../interface/skill';

export default class Constants {
    public static readonly TIMEOUT_DURATION = 0.5 * 60 * 1000; // 30s
    public static readonly BASE_API = import.meta.env.VITE_BASE_URL;
    public static readonly DISCORD_PROFILE = 'https://discord.com/users/823036192467058699';
    public static readonly GITHUB_PROFILE = 'https://github.com/akarindt';
    public static readonly LINKEDIN_PROFILE = 'https://www.linkedin.com/in/thangnd3103/';
    public static readonly MAIL_ADDRESS = 'thang.nd3103@proton.me';
    public static readonly CDN_DISCORD = 'https://cdn.discordapp.com/avatars';
    public static readonly SKILLS: Skill[] = [
        {
            name: 'Languages',
            items: [
                {
                    name: 'Javascript',
                    className: 'js',
                    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
                },
                {
                    name: 'C#',
                    className: 'cs',
                    url: 'https://dotnet.microsoft.com/en-us/languages/csharp',
                },
                {
                    name: 'Typescript',
                    className: 'ts',
                    url: 'https://www.typescriptlang.org/',
                },
                {
                    name: 'Kotlin',
                    className: 'kotlin',
                    url: 'https://kotlinlang.org/',
                },
            ],
        },
        {
            name: 'Frameworks & Libraries',
            items: [
                {
                    name: 'ASP.NET',
                    className: 'dotnet',
                    url: 'https://dotnet.microsoft.com/en-us/apps/aspnet',
                },
                {
                    name: 'React',
                    className: 'react',
                    url: 'https://react.dev/',
                },
                {
                    name: 'Node.js',
                    className: 'nodejs',
                    url: 'https://nodejs.org/en',
                },
                {
                    name: 'Express.js',
                    className: 'express',
                    url: 'https://expressjs.com/',
                },
                {
                    name: 'JQuery',
                    className: 'jquery',
                    url: 'https://jquery.com/',
                },
                {
                    name: 'TailwindCSS',
                    className: 'tailwind',
                    url: 'https://tailwindcss.com/',
                },
                {
                    name: 'Bootstrap',
                    className: 'bootstrap',
                    url: 'https://getbootstrap.com/',
                },
            ],
        },
        {
            name: 'Databases',
            items: [
                {
                    name: 'PostgreSQL',
                    className: 'postgresql',
                    url: 'https://www.postgresql.org/',
                },
                {
                    name: 'MongoDB',
                    className: 'mongodb',
                    url: 'https://www.mongodb.com/',
                },
                {
                    name: 'MySQL',
                    className: 'mysql',
                    url: 'https://www.mysql.com/',
                },
            ],
        },
        {
            name: 'Tools & Platforms',
            items: [
                {
                    name: 'Docker',
                    className: 'docker',
                    url: 'https://www.docker.com/',
                },
                {
                    name: 'Bash',
                    className: 'bash',
                    url: 'https://en.wikipedia.org/wiki/Bash_(Unix_shell)',
                },
                {
                    name: 'Windows',
                    className: 'windows',
                    url: 'https://www.microsoft.com/en-us/windows',
                },
                {
                    name: 'Linux',
                    className: 'linux',
                    url: 'https://www.linux.org/',
                },
            ],
        },
    ];
    public static readonly SKILL_ICON_URL = 'https://skillicons.dev/icons';
}
