"use client";
import useStore from "@/store/main";
import { useUserStore } from "@/store/user";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  // const router = useRouter();
  // const auth = useStore(useUserStore, (state) => state);
  // const [hasAppMounted, setHasAppMounted] = useState(false);

  // useEffect(() => {
  //   setHasAppMounted(true);
  // }, []);

  // useEffect(() => {
  //   if (hasAppMounted && auth?.accessToken?.token) {
  //     router.push("/");
  //   }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [hasAppMounted]);
  return <>{children}</>;
}
