import clsx from 'clsx';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const ClockWidget = () => {
    const [blink, setBlink] = useState<boolean>(true);
    const [time, setTime] = useState<{ hour: number; minute: number }>({
        hour: dayjs().hour(),
        minute: dayjs().minute(),
    });

    useEffect(() => {
        const timeInterval = setInterval(() => {
            setTime({
                hour: dayjs().hour(),
                minute: dayjs().minute(),
            });
        }, 1000);

        const blinkInterval = setInterval(() => {
            setBlink(!blink);
        }, 800);

        return () => {
            clearInterval(timeInterval);
            clearInterval(blinkInterval);
        };
    });

    return (
        <div
            className={clsx(
                'flex',
                'flex-row',
                'justify-center',
                'items-center',
                'gap-1',
                'border',
                'px-4',
                'py-2',
                'rounded-[60px]',
                'border-0',
                'bg-web-600'
            )}
        >
            <span className="text-sm">{time.hour}</span>
            <span
                className={`text-sm transition-opacity duration-300 ease-in-out ${
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
