"use client";
import { Spinner } from "@/components/ui/spinner";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { signIn } from "next-auth/react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import Swal from "sweetalert2";

const SocialLogin = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { status } = useSession();
    const router = useRouter();
    const handleSocialLogin = async (ProviderName: string) => {
        setIsLoading(true);
        await signIn(ProviderName, { redirect: false });
        setIsLoading(false);
    }

    useEffect(() => {
        if (status === "authenticated") {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Signin Successfully",
                showConfirmButton: false,
                timer: 1500
            });
            router.push("/");
        }
    }, [status, router])
    return (
        <div className="space-y-3">
            {/* Google */}
            <button
                onClick={() => handleSocialLogin("google")}
                className="flex cursor-pointer w-full items-center justify-center gap-3 rounded-lg border border-gray-300 py-2 font-medium hover:bg-gray-50 transition"
            >
                <FaGoogle className="text-red-500 text-lg" />
                Continue with Google
                {
                    isLoading && <Spinner className="size-3" />
                }
            </button>

            {/* GitHub */}
            <button
                onClick={() => handleSocialLogin("github")}
                className="flex cursor-pointer w-full items-center justify-center gap-3 rounded-lg border border-gray-300 py-2 font-medium hover:bg-gray-50 transition"
            >
                <FaGithub className="text-gray-800 text-lg" />
                Continue with GitHub
                {
                    isLoading && <Spinner className="size-3" />
                }
            </button>
        </div>
    );
};

export default SocialLogin;