import clsx from 'clsx';
import ProfileWidget from './ProfileWidget';
import ThemeWidget from './ThemeWidget';
import ClockWidget from './ClockWidget';

const AboutUI = () => {
    return (
        <section
            id="about-ui"
            className={clsx(
                'h-[100vh]',
                'w-[100%]',
                'bg-web-50',
                'dark:bg-web-500',
                'flex',
                'flex-col',
                'justify-center',
                'items-center',
                'transition-colors duration-300 ease-in-out'
            )}
        >
            <div data-aos="fade-up" data-aos-duration="1000">
                <div className="widget flex flex-row gap-2">
                    <ThemeWidget />
                    <ProfileWidget />
                    <ClockWidget />
                </div>
            </div>
        </section>
    );
};

export default AboutUI;
