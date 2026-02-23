"use client";

import Link from "next/link";
import {
  BookOpen,
  ClipboardList,
  FolderCog,
  FolderPlus,
  MessageSquare,
  Users,
  UtensilsCrossed,

} from "lucide-react";
import { useSession } from "next-auth/react";

interface TSidebarProps {
  close?: () => void;
}

export default function Sidebar({ close }: TSidebarProps) {
  const session = useSession();
  console.log(session.data?.user?.role)

  const menuItems = [
    // Admin & 
    {
      name: "Manage Users",
      icon: Users, // import Users icon from lucide-react
      href: "/dashboard/admin/manageUsers",
      roles: ["admin"],
    },

    // admin and moderator
    {
      name: "Create Recipe",
      icon: UtensilsCrossed,
      href: "/dashboard/moderator/createRecipe",
      roles: ["admin", "moderator"],
    },
    {
      name: "Manage Recipes",
      icon: ClipboardList,
      href: "/dashboard/moderator/manageRecipes",
      roles: ["admin", "moderator"],
    },
    {
      name: "Add New Category",
      icon: FolderPlus,
      href: "/dashboard/moderator/addCategory",
      roles: ["admin", "moderator"],
    },
    {
      name: "Manage Category",
      icon: FolderCog,
      href: "/dashboard/moderator/manageCategory",
      roles: ["admin", "moderator"],
    },
    {
      name: "Manage Reviews",
      icon: MessageSquare,
      href: "/dashboard/moderator/manageReviews",
      roles: ["admin", "moderator"],
    },


    // users
    {
      name: "Manage Recipes",
      icon: BookOpen,
      href: "/dashboard/user/recipes",
      roles: ["user"],
    },
  ];

  const role = session?.data?.user?.role as string;

  const filteredMenu = menuItems.filter((item) =>
    item.roles.includes(role)
  );

  return (
    <div className="h-full w-64 bg-white shadow px-4 pb-4 overflow-auto">
      <div className="h-20 flex justify-center items-center">
        <h3 className="text-2xl font-bold">Taste<span className="text-amber-500">Trail</span></h3>
      </div>

      <nav className="space-y-2">
        {filteredMenu.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={close}
              className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition"
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        }


        )}
      </nav>
    </div>
  );
}
