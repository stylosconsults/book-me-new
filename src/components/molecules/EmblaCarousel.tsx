import { useState, useEffect, useCallback, useRef } from "react";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import Image from "next/image";

import { Thumb } from "./ThumbCoursel";
import { BlurredDataImage } from "@/lib/blurredImage";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides } = props;
  const options: EmblaOptionsType = {
    dragFree: true,
    containScroll: "trimSnaps",
  };
  const autoplayOptions = useRef(
    Autoplay(
      { delay: 1000, stopOnInteraction: false },
      // @ts-ignore
      (emblaRoot) => emblaRoot.parentElement
    )
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel(
    {
      containScroll: "keepSnaps",
      dragFree: true,
    },
    [autoplayOptions.current]
  );

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      // @ts-ignore
      if (emblaThumbsApi.clickAllowed()) emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="">
      <div className="overflow-hidden" ref={emblaMainRef}>
        <div className="flex flex-row h-auto -ml-4">
          {slides.map((src, index) => (
            <div
              className="flex-shrink-0 flex-grow-0 basis-full min-w-0 pl-4 relative"
              key={index}
            >
              <div className="w-10 h-10 z-10 absolute top-2 right-2 rounded-full bg-black/10 font-bold text-center pointer-events-none flex items-center justify-center text-white">
                <span>{index + 1}</span>
              </div>
              <div className="relative h-[80vh] w-full">
                <Image
                  className="block object-cover"
                  src={src.toString()}
                  alt="Your alt text"
                  placeholder="blur"
                  blurDataURL={BlurredDataImage}
                  fill
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <div className="overflow-hidden" ref={emblaThumbsRef}>
          <div className="flex flex-row -ml-4">
            {slides.map((src, index) => (
              <Thumb
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
                imgSrc={src.toString()}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
