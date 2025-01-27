import React from 'react';
import Banner from '../Components/Banner';
import FeaturedProducts from '../Components/FeaturedProducts';
import TrendingProducts from '../Components/TrendingProducts';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CouponCarousel from '../Components/CouponCarousel';



const Home = () => {
    return (
        <div className='space-y-12'>

            <div className='relative z-10'>
            <Banner></Banner>
            </div>
            
            <div className='relative z-0 mt-12'>
            <FeaturedProducts></FeaturedProducts>
            </div>
            <TrendingProducts></TrendingProducts>
            <CouponCarousel></CouponCarousel>
        </div>
    );
};

export default Home;