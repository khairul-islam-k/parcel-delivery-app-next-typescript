'use client';
import Image from 'next/image';
import React from 'react';
import { FaStar } from 'react-icons/fa6';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface TPartners {
    id: string;
    name: string;
    logo: string;
    description: string;
}

const MeetPartner = ({ partners }: { partners: TPartners[] }) => {
    return (
        <div>
            {
                partners.length > 0 && <Carousel autoPlay={true}
                    infiniteLoop={true}
                    interval={3000}
                    showThumbs={false}
                    showIndicators={true}
                    stopOnHover={false}>
                    {
                        partners.map(data => <div key={data.id} className='mx-auto p-5 lg:w-[380px] w-[300px] bg-[#57c7a0] rounded-2xl'>
                            <div className='flex items-center lg:gap-4 gap-3'>
                                <div className='w-[41px] h-[41px]'>
                                    <Image className='rounded-full' 
                                    src={data.logo} 
                                    height={41} 
                                    width={41} 
                                    unoptimized
                                    alt={data.name} />
                                    </div>
                                <h3 className='lg:text-2xl text-xl font-bold'>{data.name}</h3>
                            </div>
                            <div className='border-y py-4 mt-4 border-dotted'>
                                {data.description}
                            </div>
                            <div className='flex pt-4'>
                                <FaStar className='text-amber-300' size={20} />
                                <FaStar className='text-amber-300' size={20} />
                                <FaStar className='text-amber-300' size={20} />
                                <FaStar className='text-amber-300' size={20} />
                                <FaStar className='text-amber-300' size={20} />
                            </div>
                        </div>)
                    }
                </Carousel>
            }
        </div>
    );
};

export default MeetPartner;