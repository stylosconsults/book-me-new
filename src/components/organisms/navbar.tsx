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
    <div className="fixed top-0 left-0 right-0 backdrop-blur-custom h-[90px]  bg-co-search bg-opacity-25 z-50 px-6 py-4 flex justify-between items-center"
    style={{
      backdropFilter: "blur(32px)",
      WebkitBackdropFilter: "blur(32px)",
    }}
    >
      
      <div className="flex flex-row gap-1 text-tertiary">
        {haveLogo && <Logo />}
      </div>
      
      <div className="flex-1 flex justify-center items-center space-x-8">
        <Link
          className={cn(
            "relative group",
            pathname?.includes("vehicles") ? "text-[#0142EB]" : ""
          )}
          href="/vehicles"
        >
          Vehicles
          {!pathname?.includes("vehicles") && (
            <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-[#0142EB] rounded-full group-hover:w-full group-hover:left-0 transition-all duration-300" />
          )}
          {pathname?.includes("vehicles") && (
            <span className="absolute -bottom-1 left-1/2 w-1.5 h-1.5 bg-[#0142EB] rounded-full transform -translate-x-1/2" />
          )}
        </Link>
        <Link
          className={cn(
            "relative group",
            pathname?.includes("about") ? "text-[#0142EB]" : ""
          )}
          href="/about-us"
        >
          About us
          {!pathname?.includes("about") && (
            <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-[#0142EB] rounded-full group-hover:w-full group-hover:left-0 transition-all duration-300" />
          )}
          {pathname?.includes("about") && (
            <span className="absolute -bottom-1 left-1/2 w-1.5 h-1.5 bg-[#0142EB] rounded-full transform -translate-x-1/2" />
          )}
        </Link>
        <Link
          className={cn(
            "relative group",
            pathname?.includes("contact") ? "text-[#0142EB]" : ""
          )}
          href="/contact-us"
        >
          Contact us
          {!pathname?.includes("contact") && (
            <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-[#0142EB] rounded-full group-hover:w-full group-hover:left-0 transition-all duration-300" />
          )}
          {pathname?.includes("contact") && (
            <span className="absolute -bottom-1 left-1/2 w-1.5 h-1.5 bg-[#0142EB] rounded-full transform -translate-x-1/2" />
          )}
        </Link>
      </div>

      <div className="flex items-center space-x-4">
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
                  className={pathname?.includes("join") ? "text-blue-500" : ""}
                  href={"/join"}
                >
                  Open account
                </Link>
                <Link href={"/login"}>
                  <Button>Login</Button>
                </Link>
                <Link href={"/register"}>
                  <Button className="bg-co-blue p-5 text-white hover:text-co-blue hover:bg-transparent-60 duration-300 transition-all">Register property</Button>
                </Link>
              </>
            )}
          </>
        ) : (
          <div className="h-10 w-52 bg-gray-300 animate-pulse" />
        )}
      </div>
    </div>
  );
}
