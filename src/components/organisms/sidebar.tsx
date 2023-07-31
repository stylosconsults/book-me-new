"use client";
import React from "react";
import Logo from "../atoms/Logo";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="h-full flex flex-col">
      <div className="bg-white py-3 px-3">
        <Logo />
      </div>
      <div className="my-auto">
        <Link
          href={"/properties"}
          className="py-2 text-white pl-5 w-full block font-medium"
        >
          Dashboard
        </Link>
        <Link
          href={"/properties"}
          className="py-2 text-white pl-5 w-full block font-medium"
        >
          My Properties
        </Link>
        <Link
          href={"/account"}
          className="py-2 text-white pl-5 w-full block font-medium"
        >
          My Account
        </Link>
      </div>
      <div className="mt-auto">
        <button className="bg-red-500 py-3 w-full font-bold text-white text-lg">
          Logout
        </button>
      </div>
    </div>
  );
}
