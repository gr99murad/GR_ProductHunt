import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext/AuthContext';
import { BiUpvote } from 'react-icons/bi';
import Products from './Products';


const ProductDetails = () => {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [reviewDescription, setReviewDescription] = useState('');
    const [rating, setRating] = useState(0);
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();


    useEffect(() => {
        // fetch product details
        axios.get(`http://localhost:5000/products/${id}`)
        .then(res => setProduct(res.data))
        .catch(error => console.error('Error fetching product details:', error));


        // fetch reviews for the product
        axios.get(`http://localhost:5000/reviews/${id}`)
        .then(res => setReviews(res.data))
        .catch(error => console.error('Error fetching reviews:', error));



    },[id]);

    const handleUpvote = (productId) => {
        
        if(!user){
            navigate('/login');
            return;
        }

        // the product already have voted
        
        if(product?.voted){
            alert("You have already voted for this product");
            return;
        }
        axios.post(`http://localhost:5000/upvote/${productId}`, {userId: user.uid})
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

    const handleReport = () =>{
        if(!user){
            navigate('/login');
            return;
        }

        axios.post(`http://localhost:5000/report/${id}`, { userId: user.id})
        .then(() => alert('product reported successfully'))
        .catch(error => console.error('Error reporting product:', error));
    };

    const handleReviewSubmit = (e) =>{
        e.preventDefault();

        const review = {
            productId: id,
            reviewerName: user?.displayName,
            reviewerImage: user?.photoURL,
            reviewDescription,
            rating,
        };

        axios.post('http://localhost:5000/reviews', review)
        .then(() => {
            setReviews(prevReviews => [...prevReviews, review]);
            setReviewDescription('');
            setRating(0);
        })
        .catch(error => console.error('Error submitting review', error));
    };

    if(!product){
        return <div>Loading...</div>
    }
    return (
        <div className='container mx-auto my-8 px-4'>
        <h2 className='text-xl font-bold text-center mb-4'>Product Details</h2>
            <div className='border rounded p-4 shadow-md'>
                <img className=' rounded mb-4' src={product.image} alt={product.name} />
                <h1 className='text-2xl font-bold'>{product.name}</h1>
                <p>{product.description}</p>
                <p>Tags: {product.tags.join(', ')}</p>
                <p>Votes: {product.votes}</p>

                <button className='btn mt-2' onClick={() => handleUpvote(product._id)} disabled={product.voted}>
                     {product.votes} {product.voted ? 'upvote' : 'Voted'} <BiUpvote></BiUpvote>
                </button>

                <button className='btn mt-2 ml-4' onClick={handleReport}>Report</button>
            </div>


            <div className='my-8'>
                <h2 className='text-xl font-bold text-center'>Reviews</h2>
                {reviews.map((review, index) => (
                    <div key={index} className='border rounded p-4 my-2'>
                        <div className='flex items-center gap-4'>
                            <img src={review.reviewerImage} alt={review.reviewerName} className='w-12 h-12 rounded-full' />
                            <h3 className='font-semibold'>{review.reviewerName}</h3>

                        </div>
                        <p>{review.reviewDescription}</p>
                        <p>Rating: {review.rating}</p>

                    </div>
                ))}

            </div>

            {/* post review section */}
            <div className='my-8'>
                <h2 className='text-xl font-bold text-center'>Post a Review</h2>
                <form onSubmit={handleReviewSubmit}>
                    <div className='mb-4'>
                        <label className='label'>Reviewer Name</label>
                        <input type="text" value={user?.displayName || ''} readOnly className='input input-bordered' />

                    </div>
                    <div className='mb-4'>
                        <label className='label'>Reviewer Image</label>
                        <input type="text" value={user?.photoURL || ''} readOnly className='input input-bordered' />

                    </div>

                    <div className='mb-4'>
                        <label className='label'>Reviewer Description</label>
                        <textarea value={reviewDescription} onChange={(e) => setReviewDescription(e.target.value)} className='textarea textarea-bordered'></textarea>

                    </div>
                    <div className='mb-4'>
                        <label className='label'>Rating</label>
                        <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} className='input input-bordered' min="1" max="5" />

                    </div>

                    <button type='submit' className='btn'>Submit</button>
                </form>

            </div>
            
        </div>
    );
};

export default ProductDetails;