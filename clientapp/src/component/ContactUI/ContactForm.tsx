import { RxPaperPlane } from 'react-icons/rx';
import clsx from 'clsx';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { ContactRequest } from '@interface/contact';
import ApiFetch from '@helper/apiFetch';
import { toast } from 'react-toastify';

const ContactForm = () => {
    const [contactRequest, setContactRequest] = useState<ContactRequest>({
        name: '',
        message: '',
        email: '',
    });

    const [totalCharacter, setTotalCharacter] = useState<number>(0);

    const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setContactRequest((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };

    useEffect(() => {
        setTotalCharacter(contactRequest.message.length);
    }, [contactRequest.message]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const apiFetch = new ApiFetch();
        const response = await apiFetch
            .post('discord/user/contact')
            .set({
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .fetch('json', JSON.stringify(contactRequest));

        if ('title' in response && 'message' in response) {
            toast.error('Failed to send message');
            return;
        }

        toast.success('Send message successfully!');
        setContactRequest({
            name: '',
            message: '',
            email: '',
        });
        return;
    };

    return (
        <>
            <div className="max-w-[540px] w-[100%]">
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            className={clsx(
                                'appearance-none',
                                'border',
                                'rounded w-full',
                                'py-2',
                                'px-3',
                                'text-web-450',
                                'dark:text-web-75',
                                'leading-tight',
                                'focus:outline-none',
                                'focus:shadow-outline'
                            )}
                            type="text"
                            name="name"
                            value={contactRequest.name}
                            required={true}
                            onChange={handleInput}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            className={clsx(
                                'appearance-none',
                                'border',
                                'rounded w-full',
                                'py-2',
                                'px-3',
                                'text-web-450',
                                'dark:text-web-75',
                                'leading-tight',
                                'focus:outline-none',
                                'focus:shadow-outline'
                            )}
                            type="email"
                            name="email"
                            value={contactRequest.email}
                            required={true}
                            onChange={handleInput}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <label htmlFor="message">Message</label>
                            <span className="text-sm">{totalCharacter}/1024</span>
                        </div>
                        <textarea
                            id="message"
                            className={clsx(
                                'appearance-none',
                                'border',
                                'rounded w-full',
                                'py-2',
                                'px-3',
                                'text-web-450',
                                'dark:text-web-75',
                                'leading-tight',
                                'focus:outline-none',
                                'focus:shadow-outline'
                            )}
                            name="message"
                            required={true}
                            rows={10}
                            value={contactRequest.message}
                            maxLength={1024}
                            onChange={handleInput}
                        />
                    </div>
                    <button
                        aria-label="send"
                        className={clsx(
                            'flex',
                            'flex-row',
                            'justify-center',
                            'items-center',
                            'gap-3',
                            'bg-button-100',
                            'p-2.5',
                            'rounded-[5px]',
                            'cursor-pointer',
                            'text-web-50'
                        )}
                        type="submit"
                    >
                        <RxPaperPlane />
                        <span>Send</span>
                    </button>
                </form>
            </div>
        </>
    );
};

export default ContactForm;
