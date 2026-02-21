"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface TParcel {
    delivery_instruction: string;
    pickup_instruction: string;
    receiver_address: string;
    receiver_center: string;
    receiver_contact: string;
    receiver_name: string;
    receiver_region: string;
    sender_address: string;
    sender_center: string;
    sender_contact: string;
    sender_name: string;
    sender_region: string;
    title: string;
    type: string;
    weight: string;
}

type TRegion = {
    region: string;
    district: string;
    city: string;
    covered_area: string[];
    status: "active" | "inactive"; // you can adjust if needed
    flowchart: string;
    longitude: number;
    latitude: number;
};

interface TParcelCost extends TParcel {
    cost: number;
    email: string
}

const SendParcel = () => {
    const session = useSession();
    const router = useRouter();
    // coverage
    const [formData, setFormData] = useState<TParcelCost>();
    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const [coverageData, setCoverageData] = useState<TRegion[]>([]);
    const [Region, setRegion] = useState<string[]>([]);
    // district
    const [senderDistrictData, setSenderDistrictData] = useState<TRegion[]>([]);
    const [receiverDistrictData, setReceiverDistrictData] = useState<TRegion[]>([]);
    // Trigger  senderRegion
    const [senderRegion, setSenderRegion] = useState<string>('');
    const [receiverRegion, setReceiverRegion] = useState<string>('');


    // calculate
    const calculateCost = (data: TParcel) => {
        let baseCost = 0;
        let totalCost = 0;
        if (data.type === 'document') {
            baseCost = data.sender_region === data.receiver_region ? 60 : 80;
        }

        if (data.type === 'non-document' && 3 <= +data.weight) {
            baseCost = data.sender_region === data.receiver_region ? 110 : 180;
        }

        if (data.type === 'non-document' && 3 > +data.weight) {
            baseCost = 40;
        }


        if (data.weight) {
            if (data.type === 'non-document' && 3 > +data.weight && data.sender_region !== data.receiver_region) {
                totalCost = (parseFloat(data.weight) * baseCost) + 40;
            } else {
                totalCost = parseFloat(data.weight) * baseCost;
            }

        } else {
            totalCost = baseCost;
        }
        return totalCost;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        // const data = Object.fromEntries(formData.entries());
        const data: TParcel = {
            delivery_instruction: formData.get("delivery_instruction") as string,
            pickup_instruction: formData.get("pickup_instruction") as string,
            receiver_address: formData.get("receiver_address") as string,
            receiver_center: formData.get("receiver_center") as string,
            receiver_contact: formData.get("receiver_contact") as string,
            receiver_name: formData.get("receiver_name") as string,
            receiver_region: formData.get("receiver_region") as string,
            sender_address: formData.get("sender_address") as string,
            sender_center: formData.get("sender_center") as string,
            sender_contact: formData.get("sender_contact") as string,
            sender_name: formData.get("sender_name") as string,
            sender_region: formData.get("sender_region") as string,
            title: formData.get("title") as string,
            type: formData.get("type") as string,
            weight: formData.get("weight") as string,
        }

        if (session.data) {
            const calculatedCost = calculateCost(data);
            setFormData({
                ...data, cost: calculatedCost,
                email: session.data?.user?.email as string
            });
            form.reset();
            setShowConfirm(true);
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please login first",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
            router.push('/login');
        }
    }

    // confirm submit 
    const confirmSubmit = () => {
        setShowConfirm(false);
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/parcels/sendParcel`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    }

    useEffect(() => {
        fetch('/warehouses.json')
            .then(res => res.json())
            .then(data => setCoverageData(data))
    }, [])

    // Region array
    useEffect(() => {
        const handleRegion = () => {
            const regionData = [
                ...new Set(coverageData.map(item => item.region))
            ];
            setRegion(regionData);
        }
        handleRegion();
    }, [coverageData]);

    //sender and receiver
    useEffect(() => {
        const handleSendRegion = () => {
            const senderData = coverageData.filter(data => data.region === senderRegion);
            setSenderDistrictData(senderData);
        }
        handleSendRegion();
    }, [senderRegion, coverageData])


    useEffect(() => {
        const handleReceiverRegion = () => {
            const receiverData = coverageData.filter(data => data.region === receiverRegion);
            setReceiverDistrictData(receiverData);
        }
        handleReceiverRegion();
    }, [receiverRegion, coverageData])
    return (
        <div className="w-11/12 mx-auto py-10">

            {/* Header */}
            <h1 className="text-4xl font-bold mb-2">Send a Parcel</h1>
            <p className="text-gray-500 mb-8">
                Fill in the details to send your parcel safely.
            </p>

            <form
                onSubmit={handleSubmit}
                className="space-y-8">

                {/* Parcel Details */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border">
                    <h2 className="text-xl font-semibold mb-6">
                        Enter your parcel details
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">

                        {/* Type */}
                        <div>
                            <label className="block text-gray-600 mb-2">Type</label>
                            <div className="flex items-center gap-6">
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="type"
                                        required
                                        value="document" />
                                    Document
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="type" value="non-document"
                                        required />
                                    Non-document
                                </label>
                            </div>
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-gray-600 mb-2">Title</label>
                            <input
                                required
                                type="text"
                                name="title"
                                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                        </div>

                        {/* Weight */}
                        <div className="md:col-span-2">
                            <label className="block text-gray-600 mb-2">
                                Weight (kg)
                            </label>
                            <input
                                type="number"
                                required
                                name="weight"
                                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                        </div>

                    </div>
                </div>

                {/* Sender & Receiver Section */}
                <div className="grid lg:grid-cols-2 gap-6">

                    {/* Sender Info */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border">
                        <h2 className="text-xl font-semibold mb-6">Sender Info</h2>

                        <div className="grid md:grid-cols-2 gap-6">

                            <div>
                                <label className="block text-gray-600 mb-2">Name</label>
                                <input
                                    type="text"
                                    required
                                    name="sender_name"
                                    className="w-full border rounded-lg px-4 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-600 mb-2">Contact</label>
                                <input
                                    type="number"
                                    required
                                    name="sender_contact"
                                    className="w-full border rounded-lg px-4 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-600 mb-2">Select Region</label>
                                <select
                                    onChange={(e) => setSenderRegion(e.target.value)}
                                    name="sender_region"
                                    required
                                    className="w-full border rounded-lg px-4 py-2"
                                >
                                    {
                                        Region.map((data, index) => <option key={index} value={data}>{data}</option>)
                                    }
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-600 mb-2">
                                    Select Service Center
                                </label>
                                <select
                                    name="sender_center"
                                    required
                                    className="w-full border rounded-lg px-4 py-2"
                                >
                                    {
                                        senderDistrictData.map((data, index) => <option key={index} value={data.district}>{data.district}</option>)
                                    }
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-gray-600 mb-2">Address</label>
                                <textarea
                                    name="sender_address"
                                    required
                                    rows={3}
                                    className="w-full border rounded-lg px-4 py-2"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-gray-600 mb-2">
                                    Pick-up Instruction
                                </label>
                                <textarea
                                    name="pickup_instruction"
                                    required
                                    rows={3}
                                    className="w-full border rounded-lg px-4 py-2"
                                />
                            </div>

                        </div>
                    </div>

                    {/* Receiver Info */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border">
                        <h2 className="text-xl font-semibold mb-6">Receiver Info</h2>

                        <div className="grid md:grid-cols-2 gap-6">

                            <div>
                                <label className="block text-gray-600 mb-2">Name</label>
                                <input
                                    type="text"
                                    required
                                    name="receiver_name"
                                    className="w-full border rounded-lg px-4 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-600 mb-2">Contact</label>
                                <input
                                    type="number"
                                    required
                                    name="receiver_contact"
                                    className="w-full border rounded-lg px-4 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-600 mb-2">Select Region</label>
                                <select
                                    onChange={(e) => setReceiverRegion(e.target.value)}
                                    name="receiver_region"
                                    required
                                    className="w-full border rounded-lg px-4 py-2"
                                >
                                    {
                                        Region.map((data, index) => <option key={index} value={data}>{data}</option>)
                                    }
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-600 mb-2">
                                    Select Service Center
                                </label>
                                <select
                                    name="receiver_center"
                                    required
                                    className="w-full border rounded-lg px-4 py-2"
                                >
                                    {
                                        receiverDistrictData.map((data, index) => <option key={index} value={data.district}>{data.district}</option>)
                                    }
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-gray-600 mb-2">Address</label>
                                <textarea
                                    name="receiver_address"
                                    required
                                    rows={3}
                                    className="w-full border rounded-lg px-4 py-2"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-gray-600 mb-2">
                                    Delivery Instruction
                                </label>
                                <textarea
                                    name="delivery_instruction"
                                    required
                                    rows={3}
                                    className="w-full border rounded-lg px-4 py-2"
                                />
                            </div>

                        </div>
                    </div>

                </div>

                {/* Submit Button */}
                <div className="text-right">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition"
                    >
                        Submit
                    </button>
                </div>

            </form>

            {/* modal show */}

            {showConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md text-center">
                        <h2 className="text-xl font-bold mb-4">Confirm Submission</h2>
                        <p>Delivery Cost: <strong>৳{formData?.cost}</strong></p>
                        <div className="mt-6 flex justify-center gap-4">
                            <button onClick={confirmSubmit} className="btn btn-success">Confirm</button>
                            <button onClick={() => setShowConfirm(false)} className="btn btn-outline">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default SendParcel;