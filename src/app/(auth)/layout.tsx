import Navbar from '@/components/navbar/Navbar';
import Image from 'next/image';
import React from 'react';

const authLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
                {/* from */}
                <div className="flex items-center justify-center px-6">
                    {children}
                </div>

                {/* Image */}
                <div className="hidden md:flex items-center justify-center">
                    <Image
                        src="/Delivery.png"
                        alt="Parcel Delivery"
                        width={500}
                        height={500}
                        className="object-contain rounded-2xl"
                        priority
                    />
                </div>
            </div>
        </div>
    );
};

export default authLayout;