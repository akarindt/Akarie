import clsx from 'clsx';
import AddressInfo from './AddressInfo';
import ContactForm from './ContactForm';

const ContactUI = () => {
    return (
        <section
            id="contact-ui"
            className={clsx(
                'min-h-[100vh]',
                'w-[100%]',
                'bg-web-75',
                'dark:bg-web-500',
                'transition-colors duration-300 ease-in-out',
                'px-5'
            )}
        >
            <div
                className="container mx-auto py-32 flex flex-col gap-12"
                data-aos="fade-up"
                data-aos-duration="1000"
            >
                <h1 className="text-4xl text-center font-bold">Get in Touch</h1>
                <div className="flex flex-col gap-5 justify-center items-center">
                    <AddressInfo />
                    <ContactForm />
                </div>
            </div>
        </section>
    );
};

export default ContactUI;
