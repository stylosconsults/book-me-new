"use client";
import { useEffect, useState } from "react";
import SearchHotel from "../organisms/SearchHotel";

export default function HomeImageSlider() {
  const images = [
    "/static/images/slide/1.png",
    "/static/images/slide/2.png",
    "/static/images/slide/3.png",
  ];

  const [hasMounted, setHasMounted] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      const interval = setInterval(() => {
        setActiveImage((prev) => (prev + 1) % images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMounted]);

  return (
    <div className="relative flex flex-col  justify-center mb-28 w-full h-fit">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={images[activeImage]}
        alt="Bookme"
        className="top-0 left-0 w-full object-cover rounded-md h-[550px] border-l-co-green border"
        draggable="false"
        loading="lazy"
        placeholder="blur"
      />
      <div className="-bottom-20 absolute w-full z-20">
        <SearchHotel />
      </div>
    </div>
  );
}
