import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BiUpvote } from "react-icons/bi";


const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));


    useEffect(() => {
        axios.get('http://localhost:5000/featured-products')
        .then(res => {
            setProducts(res.data.map(product => ({
                ...product,
                voted: product.votedBy.includes(user?.id)
            })));
        })
        .catch(error => {
            console.error("Error fetching featured products", error);
        });
    },[user?.id]);

    const handleUpvote = (productId) => {
        
        if(!user){
            navigate('/login');
            return;
        }
        axios.post(`http://localhost:5000/upvote/${productId}`, {userId: user.id})
        .then(() => {
            setProducts(prevProducts => prevProducts.map(product => 
                product._id === productId ? {...product, votes: product.votes + 1, voted: true} : product
            ));
        })
        .catch(error => {
            console.error("Error up voting product ", error);
        });
    }

    return (
        <div>
            <h2 className='text-xl font-bold my-4 text-center'>Featured Products</h2>
            <div className='grid grid-cols-1 md:grid-cols-2  gap-6'>
            {products.map(product => (
                <div key={product._id} className='border rounded p-4 shadow-md'>
                   <div className='flex gap-10'>
                   <img className='w-16 h-16 rounded ' src={product.image} alt={product.name} />
                    <div>
                    <h3 className='text-lg font-semibold cursor-pointer' onClick={() => navigate(`/products/${product._id}`)}>{product.name}</h3>
                    <p>{product.tags.join(', ')}</p>
                    </div>
                   </div>

                    <button className='btn flex items-center mt-2' onClick={() => handleUpvote(product._id)} disabled={product.voted}>
                        {product.votes} <BiUpvote></BiUpvote>
                    </button>

                </div>

            ))}
            </div>
        </div>
    );
};

export default FeaturedProducts;