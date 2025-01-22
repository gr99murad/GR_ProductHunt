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
            {products.map(product => (
                <div key={product._id} className=''>
                    <img className='w-16 h-16 ' src={product.image} alt={product.name} />
                    <h3 onClick={() => navigate(`/products/${product._id}`)}>{product.name}</h3>
                    <p>{product.tags.join(', ')}</p>

                    <button onClick={() => handleUpvote(product._id)} disabled={product.voted}>
                        {product.votes} <BiUpvote></BiUpvote>
                    </button>

                </div>

            ))}
        </div>
    );
};

export default FeaturedProducts;