import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext/AuthContext';
import axios from 'axios';

const MyProfile = () => {
    const {user} = useContext(AuthContext);
    const [subscribed, setSubscribed] = useState(user?.subscribed || false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);


    

    const handleSubscribe = async () => {
            setShowPaymentModal(true); 
    };

    const handlePaymentSuccess = async (e) => {
        e.preventDefault();
        try{
            await axios.post(`http://localhost:5000/subscribe/${user.id}`);
            // const { data: updatedUser } = await axios.get(`http://localhost:5000/users/${user.uid}`);
            setSubscribed(true);
            setShowPaymentModal(false);

        }catch(error){
            console.error("payment update failed", error);

        }
    };
    return (
        <div>
            <h2 className='text-xl font-bold text-center'>My profile</h2>
            <img src={user?.photoURL} alt={user?.displayName} />
            <h2>{user?.displayName}</h2>
            <p>{user?.email}</p>

            {!subscribed ? (
                <button className='btn' onClick={handleSubscribe}>Subscribe for $10/month</button>
            ):(
                <p>Status: Verified</p>    
            )}

            {showPaymentModal && (
                <div className='modal modal-open'>
                    <div className='modal-box'>
                    <h3 className='text-xl font-bold mb-4'>Complete your payment</h3>
                    <p className='mb-4'>Amount: $10</p>
                    <button className='btn' onClick={handlePaymentSuccess}>Pay Now</button>
                    <button className='btn' onClick={() => setShowPaymentModal(false)}>Cancel</button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default MyProfile;