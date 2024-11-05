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
    <>
      <div className="flex flex-row gap-1 text-tertiary">
        {haveLogo && <Logo />}
      </div>
      <div className={cn("flex flex-row items-center font-bold space-x-4")}>
        <Link
          className={pathname?.includes("about") ? "text-blue-500" : ""}
          href="/vehicles"
        >
          Vehicles
        </Link>
        <Link
          className={pathname?.includes("about") ? "text-blue-500" : ""}
          href="/about-us"
        >
          About us
        </Link>
        <Link
          className={pathname?.includes("contact") ? "text-blue-500" : ""}
          href="/contact-us"
        >
          Contact us
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
    </>
  );
}
