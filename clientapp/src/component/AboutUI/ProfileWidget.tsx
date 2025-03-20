import clsx from 'clsx';
import { LiaLinkedinIn } from 'react-icons/lia';
import { LuGithub, LuMail } from 'react-icons/lu';
import { RxDiscordLogo } from 'react-icons/rx';
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
                    aria-label="linkedin-profile"
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
                    aria-label="github-profile"
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
                    aria-label="discord-profile"
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
                    aria-label="mail-address"
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
                    <LuMail />
                </a>
            </div>
        </div>
    );
};

export default ProfileWidget;
