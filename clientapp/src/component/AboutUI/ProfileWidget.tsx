import clsx from 'clsx';
import { LiaLinkedinIn } from 'react-icons/lia';
import { LuGithub } from 'react-icons/lu';
import { RxDiscordLogo } from 'react-icons/rx';
import { CiMail } from 'react-icons/ci';
import Constants from '@helper/constants';
import Divider from '@component/Divider';

const ProfileWidget = () => {
    return (
        <div id="profile-widget">
            <div
                className={clsx(
                    'flex',
                    'flex-row',
                    'justify-center',
                    'items-center',
                    'gap-2',
                    'border',
                    'px-4',
                    'py-2',
                    'rounded-[60px]',
                    'bg-web-100',
                    'dark:bg-web-500',
                    'border-0'
                )}
            >
                <a
                    href={Constants.LINKEDIN_PROFILE}
                    target="_blank"
                    className={clsx(
                        'text-xl',
                        'text-web-400',
                        'hover:text-web-600',
                        'dark:text-web-200',
                        'dark:hover:text-web-50',
                        'transition-colors',
                        'ease-in-out',
                        'duration-300'
                    )}
                >
                    <LiaLinkedinIn />
                </a>
                <Divider className="bg-web-200 dark:bg-web-400" direction="vertical" />
                <a
                    href={Constants.GITHUB_PROFILE}
                    target="_blank"
                    className={clsx(
                        'text-xl',
                        'text-web-400',
                        'hover:text-web-600',
                        'dark:text-web-200',
                        'dark:hover:text-web-50',
                        'transition-colors',
                        'ease-in-out',
                        'duration-300'
                    )}
                >
                    <LuGithub />
                </a>
                <Divider className="bg-web-200 dark:bg-web-400" direction="vertical" />
                <a
                    href={Constants.DISCORD_PROFILE}
                    target="_blank"
                    className={clsx(
                        'text-xl',
                        'text-web-400',
                        'hover:text-web-600',
                        'dark:text-web-200',
                        'dark:hover:text-web-50',
                        'transition-colors',
                        'ease-in-out',
                        'duration-300'
                    )}
                >
                    <RxDiscordLogo />
                </a>
                <Divider className="bg-web-200 dark:bg-web-400" direction="vertical" />
                <a
                    href={`mailto:${Constants.MAIL_ADDRESS}`}
                    target="_blank"
                    className={clsx(
                        'text-xl',
                        'text-web-400',
                        'hover:text-web-600',
                        'dark:text-web-200',
                        'dark:hover:text-web-50',
                        'transition-colors',
                        'ease-in-out',
                        'duration-300'
                    )}
                >
                    <CiMail />
                </a>
            </div>
        </div>
    );
};

export default ProfileWidget;
