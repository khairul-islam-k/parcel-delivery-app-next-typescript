'use client'
import Image from 'next/image';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
    return (
        <div>
            <Carousel autoPlay={true} showThumbs={false} infiniteLoop={true}>
                <div>
                    <Image
                    className='rounded-xl'
                    src='/banner-1.png' width={1500} height={700} alt='banner-1' />
                </div>
                <div>
                    <Image 
                    className='rounded-xl'
                    src='/banner-2.png' width={1500} height={700} alt='banner-2' />
                </div>
                <div>
                    <Image
                    className='rounded-xl'
                    src='/banner-3.png' width={1500} height={700} alt='banner-3' />
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;