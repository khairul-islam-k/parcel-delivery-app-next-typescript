"use client";
import React, { useState } from "react";

const SendParcel = () => {
    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const data = Object.fromEntries(formData.entries());

        console.log("Form Data:", data);
        setShowConfirm(true);
    }
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
                                    <input type="radio" name="type" value="document" />
                                    Document
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="type" value="non-document" />
                                    Non-document
                                </label>
                            </div>
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-gray-600 mb-2">Title</label>
                            <input
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
                                    defaultValue="John Doe"
                                    name="sender_name"
                                    className="w-full border rounded-lg px-4 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-600 mb-2">Contact</label>
                                <input
                                    type="text"
                                    name="sender_contact"
                                    className="w-full border rounded-lg px-4 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-600 mb-2">Select Region</label>
                                <select
                                    name="sender_region"
                                    className="w-full border rounded-lg px-4 py-2"
                                >
                                    <option>Dhaka</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-600 mb-2">
                                    Select Service Center
                                </label>
                                <select
                                    name="sender_center"
                                    className="w-full border rounded-lg px-4 py-2"
                                >
                                    <option>Dhaka</option>
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-gray-600 mb-2">Address</label>
                                <textarea
                                    name="sender_address"
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
                                    name="receiver_name"
                                    className="w-full border rounded-lg px-4 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-600 mb-2">Contact</label>
                                <input
                                    type="text"
                                    name="receiver_contact"
                                    className="w-full border rounded-lg px-4 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-600 mb-2">Select Region</label>
                                <select
                                    name="receiver_region"
                                    className="w-full border rounded-lg px-4 py-2"
                                >
                                    <option>Dhaka</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-600 mb-2">
                                    Select Service Center
                                </label>
                                <select
                                    name="receiver_center"
                                    className="w-full border rounded-lg px-4 py-2"
                                >
                                    <option>Dhaka</option>
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-gray-600 mb-2">Address</label>
                                <textarea
                                    name="receiver_address"
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
                        <p>Delivery Cost: <strong>৳200</strong></p>
                        <div className="mt-6 flex justify-center gap-4">
                            <button onClick={() => setShowConfirm(false)} className="btn btn-success">Confirm</button>
                            <button onClick={() => setShowConfirm(false)} className="btn btn-outline">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default SendParcel;