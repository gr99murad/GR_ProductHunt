import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const [subscribed, setSubscribed] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(10);

    useEffect(() => {
        const fetchSubscriptionStatus = async () => {
            try {
                const response = await axios.get(`https://product-hunt-server-ivory.vercel.app/user/${user.uid}`);
                setSubscribed(response.data?.subscribed || false);
            } catch (err) {
                console.error("Failed to fetch subscription status", err);
            }
        };

        if (user?.uid) {
            fetchSubscriptionStatus();
        }
    }, [user]);

    const handleCouponChange = (e) => {
        setCouponCode(e.target.value);
    };

    const handleSubscribe = async () => {
        if (subscribed) {
            toast.info("You are already subscribed");
            return;
        }

        try {
            if (couponCode) {
                const response = await axios.post(`https://product-hunt-server-ivory.vercel.app/validateCoupon`, { couponCode });

                if (response.data.discountAmount) {
                    const discountPercentage = response.data.discountAmount;
                    const discountValue = (discountPercentage / 100) * 10;
                    setDiscount(discountValue);
                    setTotalAmount(10 - discountValue);
                    toast.success(`Coupon applied! You saved $${discountValue.toFixed(2)}`);
                } else {
                    toast.error('Invalid coupon code');
                    return;
                }
            }

            setShowPaymentModal(true);
        } catch (err) {
            console.error("Coupon validation failed", err);
            toast.error("Error validating coupon code");
        }
    };

    const handlePaymentSuccess = async () => {
        try {
            await axios.post(`https://product-hunt-server-ivory.vercel.app/subscribe/${user.uid}`);
            toast.success("Subscription successful");
            setSubscribed(true);
            setShowPaymentModal(false);
        } catch (error) {
            console.error("Payment update failed", error);
            toast.error("Failed to update subscription");
            setSubscribed(false);
        }
    };

    return (
        <div className='py-24 max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md'>
            <h2 className='text-2xl font-bold text-center mb-4 text-gray-800 dark:text-white'>My Profile</h2>
            <div className='text-center'>
                <img className='w-24 h-24 rounded-full mx-auto mb-4 border' src={user?.photoURL} alt={user?.displayName} />
                <h2 className='text-xl font-semibold text-gray-800 dark:text-white'>{user?.displayName}</h2>
                <p className='text-gray-600 dark:text-gray-300'>{user?.email}</p>
            </div>

            {!subscribed ? (
                <div className='mt-4'>
                    <input
                        type="text"
                        value={couponCode}
                        onChange={handleCouponChange}
                        placeholder='Enter coupon code'
                        className='w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600'
                    />
                    <button
                        className='w-full bg-blue-500 text-white mt-2 py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50'
                        onClick={handleSubscribe}
                        disabled={subscribed}
                    >
                        Subscribe for ${discount ? totalAmount.toFixed(2) : 10}/month
                    </button>
                </div>
            ) : (
                <p className='mt-4 text-green-600 dark:text-green-400 font-semibold text-center'>Status: Verified ✅</p>
            )}

            {showPaymentModal && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
                    <div className='bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-sm w-full'>
                        <h3 className='text-xl font-bold mb-4 text-gray-900 dark:text-white'>Complete your payment</h3>
                        <p className='mb-4 text-gray-700 dark:text-gray-300'>Amount: ${totalAmount.toFixed(2)}</p>
                        <button className='bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600' onClick={handlePaymentSuccess}>
                            Pay Now
                        </button>
                        <button className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600' onClick={() => setShowPaymentModal(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyProfile;
