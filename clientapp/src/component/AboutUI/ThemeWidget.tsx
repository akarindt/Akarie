import clsx from 'clsx';
import { useContext } from 'react';
import { MdOutlineDarkMode, MdOutlineWbSunny } from 'react-icons/md';
import { AppContext } from '@context/AppContext';

const ThemeWidget = () => {
    const { theme, setTheme } = useContext(AppContext);

    const handleTheme = () => {
        setTheme(theme == 'dark' ? 'light' : 'dark');
    };

    return (
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
                'border-0',
                'bg-web-600'
            )}
        >
            <button
                onClick={handleTheme}
                className={clsx(
                    'text-xl',
                    'text-web-200',
                    'hover:text-web-50',
                    'transition-colors',
                    'ease-in-out',
                    'duration-300',
                    'cursor-pointer'
                )}
            >
                {theme == 'dark' ? <MdOutlineWbSunny /> : <MdOutlineDarkMode />}
            </button>
        </div>
    );
};

export default ThemeWidget;
