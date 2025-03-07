import clsx from 'clsx';
import ProfileWidget from './ProfileWidget';
import ThemeWidget from './ThemeWidget';
import ClockWidget from './ClockWidget';
import { SlArrowDown } from 'react-icons/sl';

const AboutUI = () => {
    return (
        <section
            id="about-ui"
            className={clsx(
                'min-h-[100vh]',
                'w-[100%]',
                'bg-web-50',
                'dark:bg-web-600',
                'flex',
                'flex-col',
                'justify-center',
                'items-center',
                'transition-colors duration-300 ease-in-out',
                'relative',
                'px-5'
            )}
        >
            <div
                data-aos="fade-up"
                data-aos-duration="1000"
                className={clsx('flex', 'flex-col', 'justify-center', 'items-center')}
            >
                <div className="widget flex flex-row gap-2">
                    <ThemeWidget />
                    <ProfileWidget />
                    <ClockWidget />
                </div>
                <div className="mt-6 max-w-[500px] flex flex-col justify-center items-center gap-3">
                    <h1 className="text-4xl text-center font-bold">Welcome to my website.</h1>
                    <img
                        className="h-[75px] w-[75px] rounded-full text-justify"
                        src="https://avatars.githubusercontent.com/u/78296824"
                    />
                    <p className="text-lg text-center">
                        Hi, I'm Akari—a web developer who enjoys creating things while improving my
                        skills through hands-on projects. Feel free to contact me or just say hi!
                    </p>
                </div>
            </div>
            <div className="absolute bottom-10 w-[500px] flex flex-col justify-self-end items-center gap-3 max-w-[500px]">
                <span className="text-sm">Scroll down</span>
                <SlArrowDown className="text-sm animate-bounce" />
            </div>
        </section>
    );
};

export default AboutUI;
