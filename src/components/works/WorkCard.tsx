import React from 'react';
import { IconType } from "react-icons";

interface TWorkInfo {
            Icon: IconType;
            title: string;
            description: string
        }

const WorkCard = ({ work }: {work:TWorkInfo}) => {
    const { Icon, title, description } = work;
    return (
        <div className="p-4 rounded-xl bg-gray-100 shadow-md hover:bg-[#CAEB66] transition duration-300">
            <div className="text-center">
                <div className='flex justify-center'><Icon className="text-4xl text-blue-500" /></div>
                <h3 className="card-title mt-4 text-center">{title}</h3>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
        </div>
    );
};

export default WorkCard;