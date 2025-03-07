import clsx from 'clsx';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const ClockWidget = () => {
    const [blink, setBlink] = useState<boolean>(true);
    const [time, setTime] = useState<{ hour: string; minute: string }>({
        hour: dayjs().format('HH'),
        minute: dayjs().format('mm'),
    });

    useEffect(() => {
        const timeInterval = setInterval(() => {
            const newTime = {
                hour: dayjs().format('HH'),
                minute: dayjs().format('mm'),
            };
            setTime(newTime);
        }, 1000);

        const blinkInterval = setInterval(() => {
            setBlink((prev) => !prev);
        }, 650);

        return () => {
            clearInterval(timeInterval);
            clearInterval(blinkInterval);
        };
    }, []);

    return (
        <div
            className={clsx(
                'flex',
                'flex-row',
                'justify-center',
                'items-center',
                'gap-[1px]',
                'border',
                'px-4',
                'py-2',
                'rounded-[60px]',
                'border-0',
                'bg-web-100',
                'dark:bg-web-500'
            )}
        >
            <span className="text-sm">{time.hour}</span>
            <span
                className={`text-sm transition-opacity duration-150 ease-in-out ${
                    blink ? 'opacity-0' : 'opacity-100'
                }`}
            >
                :
            </span>
            <span className="text-sm">{time.minute}</span>
        </div>
    );
};

export default ClockWidget;
