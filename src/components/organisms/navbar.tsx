"use client";
import cn from "@/lib/classNames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../atoms/Logo";
import Button from "../atoms/Button";
import { useEffect, useState } from "react";

interface StoredData {
  token: string;
  expires: number;
}

function getLocalStorageWithExpiration(key: string): any {
  const data = localStorage.getItem(key);
  if (data !== null) {
    const parsedData: StoredData = JSON.parse(data);
    if (parsedData && new Date() < new Date(parsedData.expires)) {
      return parsedData.token;
    }
  }

  // If the data has expired or does not exist, remove it from localStorage
  localStorage.removeItem(key);
  return null;
}

export default function Navbar() {
  const pathname = usePathname();
  const [refreshToken, setRefreshToken] = useState("");

  // set refresh token if window is defined with use effect

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = getLocalStorageWithExpiration("refreshToken");
      if (token) {
        setRefreshToken(token);
      }
    }
  }, []);

  return (
    <>
      <div className="flex flex-row gap-1 text-tertiary">
        <Logo />
      </div>
      <div className={cn("flex flex-row items-center font-bold space-x-4")}>
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
        {refreshToken ? (
          <a
            href={`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/login?token=${refreshToken}`}
          >
            <Button className="capitalize">Go to dashboard</Button>
          </a>
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
              <Button className="bg-co-blue">Register property</Button>
            </Link>
          </>
        )}
      </div>
    </>
  );
}
