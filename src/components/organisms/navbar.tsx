"use client";
import cn from "@/lib/classNames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../atoms/Logo";
import Button from "../atoms/Button";
import useStore from "@/store/main";
import { useUserStore } from "@/store/user";

export default function Navbar() {
  const pathname = usePathname();
  const auth = useStore(useUserStore, (state) => state);
  const tokenStillActive =
    auth?.accessToken?.expires &&
    new Date(auth?.accessToken?.expires) > new Date();

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
        {tokenStillActive ? (
          <p>
            <Button className="capitalize">{auth?.user?.name}</Button>
          </p>
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
