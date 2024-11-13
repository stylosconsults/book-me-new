import Link from "next/link";
import React from "react";
// import Logo from "../atoms/Logo";
import Logo from "../components/atoms/Logo";
import Image from "next/image";
import Illustration from "../components/atoms/Illustration"

const page = () => {
  return (
    <div className='bg-white flex flex-col w-full py-20 items-center justify-center gap-10 h-[80vh]'>
      <div className="flex flex-row gap-1 text-tertiary">
        <Logo />
      </div>
      <Illustration/>
      <div className='flex flex-col items-center justify-center gap-6'>
        <div className='flex flex-col items-center justify-center gap-4'>
          <h1 className='font-bold text-2xl text-[#000000]'>
            Something went wrong
          </h1>
          <p className='font-normal text-md text-[#000000]'>
            Sorry , We can’t find this page you’re looking for.
          </p>
        </div>

        <Link className='py-3 w-1/2 bg-[#0142EB] text-white rounded-full font-semibold flex items-center justify-center hover:scale-95 transition-all duration-300' href={"/"}>
          Go back
        </Link>
      </div>
    </div>
  );
};

export default page;
