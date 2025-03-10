import { GithubRepos } from '@interface/github';
import clsx from 'clsx';
import { HTMLAttributes } from 'react';
import { CgGitFork } from 'react-icons/cg';
import { CiStar } from 'react-icons/ci';

const ProjectItem = (props: { dataItem: GithubRepos } & HTMLAttributes<HTMLAnchorElement>) => {
    const { dataItem, className, ...rest } = props;

    return (
        <a
            target="_blank"
            className={clsx(
                className,
                'border',
                'px-4',
                'py-8',
                ' rounded-[5px]',
                'hover:scale-102 ',
                'hover:bg-web-100',
                'dark:bg-web-450',
                'dark:hover:bg-web-600',
                'transition-transform',
                'duration-150',
                'ease-in-out'
            )}
            href={dataItem.html_url}
            {...rest}
        >
            <h1 className="font-bold text-xl">{dataItem.name}</h1>
            <p className="mt-2">{dataItem.description}</p>
            <div className="flex flex-row items-center gap-12">
                <div className="mt-2 flex flex-row items-center gap-1">
                    <div
                        className={clsx(
                            dataItem.language,
                            'w-[15px] h-[15px] rounded-full shrink-0'
                        )}
                    ></div>
                    <div className="leading-none align-middle">{dataItem.language}</div>
                </div>
                <div className="mt-2 flex flex-row gap-4 items-center">
                    <div className="flex flex-row items-center gap-1">
                        <CiStar className="text-xl" />
                        <div>{dataItem.stargazers_count}</div>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        <CgGitFork className="text-xl" />
                        <div>{dataItem.forks_count}</div>
                    </div>
                </div>
            </div>
        </a>
    );
};

export default ProjectItem;
