import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BiUpvote } from "react-icons/bi";
import AuthContext from '../context/AuthContext/AuthContext';

const TrendingProducts = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);


    useEffect(() => {
        axios.get('https://product-hunt-server-ivory.vercel.app/trendingProducts')
        .then(res => {
            setProducts(res.data.map(product => ({
                ...product,
                voted: product.votedBy.includes(user?.id)
            })));
        })
        .catch(error => {
            console.error("Error fetching trending products", error);
        });
    },[user?.id]);

    const handleUpvote = (productId) => {
        
        if(!user){
            navigate('/login');
            return;
        }

        // the product already have voted
        const product = products.find((product) => product._id === productId);
        if(product?.voted){
            alert("You have already voted for this product");
            return;
        }
        axios.post(`https://product-hunt-server-ivory.vercel.app/upvote/${productId}`, {userId: user.uid})
        .then((response) => {
            
                if(response.data.message === "User has already voted"){
                    alert("You have already voted this product");
                    return;
                }
            
            setProducts((prevProducts) => 
                prevProducts.map((product) => 
                product._id === productId 
                       ? {...product, votes: product.votes + 1, voted: true}
                        : product
                )
            )
        })
        .catch(error => {
            console.error("Error up voting product ", error);
        });
    }


    return (
        <div>
            <h2 className='text-xl font-bold my-4 text-center'>Trending Products</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {products.map(product => (
                <div key={product._id} className='border rounded p-4'>
                    <img className='w-16 h-16 rounded ' src={product.image} alt={product.name} />
                    <div>
                    <h3 className='text-lg font-semibold cursor-pointer' onClick={() => navigate(`/products/${product._id}`)}>{product.name}</h3>
                    <p>{product.tags.join(', ')}</p>
                    </div>


                    <button className='btn flex items-center mt-2' onClick={() => handleUpvote(product._id)} disabled={product.voted}>
                        {product.votes} {product.voted ? 'upvote' : 'Voted'} <BiUpvote></BiUpvote>
                    </button>

                </div>

            ))}
            </div>
            <div className='mt-6'>
                <button onClick={() => navigate('/products')} className='px-4 py-2 bg-blue-600 text-white rounded'>Show All Products</button>

            </div>
        </div>
    );
};


export default TrendingProducts;