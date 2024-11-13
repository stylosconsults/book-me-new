"use client";
import { useEffect, useState } from "react";
import SearchHotel from "../organisms/SearchHotel";

export default function HeroSection() {
  // const images = [
  //   "/static/images/slide/1.png",
  //   "/static/images/slide/2.png",
  //   "/static/images/slide/3.png",
  // ];

  // const [hasMounted, setHasMounted] = useState(false);
  // const [activeImage, setActiveImage] = useState(0);

  // useEffect(() => {
  //   setHasMounted(true);
  // }, []);

  // useEffect(() => {
  //   if (hasMounted) {
  //     const interval = setInterval(() => {
  //       setActiveImage((prev) => (prev + 1) % images.length);
  //     }, 5000);
  //     return () => clearInterval(interval);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [hasMounted]);

  return (
    <div className="relative mb-28 w-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <div
        className="-top-8 left-0 w-full object-cover rounded-none h-[300px]  bg-[#003b95]"
      />
       <div className="bottom-32 absolute w-full z-20 ml-[10%] text-white">
        <h1 className="text-5xl font-bold">Find your next stay</h1>
        <p className="text-2xl tracking-wide mt-2">Search deals on hotels, homes, and much more...</p>
      </div>
      <div className="-bottom-20 absolute w-full z-20">
        <SearchHotel />
      </div>
    </div>
  );
}
