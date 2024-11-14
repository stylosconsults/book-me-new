"use client";
import Link from "next/link";
import Svg404 from "../../public/static/images/404/404.svg"
import { useRouter } from "next/navigation";


export default function NotFound() {
  const router = useRouter()
  return (
   <div className="flex flex-col items-center border border-red-500 h-[100vh] gap-2 justify-center">
      <Svg404 className = "border border-red-500 w-[50%]" />
      <p className="font-bold text-[1.3em] ">
        Something went wrong
      </p>

      <p className="text-text404 text-[1.1em]">Sorry, We can't find this page you're looking for.</p>

      <button onClick={()=> router.back()} className="bg-mainAboutUsBlue text-white w-[15%] text-center p-1 rounded-[20px] mt-2">Go back</button>
   </div>
  );
}
