import axios from 'axios';
import React, { useEffect, useState } from 'react';

const NewArrivals = () => {
    const [newArrivals, setNewArrivals] = useState([]);

    useEffect(() => {
        axios.get('https://product-hunt-server-ivory.vercel.app/new-arrivals')
        .then(res => setNewArrivals(res.data))
        .catch(error => console.error("Error fetching new arrivals", error));
    },[]);
    return (
        <div>
            <h2>New Arrivals</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {newArrivals.map(product => (
                    <div key={product._id} className='border bg-[#f2f2f2] rounded p-4 shadow-md '>
                        <img className='w-16 h-16 rounded' src={product.image} alt={product.name} />
                        <h3 className='text-lg font-semibold'>{product.name}</h3>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewArrivals;