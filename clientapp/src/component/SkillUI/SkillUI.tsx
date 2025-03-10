import Constants from '@helper/constants';
import clsx from 'clsx';
import SkillContainer from './SkillIContainer';

const SkillUI = () => {
    return (
        <section
            id="skill-ui"
            className={clsx(
                'min-h-[100vh]',
                'w-[100%]',
                'bg-web-50',
                'dark:bg-web-600',
                'transition-colors duration-300 ease-in-out',
                'px-5'
            )}
        >
            <div
                className="container mx-auto py-32 flex flex-col gap-12"
                data-aos="fade-up"
                data-aos-duration="1000"
            >
                <h1 className="text-4xl text-center font-bold">Skills</h1>
                <div className="flex flex-col gap-5">
                    {Constants.SKILLS.map((skill, item) => (
                        <SkillContainer dataItem={skill} key={item} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillUI;
