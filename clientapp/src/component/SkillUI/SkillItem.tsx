import Constants from '@helper/constants';
import clsx from 'clsx';
import { HTMLAttributes } from 'react';

const SkillItem = (
    props: {
        dataItem: {
            name: string;
            className: string;
            url: string;
        };
    } & HTMLAttributes<HTMLAnchorElement>
) => {
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
                'ease-in-out',
                'flex',
                'flex-col',
                'justify-center',
                'items-center',
                'gap-5'
            )}
            href={dataItem.url}
            {...rest}
        >
            <img
                alt={dataItem.className}
                src={`${Constants.SKILL_ICON_URL}?i=${dataItem.className}`}
            />
            <h1 className="font-bold text-xl">{dataItem.name}</h1>
        </a>
    );
};

export default SkillItem;
