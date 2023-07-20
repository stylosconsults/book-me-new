"use client";
import React, { useRef, useState, useEffect } from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

interface CarouselProps {
  children: React.ReactNode[];
  itemsToShow: number;
  slideInterval: number; // Time delay in milliseconds between each slide transition
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  itemsToShow,
  slideInterval,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const childrenLength = children.length;
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const startCarousel = () => {
      intervalIdRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % childrenLength;
          const remainingItems = childrenLength - nextIndex;
          return remainingItems >= itemsToShow ? nextIndex : 0;
        });
      }, slideInterval);
    };

    if (itemsToShow < childrenLength) {
      startCarousel();
    }

    return () => {
      // Clear the interval when the component unmounts
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    };
  }, [childrenLength, slideInterval, itemsToShow]);

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - itemsToShow + childrenLength) % childrenLength
    );
    // Reset the interval when the user clicks the Previous button
    if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    intervalIdRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % childrenLength);
    }, slideInterval);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + itemsToShow) % childrenLength);
    // Reset the interval when the user clicks the Next button
    if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    intervalIdRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % childrenLength);
    }, slideInterval);
  };

  const containerWidth = `${100 * Math.ceil(childrenLength / itemsToShow)}%`;
  const itemWidth = `${100 / childrenLength}%`;
  const isLastElement = currentIndex >= childrenLength - itemsToShow;
  const isFirstElement = currentIndex === 0;

  return (
    <div className="relative overflow-hidden w-full">
      <div className="flex items-center gap-2 justify-end pb-3">
        <button
          className={`px-4 py-1 bg-gray-700 text-white ${
            isFirstElement ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handlePrev}
          disabled={isFirstElement}
        >
          <MdNavigateBefore color="white" size={20} />
        </button>
        <button
          className={`px-4 py-1 bg-gray-700 text-white ${
            isLastElement ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleNext}
          disabled={isLastElement}
        >
          <MdNavigateNext color="white" size={20} />
        </button>
      </div>
      <div
        className="flex transition-transform duration-300"
        ref={carouselRef}
        style={{
          transform: `translateX(-${(100 / childrenLength) * currentIndex}%)`,
          width: containerWidth,
        }}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className={`flex-none bg-transparent first:pl-0 pl-3`}
            style={{ maxWidth: itemWidth }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
