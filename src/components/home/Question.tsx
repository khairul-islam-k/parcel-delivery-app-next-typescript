"use client"
import React, { useState } from 'react';
interface AccordionItem {
    title: string;
    content: string;
};

const Question = ({ items }: { items: AccordionItem[] }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    return (
        <div className="w-full max-w-2xl mx-auto space-y-4">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="border border-gray-200 rounded-xl overflow-hidden shadow-sm"
                >
                    <button
                        onClick={() => toggle(index)}
                        className="w-full flex justify-between items-center px-4 py-3 text-left font-semibold bg-gray-100 hover:bg-gray-200 transition"
                    >
                        {item.title}
                        <span className="text-xl">
                            {activeIndex === index ? "-" : "+"}
                        </span>
                    </button>

                    {activeIndex === index && (
                        <div className="px-4 py-3 bg-white text-gray-600 text-sm">
                            {item.content}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Question;