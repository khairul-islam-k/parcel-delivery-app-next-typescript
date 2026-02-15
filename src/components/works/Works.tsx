import React from 'react';
import {
  FaRegCalendarCheck,
  FaMoneyCheckAlt,
  FaStoreAlt,
  FaHandshake,
} from "react-icons/fa";
import WorkCard from './WorkCard';


const Works = () => {

     const worksData = [
        {
            Icon: FaRegCalendarCheck,
            title: "Booking Pick & Drop",
            description:
                "Easily schedule parcel pick-up and drop-off from your location with our seamless booking system.",
        },
        {
            Icon: FaMoneyCheckAlt,
            title: "Cash On Delivery",
            description:
                "Offer your customers a convenient and secure cash-on-delivery payment option anywhere in Bangladesh.",
        },
        {
            Icon: FaStoreAlt,
            title: "Delivery Hub",
            description:
                "Use our local delivery hubs across the country for efficient and optimized logistics operations.",
        },
        {
            Icon: FaHandshake,
            title: "Booking SME & Corporate",
            description:
                "Customized logistics services tailored for SMEs and corporate clients, including account-based booking.",
        },
    ];


    return (
        <section className="py-16 text-base-content rounded-4xl">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold">How it Works</h2>
                    
                </div>

                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {worksData.map((work, idx) => (
                        <WorkCard
                            key={idx}
                            work={work}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Works;