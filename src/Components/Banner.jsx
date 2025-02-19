


import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import aiImg from '../assets/BannerImg/AI.webp';
import webAppImg from '../assets/BannerImg/web.jpg';
import gamesImg from '../assets/BannerImg/games.avif';
import mobileAppImg from '../assets/BannerImg/mobile apps.jpg';
import softwareImg from '../assets/BannerImg/software.jpg';


const Banner = () => {

    const setting = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        
    };
    return (
        <div className=' mx-auto h-52 md:h-96 relative overflow-hidden'>
            <Slider {...setting}>
                <div className='relative'>
                    <img className='w-full h-full object-cover ' src={webAppImg} alt="" />
                    <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 p-6 md:p-8'>
                        <div className='text-center lg:mb-72 text-white'>
                            <h2 className='text-2xl md:text-3xl lg:text-4xl'>Discover Innovative Web Apps</h2>
                            <p className='text-sm text-base md:text-lg'>Explore cutting-edge web applications that simplify your work and enhance productivity.</p>
                            
                        </div>

                    </div>

                </div>
                <div className='relative'>
                    <img className='w-full h-full object-cover' src={aiImg} alt="" />
                    <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 p-5'>
                        <div className='text-center lg:mb-72 text-white'>
                            <h2 className='text-2xl md:text-3xl lg:text-4xl'>Revolutionary AI Tools</h2>
                            <p className='text-sm md:text-base lg:text-lg'>Unleash the power of artificial intelligence to solve complex challenges and automate tasks.</p>
                            
                        </div>

                    </div>

                </div>
                <div className='relative'>
                    <img className='w-full h-full object-cover' src={softwareImg} alt="" />
                    <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 p-5'>
                        <div className='text-center lg:mb-72 text-white'>
                            <h2 className='text-2xl md:text-3xl lg:text-4xl'>Discover Game-Changing Software</h2>
                            <p className='text-sm md:text-base lg:text-lg'>Find software solutions tailored to your business, creativity, and personal needs.</p>
                            
                        </div>

                    </div>

                </div>
                <div className='relative'>
                    <img className='w-full h-full object-cover' src={gamesImg} alt="" />
                    <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 p-5'>
                        <div className='text-center lg:mb-72 text-white'>
                            <h2 className='text-2xl md:text-3xl lg:text-4xl'>Fun and Engaging Games</h2>
                            <p className='text-sm md:text-base lg:text-lg'>Discover games that challenge your mind, entertain, and offer unforgettable experiences.</p>
                            
                        </div>

                    </div>

                </div>
                <div className='relative'>
                    <img className='w-full h-full object-cover' src={mobileAppImg} alt="" />
                    <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 p-5'>
                        <div className='text-center lg:mb-72 text-white'>
                            <h2 className='text-2xl md:text-3xl lg:text-4xl'>Top Mobile Apps to Try</h2>
                            <p className='text-sm md:text-base lg:text-lg'>Explore the best mobile applications that enhance your daily life and productivity.</p>
                            
                        </div>

                    </div>

                </div>
                

            </Slider>
            
        </div>
    );
};

export default Banner;