"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { UserRegistration } from '@/types/user';
import { Spinner } from '@/components/ui/spinner';


const Registration = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);

        const form = e.currentTarget;
        const formData = new FormData(form);
        // const data = Object.fromEntries(formData.entries());
        const data: UserRegistration = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            image: formData.get("image") as string,
            password: formData.get("password") as string,
            role: "user"
        };


        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/registration`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const result = await res.json();

        if (result?.id) {
            form.reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
            });
            router.push("/login");
            setIsLoading(false);

        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Already have an account!",
                footer: '<a href="#">Why do I have this issue?</a>'
            });

            setIsLoading(false);

        }
    }

    return (
        <div className="w-full max-w-md space-y-6">

            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800">
                    Create Account
                </h1>
                <p className="text-gray-500 mt-2">
                    Register to continue
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        name="name"
                        required
                        type="text"
                        placeholder="Your name"
                        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        required
                        name="email"
                        placeholder="example@email.com"
                        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none"
                    />
                </div>

                {/* Image URL */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Image URL
                    </label>
                    <input
                        type="url"
                        name="image"
                        placeholder="https://example.com/profile.jpg"
                        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none"
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        required
                        name="password"
                        placeholder="••••••••"
                        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none"
                    />
                </div>

                <Button
                    disabled={isLoading}
                    type="submit"
                    className="w-full rounded-lg bg-green-600 py-2 text-white font-semibold hover:bg-green-700 transition cursor-pointer"
                >
                    {
                        isLoading && <Spinner className="size-3" />
                    }
                    Register
                </Button>
            </form>

            <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link href="/login" className="text-green-600 hover:underline">
                    Login
                </Link>
            </p>

        </div>

    );
};

export default Registration;