import React from 'react';
import Banner from '../Components/Banner';
import FeaturedProducts from '../Components/FeaturedProducts';
import TrendingProducts from '../Components/TrendingProducts';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CouponCarousel from '../Components/CouponCarousel';
import BestSellers from '../Components/BestSellers';
import NewArrivals from '../Components/NewArrivals';
import ContactUs from '../Components/ContactUs';
import AboutUs from '../Components/AboutUs';



const Home = () => {
    return (
        <div className='space-y-12'>

            <div className='relative z-10'>
            <Banner></Banner>
            </div>

            <div id='aboutUs' className='py-20 md:py-24'>
                <AboutUs></AboutUs>

            </div>
            
            <div className='relative z-0 my-12'>
            <FeaturedProducts></FeaturedProducts>
            </div>
            <TrendingProducts></TrendingProducts>

            <BestSellers></BestSellers>
            <NewArrivals></NewArrivals>
            <CouponCarousel></CouponCarousel>
            <div id='contact' className='py-20 md:py-24'>
                <ContactUs ></ContactUs>

            </div>
        </div>
    );
};

export default Home;