import React from 'react';

const ContactUs = () => {
    return (
        <div className='px-8'>
            <h2 className='font-bold text-4xl text-center'>Contact Us</h2>
            <p className='text-text text-center py-4'>We'd love to hear from you! Fill out the form below.</p>
            <form className='space-y-4'>
                <input type="text" placeholder='Your Name' className='w-full p-2 border rounded-lg ' required/>
                <input type="email" placeholder='Your Email' className='w-full p-2 border rounded-lg' required/>
                <input type="text" placeholder='Subject' className='w-full p-2 border rounded-lg' required/>
                <textarea placeholder='Your Message' className='w-full p-2 border rounded-lg h-32' required></textarea>
                <button type='submit' className='w-full p-2 bg-primary text-white rounded-lg'>Send Message</button>
                 
            </form>
        </div>
    );
};

export default ContactUs;