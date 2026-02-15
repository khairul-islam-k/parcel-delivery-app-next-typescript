import React from "react";
import Marquee from "react-fast-marquee";
import brand_1 from '@/assets/amazon.png';
import brand_2 from '@/assets/amazon_vector.png';
import brand_3 from '@/assets/casio.png';
import brand_4 from '@/assets/moonstar.png';
import brand_5 from '@/assets/randstad.png';
import brand_6 from '@/assets/start-people 1.png'
import brand_7 from '@/assets/start.png';
import Image from "next/image";

const logos = [
    brand_1,
    brand_2,
    brand_3,
    brand_4,
    brand_5,
    brand_6,
    brand_7,
];

export default function ClientSlider() {
    return (
        <section className="bg-base-100 py-10">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                We’ve helped thousands of sales teams
            </h2>
            <Marquee
                //gradient={false}
                speed={50}
            // pauseOnHover={true}
            //className="gap-x-16"
            >
                {logos.map((logo, index) => (
                    <Image
                    key={index}
                    src={logo}
                    className='mx-12'
                    width={94} 
                    height={28} 
                    alt='khairul' />
                ))}
            </Marquee>
        </section>
    );
}
