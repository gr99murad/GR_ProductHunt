import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductReviewQueue = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const user = { role: 'moderator'};
        fetch('https://product-hunt-server-ivory.vercel.app/moderator/reviewQueue', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user}),
        })
        .then(res => res.json())
        .then(data => {
            
            if(Array.isArray(data)){
                setProducts(data);
            }else if (data.products && Array.isArray(data.products)){
                setProducts(data.products);
            }else{
                console.error('Unexpected response format', data);
            }
        })
        .catch((error) => console.error('Error fetching review queue:', error));
    }, []);

    const handleAction = (id, action) => {
        let endpoint = `products/${id}/status`;
        let body = { status: action};

        if(action === 'makeFeatured'){
            endpoint = `products/${id}/featured`;
            body = null;
        }

        fetch(`https://product-hunt-server-ivory.vercel.app/${endpoint}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body ? JSON.stringify(body) : null,
        })
        .then(res => res.json())
        .then(() => {
            setProducts((prev) => 
                prev.map((product) => product._id === id ? { ...product, status: action, isFeatured: action === 'makeFeatured' ? true : product.isFeatured } : product)
            
            );
        })
        .catch((error) => console.error(`Error performing ${action}:`, error));
    };

    // navigate product details
    const viewDetails = (id) => {
        navigate(`/products/${id}`);
    }
    return (
        <div>
            <h1 className='text-xl font-bold mb-4 text-center'>product review queue</h1>
            <table className='table-auto w-full border'>
                <thead>
                    <tr>
                        <th className='border px-4 py-2'>Product Name</th>
                        <th className='border px-4 py-2'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {Array.isArray(products) && products.length > 0 ? (
                        products.map((product) => (
                        
                            <tr key={product._id} className='border'>
                                <td className='border px-4 py-2'>{product.name}</td>
                                <td className='border px-4 py-2 space-x-2'>
                                    <button className='btn bg-blue-500 text-white px-4 py-2 rounded' onClick={() => handleAction(product._id, 'makeFeatured')} disabled = {product.isFeatured}>Make Featured</button>
                                    <button className=' btn bg-green-500 text-white px-4 py-2 rounded' disabled={product.status === 'accepted'} onClick={() => handleAction(product._id, 'accepted')} >Accept</button>
                                    <button className='btn bg-red-500 text-white px-4 py-2 rounded' disabled={product.status === 'rejected'} onClick={() => handleAction(product._id, 'rejected')}>Reject</button>
    
                                    <button className='btn' onClick={() => viewDetails(product._id)}>View Details</button>
                                </td>
                            </tr>
                        ))

                    ):(

                        <tr>
                            <td className='border px-4 py-2 text-center'>No Products in the review queue</td>
                        </tr>
                    )}
                    
                </tbody>

            </table>
        </div>
    );
};

export default ProductReviewQueue;