import React from 'react';
import feature_1 from '@/assets/live-track.png';
import feature_2 from '@/assets/save-delivery.png';
import feature_3 from '@/assets/call-center.png';
import Image from 'next/image';

const FeatureCard = () => {

    const features = [
        {
            title: "Live Parcel Tracking",
            description:
                "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
            image: feature_1
        },
        {
            title: "100% Safe Delivery",
            description:
                "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
            image: feature_2
        },
        {
            title: "Call Center Support",
            description:
                "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
            image: feature_3
        },
    ];

    return (
        <section className="py-10">
            <div className="max-w-6xl mx-auto space-y-8 px-4">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="flex flex-col md:flex-row items-center gap-6 bg-gray-100 rounded-xl shadow p-6"
                    >
                        <Image
                            src={feature.image}
                            alt={feature.title}
                            className="w-full md:w-48 h-auto object-cover rounded"
                        />
                        <div className="text-left">
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-base-content">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeatureCard;