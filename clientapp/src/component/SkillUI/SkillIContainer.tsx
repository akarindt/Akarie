import { Skill } from '@interface/skill';
import clsx from 'clsx';
import { HTMLAttributes } from 'react';
import Divider from '@component/Divider';
import SkillItem from './SkillItem';

const SkillContainer = (props: { dataItem: Skill } & HTMLAttributes<HTMLDivElement>) => {
    const { dataItem, className, ...rest } = props;

    return (
        <div className={clsx(className, 'px-4', 'py-8')} {...rest}>
            <div>
                <h1 className="font-bold text-xl">{dataItem.name}</h1>
                <Divider direction={'horizontal'} className="bg-web-200 dark:bg-web-400" />
            </div>
            <div className="grid grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 gap-5">
                {dataItem.items.map((item, idx) => (
                    <SkillItem key={idx} dataItem={item} />
                ))}
            </div>
        </div>
    );
};

export default SkillContainer;
