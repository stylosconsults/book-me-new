"use client";
import cn from "@/lib/classNames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../atoms/Logo";

export default function Navbar() {
  const pathname = usePathname();

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
      </div>
    </>
  );
}
