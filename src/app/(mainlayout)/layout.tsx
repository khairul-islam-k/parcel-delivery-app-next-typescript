import Footer from '@/components/footer/Footer';
import Navbar from '@/components/navbar/Navbar';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar></Navbar>
            {children}
            <Footer></Footer>
        </div>
    );
};

export default layout;