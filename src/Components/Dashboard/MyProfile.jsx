import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext/AuthContext';
import axios from 'axios';

const MyProfile = () => {
    const {user} = useContext(AuthContext);
    const [subscribed, setSubscribed] = useState(user?.subscribed || false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);         //discount value
    const [totalAmount, setTotalAmount] = useState(10); 




    const handleCouponChange = (e) =>{
        setCouponCode(e.target.value);
    };

    const handleSubscribe = async () => {

        if(subscribed){
            alert("You are already subscribed");
            return;
        }
        if(couponCode){
            const response = await axios.post(`https://product-hunt-server-ivory.vercel.app/validateCoupon`, {couponCode});
            if(response.data.discountAmount){
                const discountPercentage = response.data.discountAmount;
                const calculateDiscount = (discountPercentage /100)*10;
                setDiscount(calculateDiscount);

                setTotalAmount(10- calculateDiscount);
            }else{
                alert('Invalid coupon code');
            }

        }
        setShowPaymentModal(true); 
        setSubscribed(true);
    };

    const handlePaymentSuccess = async (e) => {
        e.preventDefault();

        setSubscribed(true);
        setShowPaymentModal(false);
        try{
            await axios.post(`https://product-hunt-server-ivory.vercel.app/subscribe/${user.id}`);
            
            
            alert('Subscription successful');

        }catch(error){
            setSubscribed(false);
            console.error("payment update failed", error);

        }
    };
    return (
        <div>
            <h2 className='text-xl font-bold text-center'>My profile</h2>
            <img src={user?.photoURL} alt={user?.displayName} />
            <h2>{user?.displayName}</h2>
            <p>{user?.email}</p>

            {!subscribed  ? (

                <div>
                    <input type="text" value={couponCode} onChange={handleCouponChange} placeholder='Enter coupon code' className='input input-bordered' />
                    <button className='btn' onClick={handleSubscribe}>Subscribe for $10/month</button>
                </div>
            ):(
                <p>Status: Verified</p>
            )}

            {showPaymentModal && (
                <div className='modal modal-open'>
                    <div className='modal-box'>
                    <h3 className='text-xl font-bold mb-4'>Complete your payment</h3>
                    <p className='mb-4'>Amount: ${totalAmount}</p>
                    <button className='btn' onClick={handlePaymentSuccess}>Pay Now</button>
                    <button className='btn' onClick={() => setShowPaymentModal(false)}>Cancel</button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default MyProfile;