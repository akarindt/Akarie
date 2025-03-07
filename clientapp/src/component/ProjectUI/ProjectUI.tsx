import clsx from 'clsx';
import ApiFetch from '@helper/apiFetch';
import { useEffect, useState } from 'react';
import { GithubRepos } from '@/src/interface/github';
import ProjectItem from './ProjectItem';

const ProjectUI = () => {
    const apiFetch = new ApiFetch();
    const [reposInfo, setReposInfo] = useState<GithubRepos[]>([]);

    useEffect(() => {
        const controller = new AbortController();

        const fetchRepos = async () => {
            const response = await apiFetch
                .get('github/repos/info')
                .set({
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    signal: controller.signal,
                })
                .fetch<GithubRepos[]>('json');

            if ('message' in response && 'title' in response) return;
            setReposInfo(response.data);
        };

        fetchRepos();

        return () => {
            controller.abort();
        };
    }, []);

    return (
        <section
            id="project-ui"
            className={clsx(
                'min-h-[100vh]',
                'w-[100%]',
                'bg-web-75',
                'dark:bg-web-500',
                'transition-colors duration-300 ease-in-out',
                'px-5'
            )}
        >
            <div
                className="container mx-auto py-32 flex flex-col gap-12"
                data-aos="fade-up"
                data-aos-duration="1000"
            >
                <h1 className="text-4xl text-center font-bold">Projects</h1>
                <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-5">
                    {reposInfo &&
                        reposInfo.map((repos, idx) => <ProjectItem key={idx} dataItem={repos} />)}
                </div>
            </div>
        </section>
    );
};

export default ProjectUI;
