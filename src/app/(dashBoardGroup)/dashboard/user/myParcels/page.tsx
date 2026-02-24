'use client';
import { Button } from '@/components/ui/button';
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
        <div className="p-4">
            <h2 className="text-xl lg:text-2xl font-bold mb-4">📦 My Parcels</h2>

            {/* Responsive Table */}
            <div className="overflow-x-auto w-full">
                <table className="table w-full text-left">
                    <thead className="hidden lg:table-header-group">
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Data</th>
                            <th>Payment</th>
                            <th>Cost</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel, index) => (
                            <tr key={parcel.id} className="block lg:table-row border border-gray-200 rounded-md lg:border-none mb-4 lg:mb-0">
                                {/* Index */}
                                <td className="block lg:table-cell px-4 py-2 font-semibold">
                                    <span className="lg:hidden font-bold"># </span>
                                    {index + 1}
                                </td>

                                {/* Title */}
                                <td className="block lg:table-cell px-4 py-2">
                                    <span className="lg:hidden font-bold">Title: </span>
                                    <span className="capitalize">{parcel.title}</span>
                                </td>

                                {/* Type */}
                                <td className="block lg:table-cell px-4 py-2">
                                    <span className="lg:hidden font-bold">Type: </span>
                                    <span className="capitalize">{parcel.type}</span>
                                </td>

                                {/* Data */}
                                <td className="block lg:table-cell px-4 py-2">
                                    <span className="lg:hidden font-bold">Date: </span>
                                    <span className="capitalize">{new Date(parcel.createdAt).toLocaleString('en-us')}</span>
                                </td>

                                {/* Payment */}
                                <td className="block lg:table-cell px-4 py-2">
                                    <span className="lg:hidden font-bold">Payment: </span>
                                    <Button size='sm'
                                        className={`rounded-full ${parcel.payment_status === "PAID" ? "bg-green-500" : "bg-red-400"
                                            }`}
                                    >
                                        {parcel.payment_status}
                                    </Button>
                                </td>

                                {/* Cost */}
                                <td className="block lg:table-cell px-4 py-2">
                                    <span className="lg:hidden font-bold">Cost: </span>
                                    {parcel.cost}৳
                                </td>

                                {/* Actions */}
                                <td className="block lg:table-cell px-4 py-2 space-x-2 space-y-2 lg:space-y-0">
                                    <Button size="sm"
                                        className="bg-blue-500 cursor-pointer hover:bg-blue-300"
                                    >
                                        View
                                    </Button>
                                    {parcel.payment_status === "UNPAID" && (
                                        <Button size="sm"
                                            className="cursor-pointer hover:bg-green-400 bg-green-500"
                                        >
                                            Pay
                                        </Button>
                                    )}
                                    <Button size="sm"
                                        className="bg-red-500 cursor-pointer hover:bg-red-400"
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        {parcels.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-center py-4">
                                    No parcels found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default MyParcels;