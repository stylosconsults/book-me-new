"use client";
import { ReactNode, useState } from "react";

import { MdArrowUpward, MdArrowDownward } from "react-icons/md";
import Button from "../atoms/Button";

interface StepProps {
  image: string;
  title: string;
  description: ReactNode;
  more: ReactNode;
}

export default function Step({ image, title, description, more }: StepProps) {
  const [moreShown, setMoreShown] = useState(false);
  return (
    <div className="flex flex-col items-center  z-40 bg-[#0143eb19] rounded-2xl p-4">
      <div className="flex flex-col items-center max-w-[430px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={title}
          className="w-full  max-w-[256px]"
          draggable="false"
          loading="lazy"
        />

        <h1 className="font-bold text-[#0143ebd2] text-2xl mb-2">{title}</h1>
        <p className="text-co-black text-opacity-80">{description}</p>
        <p className="text-co-black text-opacity-80">{moreShown && <>{more}</>}</p>
        
        <Button
          className="mt-3 w-full"
          onClick={() => setMoreShown(!moreShown)}
        >
          {moreShown ? "Show Less" : "Read More"}
          {moreShown ? <MdArrowUpward /> : <MdArrowDownward />}
        </Button>
      </div>
    </div>
  );
}
