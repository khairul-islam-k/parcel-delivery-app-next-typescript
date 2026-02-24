"use client";

import React, { useState } from "react";
import {
    LogOutIcon,
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false);
    const session = useSession();

    return (
        <div className="h-screen flex overflow-hidden">
            {/* Desktop Sidebar */}
            <div className="hidden md:flex">
                <Sidebar />
            </div>

            {/* Mobile Sidebar */}
            {open && (
                <div className="fixed inset-0 z-40 flex md:hidden">
                    <div className="w-64 bg-white">
                        <Sidebar close={() => setOpen(false)} />
                    </div>

                    <div
                        className="flex-1 bg-black/50"
                        onClick={() => setOpen(false)}
                    />
                </div>
            )}

            {/* Main Area */}
            <div className="flex flex-col flex-1 overflow-hidden">
                <Topbar toggle={() => setOpen(true)} />

                {/* Header */}
                <div className="hidden  bg-gray-200 px-4 py-4 border-b md:flex justify-between items-center border">
                    <div>
                        
                    </div>

                    {/* user */}
                    {
                        session.data ? <div className="flex gap-4 items-center">

                            <div>
                                <h3 className="font-semibold w-24 truncate">{session.data?.user?.name}</h3>
                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full">
                                        <Avatar>
                                            <AvatarImage src={session.data?.user?.image} alt="shadcn" />
                                            <AvatarFallback>{session.data?.user?.name.slice(0, 2)}</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuGroup>


                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => signOut()}>
                                        <LogOutIcon />
                                        Sign Out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                        </div> :

                            <Link href="/login"><Button
                                className="rounded-lg bg-green-600 py-2 text-white font-semibold hover:bg-green-700 transition"
                            >log In</Button></Link>
                    }

                </div>

                {/* Content */}
                <main className="flex-1 overflow-hidden">
                    <div className="h-full p-4 overflow-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;