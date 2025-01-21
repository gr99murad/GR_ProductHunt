import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='flex flex-col gap-5 text-center'>
        <h1 className='text-3xl font-bold'>404</h1>
        <h2 className='text-2xl'>Page Not Found</h2>
        <Link to="/">
        
          <button className='btn bg-blue-500'>Go Back Home</button>
        </Link>
    </div>
    );
};

export default ErrorPage;