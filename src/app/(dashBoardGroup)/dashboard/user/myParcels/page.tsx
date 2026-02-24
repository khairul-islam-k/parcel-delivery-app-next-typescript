'use client';
import { TParcel } from '@/types/parcel';
import axios from 'axios';
import React, { useEffect, useState } from 'react';


const MyParcels = () => {
    const [parcels, setParcels] = useState<TParcel[]>([]);
    console.log(parcels);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/parcels/findBy/khairul@gmail.com`)
        .then(data => setParcels(data.data))
    }, [])
    return (
        <div>
            my parcels
        </div>
    );
};

export default MyParcels;