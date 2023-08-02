"use client";
import React from "react";
import Logo from "../atoms/Logo";
import Link from "next/link";
import useStore from "@/store/main";
import { useUserStore } from "@/store/user";
import { useRouter } from "next/navigation";
import { USER_TYPES } from "@/utils/user";

export default function Sidebar() {
  const auth = useStore(useUserStore, (state) => state);
  const router = useRouter();

  const sidebarLinks = [
    {
      name: "Dashboard",
      href: "/portal",
      for: [USER_TYPES.ADMIN, USER_TYPES.HOTEL_ADMIN],
    },
    {
      name: "Bookings",
      href: "/portal/bookings",
      for: [USER_TYPES.ADMIN, USER_TYPES.HOTEL_ADMIN],
    },
    {
      name: "Users",
      href: "/portal/users",
      for: [USER_TYPES.ADMIN],
    },
    {
      name: "Properties",
      href: "/portal/properties",
      for: [USER_TYPES.ADMIN],
    },
    {
      name: "Property Categories",
      href: `/portal/categories`,
      for: [USER_TYPES.ADMIN],
    },
    {
      name: " My Properties",
      href: `/portal/properties/${auth?.user?.id}`,
      for: [USER_TYPES.HOTEL_ADMIN],
    },
    {
      name: "My bookings",
      href: `/bookings/c/${auth?.user?.id}`,
      for: [USER_TYPES.USER],
    },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white py-3 px-3">
        <Logo />
      </div>
      <div className="my-auto">
        {sidebarLinks.map((link, key) => (
          <>
            {link.for.includes(auth?.user?.role!) && (
              <Link
                key={key}
                className="py-2 text-white pl-5 w-full block font-medium"
                href={link.href}
              >
                {link.name}
              </Link>
            )}
          </>
        ))}
      </div>
      <div className="mt-auto">
        <button
          onClick={async () => {
            await auth?.logout?.();
            router.replace("/login");
          }}
          className="bg-red-500 py-3 w-full font-bold text-white text-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
