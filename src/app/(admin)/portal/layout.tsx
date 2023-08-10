"use client";
import Navbar from "@/components/organisms/navbar";
import Sidebar from "@/components/organisms/sidebar";
import useStore from "@/store/main";
import { useUserStore } from "@/store/user";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  // const router = useRouter();
  // const auth = useStore(useUserStore, (state) => state);

  // useEffect(() => {
  //   if (!auth?.accessToken?.token) {
  //     router.push("/login");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [auth]);
  return (
    <div className="w-full relative flex">
      <aside className="min-h-screen sticky top-0 max-w-[350px] min-w-[300px] bg-co-black">
        <Sidebar />
      </aside>
      <div className="flex-grow">
        <nav
          className="sticky w-full bg-white z-50 filter-blur dark:bg-black top-0 px-4 md:px-10 py-3
         rounded-md mx-auto flex justify-between items-center shadow-sm"
        >
          <Navbar haveLogo={false} />
        </nav>
        {children}
      </div>
    </div>
  );
}
