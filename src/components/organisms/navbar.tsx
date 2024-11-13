"use client";
import cn from "@/lib/classNames";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "../atoms/Logo";
import Button from "../atoms/Button";
import useStore from "@/store/main";
import { useUserStore } from "@/store/user";
import { useEffect, useState } from "react";
import { USER_TYPES } from "@/utils/user";
import { MdOutlineHelpOutline } from "react-icons/md";
import { IoBedOutline } from "react-icons/io5";
import { SlPlane } from "react-icons/sl";
import { LiaCarSolid } from "react-icons/lia";
import { MdOutlineAttractions } from "react-icons/md";
import { MdOutlineAirportShuttle } from "react-icons/md";

export default function Navbar({ haveLogo = true }: { haveLogo?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const [hasAppMounted, setHasAppMounted] = useState(false);
  const auth = useStore(useUserStore, (state) => state);
  const tokenStillActive =
    auth?.accessToken?.expires &&
    new Date(auth?.accessToken?.expires) > new Date();

  useEffect(() => {
    setHasAppMounted(true);
  }, []);

  const dropdownLinks = [
    {
      name: "Dashboard",
      href: "/portal",
      for: [USER_TYPES.ADMIN, USER_TYPES.HOTEL_ADMIN],
    },
    {
      name: "Settings",
      href: "/settings/account",
      for: [USER_TYPES.ADMIN, USER_TYPES.HOTEL_ADMIN, USER_TYPES.USER],
    },
    {
      name: "My bookings",
      href: `/bookings/u/${auth?.user?.id}`,
      for: [USER_TYPES.USER],
    },
  ];

  return (
    <div className="justify-between w-full">
      <div className="flex justify-between w-full mb-[0.5%]">
      <div className="flex flex-row gap-1 text-tertiary">
        {haveLogo && <Logo />}
      </div>
      <div className={cn("flex flex-row items-center font-bold space-x-4")}>
        <Link
          className={pathname?.includes("vehicle") ? "border sold bg-white bg-opacity-20 p-1 rounded-[20px] " : " sold hover:bg-white hover:bg-opacity-20 p-1 rounded-[20px]"}
          href=""
        >
          USD
        </Link>
        <Link
          className={pathname?.includes("longuage") ? "border sold bg-white bg-opacity-20 p-1 rounded-[20px] " : " sold hover:bg-white hover:bg-opacity-20 p-1 rounded-[20px]"}
          href="#"
        >
          English
        </Link>
        <Link
          className={pathname?.includes("contact") ? "border sold bg-white bg-opacity-20 p-1 rounded-[20px] " : " sold hover:bg-white hover:bg-opacity-20 p-1 rounded-[20px]"}
          href="/contact-us"
        >
          <MdOutlineHelpOutline size={25} />
        </Link>
        {hasAppMounted ? (
          <>
            {tokenStillActive ? (
              <div className="relative flex group w-fit min-w-[150px]">
                <Button className="capitalize mx-auto">
                  {auth?.user?.name}
                </Button>
                <div className="absolute group-focus-within:block hidden bg-white shadow-lg w-full p-4 top-12 rounded-md">
                  {dropdownLinks.map((link, key) => (
                    <p key={key}>
                      {link.for.includes(auth?.user?.role!) && (
                        <Link
                          key={key}
                          className="block hover:text-blue-500 py-1 text-base"
                          href={link.href}
                        >
                          {link.name}
                        </Link>
                      )}
                    </p>
                  ))}

                  <button
                    onClick={async () => {
                      await auth?.logout?.();
                      router.replace("/login");
                    }}
                    className="block hover:text-red-500 py-1"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link
                  className={pathname?.includes("join") ? "border sold bg-white bg-opacity-20 p-1 rounded-[20px] " : " sold hover:bg-white hover:bg-opacity-20 p-1 rounded-[20px]"}
                  href={"/join"}
                >
                  List property 
                </Link>
                <Link href={"/login"}>
                  <Button className="hover:text-black">Login</Button>
                </Link>
                <Link href={"/join"}>
                  <Button className="hover:text-black">Register</Button>
                </Link>
              </>
            )}
          </>
        ) : (
          <div className="h-10 w-52 bg-gray-300 animate-pulse" />
        )}
      </div>
      </div>
      <div className={cn("flex flex-row items-center font-bold space-x-8")}>
        <Link
          className={`${pathname?.includes("test") ? "border sold bg-white bg-opacity-20 p-1 rounded-[20px] " : " sold hover:bg-white hover:bg-opacity-20 p-1 rounded-[20px]"}`}
          href=""
        >
          <span className="flex gap-1 items-center"><IoBedOutline size={20}/>Stays</span>
        </Link>
        <Link
          className={pathname?.includes("test") ? "border sold bg-white bg-opacity-20 p-1 rounded-[20px] " : " sold hover:bg-white hover:bg-opacity-20 p-1 rounded-[20px]"}
          href=""
        >
          <span className="flex gap-1 items-center"><SlPlane size={20}/>Flights</span>
        </Link>
        <Link
          className={pathname?.includes("vehicles") ? "border sold bg-white bg-opacity-20 p-1 rounded-[20px] " : " sold hover:bg-white hover:bg-opacity-20 p-1 rounded-[20px]"}
          href="/vehicles"
        >
          <span className="flex gap-1 items-center"><LiaCarSolid size={20}/>Cars rentals</span>
        </Link>
        <Link
          className={pathname?.includes("attraction") ? "border sold bg-white bg-opacity-20 p-1 rounded-[20px] " : " sold hover:bg-white hover:bg-opacity-20 p-1 rounded-[20px]"}
          href="/vehicles"
        >
          <span className="flex gap-1 items-center"><MdOutlineAttractions size={20}/>Attractions</span>
        </Link>
        <Link
          className={pathname?.includes("taxi") ? "border sold bg-white bg-opacity-20 p-1 rounded-[20px] " : " sold hover:bg-white hover:bg-opacity-20 p-1 rounded-[20px]"}
          href="/vehicles"
        >
          <span className="flex gap-1 items-center"><MdOutlineAirportShuttle size={20}/>Airport taxies</span>
        </Link>
        </div>
    </div>
  );
}
