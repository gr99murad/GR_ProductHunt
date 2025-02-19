import axios from 'axios';
import React, { useEffect, useState } from 'react';

const BestSellers = () => {
    const [BestSellers, setBestSellers] = useState([]);

    useEffect(() => {
        axios.get('https://product-hunt-server-ivory.vercel.app/best-sellers')
        .then(res => setBestSellers(res.data))
        .catch(error => console.error("Error fetching best sellers", error));
    },[]);
    return (
        <div>
            <h2 className='text-xl font-bold my-4 text-center'>Best sellers</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {BestSellers.map(product => (
                    <div key={product._id} className='border bg-[#f2f2f2] rounded p-4 shadow-md '>
                        <img className='w-16 h-16 rounded' src={product.image} alt={product.name} />
                        <h3 className='text-lg font-semibold'>{product.name}</h3>

                    </div>
                ))}
            </div>
            
        </div>
    );
};

export default BestSellers;