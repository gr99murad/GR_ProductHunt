import React from 'react';

const ContactUs = () => {
    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <h2 className="font-bold text-4xl text-center text-gray-900 dark:text-white">Contact Us</h2>
            <p className="text-center text-gray-600 dark:text-gray-300 py-4">
                We'd love to hear from you! Fill out the form below.
            </p>
            <form className="space-y-4">
                <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                />
                <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                />
                <input
                    type="text"
                    placeholder="Subject"
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                />
                <textarea
                    placeholder="Your Message"
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                ></textarea>
                <button
                    type="submit"
                    className="w-full p-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition duration-200"
                >
                    Send Message
                </button>
            </form>
        </div>
    );
};

export default ContactUs;
