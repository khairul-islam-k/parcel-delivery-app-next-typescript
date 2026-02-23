"use client";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button"
import {
  LogOutIcon,
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

interface TSidebarProps {
  toggle?: () => void;
}

export default function Topbar({ toggle }: TSidebarProps) {
  const session = useSession();
  return (
    <div className="bg-white shadow flex justify-between items-center py-2 px-4 md:hidden">
      <div>
        <h3 className="text-[16px] font-medium">Good Afternoon Asif</h3>
        <p className="text-[14px]">12 June, 2026</p>
      </div>

      <div className="flex items-center gap-2">

        {
            session.data ? <div className="flex gap-4 items-center">

            <div>
              <h3 className="font-semibold border w-24 truncate">{session.data?.user?.name}</h3>
              <p className="text-end text-sm">HR</p>
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


        
        <button onClick={toggle}>
          <Menu size={24} />
        </button>
      </div>

    </div>
  );
}
