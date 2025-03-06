import clsx from 'clsx';
import { HTMLAttributes } from 'react';

const Divider = (
    props: { direction: 'horizontal' | 'vertical' } & HTMLAttributes<HTMLDivElement>
) => {
    const { className, direction, ...rest } = props;

    return (
        <>
            {direction == 'horizontal' ? (
                <hr {...rest} className={clsx('my-12 h-0.5 border-t-0', className)} />
            ) : (
                <div className="flex">
                    <div
                        {...rest}
                        className={clsx(
                            'inline-block h-max min-h-[1em] w-0.5 self-stretch',
                            className
                        )}
                    ></div>
                </div>
            )}
        </>
    );
};

export default Divider;
