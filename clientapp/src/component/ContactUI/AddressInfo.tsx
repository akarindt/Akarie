import Constants from '@helper/constants';
import Divider from '@component/Divider';
import clsx from 'clsx';
import ApiFetch from '@helper/apiFetch';
import { DiscordUserInfo } from '@interface/discord';
import { useEffect, useState } from 'react';
import { FaDiscord } from 'react-icons/fa';
import { LuGithub, LuMail } from 'react-icons/lu';

const AddressInfo = () => {
    const [discordInfo, setDiscordInfo] = useState<DiscordUserInfo | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchDiscord = async () => {
            const apiFetch = new ApiFetch();

            const response = await apiFetch
                .get('discord/user/info')
                .set({
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    signal: controller.signal,
                })
                .fetch<DiscordUserInfo>('json');

            if ('title' in response && 'message' in response) return;
            setDiscordInfo(response.data);
        };

        fetchDiscord();

        return () => {
            controller.abort();
        };
    }, []);

    return (
        <div className="hidden sm:flex flex-row items-stretch gap-5">
            <div>
                {discordInfo && (
                    <div className="flex flex-row gap-3 dark:bg-web-450 bg-web-100 px-3 py-4 max-w-[250px] w-[250px] rounded-[5px]">
                        <img
                            className="rounded-full w-[50px] h-[50px]"
                            src={`${Constants.CDN_DISCORD}/${discordInfo.id}/${discordInfo.avatar}`}
                        />
                        <div className="flex flex-col items-start">
                            <span className="font-bold text-md">{discordInfo.username}</span>
                            <div className="flex text-sm flex-row gap-1 items-start">
                                <FaDiscord className="my-auto" />
                                <span>Discord</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Divider direction="vertical" className="bg-web-200 dark:bg-web-400" />
            <div className="flex flex-col justify-center">
                <div>
                    <a
                        href={Constants.GITHUB_PROFILE}
                        target="_blank"
                        className={clsx(
                            'text-sm',
                            'text-web-400',
                            'hover:text-web-600',
                            'dark:text-web-200',
                            'dark:hover:text-web-50',
                            'transition-colors',
                            'ease-in-out',
                            'duration-300',
                            'flex',
                            'items-center',
                            'justify-start',
                            'gap-2'
                        )}
                    >
                        <LuGithub />
                        <span>{Constants.GITHUB_PROFILE}</span>
                    </a>
                </div>
                <div>
                    <a
                        href={`mailto:${Constants.MAIL_ADDRESS}`}
                        target="_blank"
                        className={clsx(
                            'text-sm',
                            'text-web-400',
                            'hover:text-web-600',
                            'dark:text-web-200',
                            'dark:hover:text-web-50',
                            'transition-colors',
                            'ease-in-out',
                            'duration-300',
                            'flex',
                            'items-center',
                            'justify-start',
                            'gap-2'
                        )}
                    >
                        <LuMail className="my-auto" />
                        <span>{Constants.MAIL_ADDRESS}</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AddressInfo;
