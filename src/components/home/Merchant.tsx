import React from 'react';
import merchant from '../../../assets/location-merchant.png';
import Image from 'next/image';
import { Button } from '../ui/button';

const Merchant = () => {
    return (
        <div className="flex flex-col md:flex-row p-4 items-center bg-green-500 lg:p-10 rounded-xl shadow-sm text-white mt-6 md:mt-10">
            <div className="">
                <h2 className="text-2xl font-medium">Merchant and Customer Satisfaction is Our First Priority</h2>
                <p className='my-5'>We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.</p>
                <div className="">
                    <Button className="btn cursor-pointer rounded-full lg:mr-4 mb-2">Become a Merchant</Button>
                    <Button className="btn rounded-full border-black border text-black bg-green-500 hover:bg-green-500 cursor-pointer my-2">Earn with Profast Courier</Button>
                </div>
            </div>
            <figure>
                <Image
                    src='/Delivery.png'
                    width={400}
                    height={400}
                    className='rounded-xl'
                    alt="Movie" />
            </figure>
        </div>
    );
};

export default Merchant;