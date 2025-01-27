import React, { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';


const CouponCarousel = () => {
    const [coupons, setCoupons] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/coupons')
        .then(res => res.json())
        .then(data => setCoupons(data))
        .catch((error) => console.error('Error fetching coupons',error));
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    return (
        <div className='w-full max-w-screen-xl mx-auto p-5 lg:p-4'>
            <Slider {...settings}>
                {coupons.length > 0 ? (
                    coupons.map((coupon) => (
                        <div key={coupon._id} className='flex justify-center items-center text-center p-4 bg-gray-100 rounded-xl shadow-2xl'>
                            <div className='flex flex-col gap-5 font-xl font-bold '>
                                <h3 className='text-lg md:text-xl font-semibold text-blue-600 mb-2 '>Coupon Code: {coupon.couponCode}</h3>
                                <p className='text-lg  text-red-400'>Discount: {coupon.discountAmount}%</p>
                                <p className='text-lg text-base'>Expiry Date: { new Date(coupon.expiryDate).toLocaleDateString()}</p>
                                <p>{coupon.description}</p>
                            </div>
                        </div>
                    ))
                ):(
                    <p>No Valid coupons available at the moment</p>
                
                )}
            </Slider>
        </div>
    );
};

export default CouponCarousel;