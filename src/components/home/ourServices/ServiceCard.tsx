import React from 'react';
import { IconType } from "react-icons";

interface TService {
            Icon: IconType;
            title: string;
            description: string
        }

const ServiceCard = ({service}: {service: TService}) => {
    const {Icon, title, description} = service;
  return (
    <div className="p-4 rounded-xl bg-gray-50 shadow-md hover:bg-[#CAEB66] transition duration-300">
      <div className="card-body items-center text-center">
        <div className='flex justify-center'><Icon className="text-4xl text-blue-500" /></div>
        <h3 className="card-title mt-4 text-center">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
