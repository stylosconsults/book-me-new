import React from "react";

import Image from "next/image";
import { BlurredDataImage } from "@/lib/blurredImage";

type PropType = {
  selected: boolean;
  imgSrc: string;
  index: number;
  onClick: () => void;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, imgSrc, index, onClick } = props;

  return (
    <div
      className={"flex-shrink-0 flex-grow-0 basis-1/6 md:basis-1/4 min-w-0 pl-4 transition-opacity duration-20 relative".concat(
        selected ? " opacity-100" : " opacity-50"
      )}
    >
      <button
        onClick={onClick}
        className="appearance-none bg-transparent touch-manipulation block cursor-pointer border-0 p-0 m-0 w-full"
        type="button"
      >
        <div className="w-8 h-8 z-10 absolute top-1 right-1 rounded-full bg-black/80 flex items-center justify-center font-bold text-white">
          <span>{index + 1}</span>
        </div>
        <div className="relative h-36 w-full">
          <Image
            className="block object-cover"
            src={imgSrc}
            placeholder="blur"
            alt="Your alt text"
            blurDataURL={BlurredDataImage}
            fill
            priority
          />
        </div>
      </button>
    </div>
  );
};
