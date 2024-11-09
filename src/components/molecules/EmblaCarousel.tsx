import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { BlurredDataImage } from "@/lib/blurredImage";

type PropType = {
  slides: string[];
  autoplay?: boolean;
  delayMs?: number;
  showProgress?: boolean;
  showThumbnails?: boolean;
};

const EmblaCarousel = ({
  slides,
  autoplay = true,
  delayMs = 5000,
  showProgress = true,
  showThumbnails = true,
}: PropType) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [thumbsRef, thumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaApi || !thumbsApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi, thumbsApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || !autoplay) return;

    let animationFrame: number;
    let lastTime = Date.now();
    let isRunning = true;

    const animate = () => {
      if (!isRunning || !emblaApi || !emblaApi.canScrollNext()) {
        cancelAnimationFrame(animationFrame);
        return;
      }

      const now = Date.now();
      const elapsed = now - lastTime;

      setProgress((prev) => {
        const next = prev + (elapsed / delayMs) * 100;
        if (next >= 100) {
          lastTime = now;
          try {
            if (emblaApi && emblaApi.canScrollNext()) {
              emblaApi.scrollNext();
            }
          } catch (error) {
            console.error('Error scrolling:', error);
          }
          return 0;
        }
        return next;
      });

      lastTime = now;
      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    
    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrame);
    };
  }, [emblaApi, autoplay, delayMs]);

  if (!slides.length) return null;

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg max-h-[60vh]" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {slides?.map((src, index) => (
            <div
              className="relative flex-[0_0_100%] min-w-0 flex"
              key={index}
            >
              <div className="relative w-full pt-[56.25%]">
                <Image
                  className="absolute inset-0 w-full h-full object-cover"
                  src={src}
                  alt={`Slide ${index + 1}`}
                  fill
                  placeholder="blur"
                  blurDataURL={BlurredDataImage}
                  priority={index === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {showProgress && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
          <div
            className="h-full bg-white transition-all duration-200 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {showThumbnails && (
        <div className="mt-4" ref={thumbsRef}>
          <div className="flex gap-8 px-2">
            {slides.map((src, index) => (
              <button
                key={index}
                onClick={() => onThumbClick(index)}
                className={`relative flex-[0_0_20%] min-w-0 w-40 transition-opacity duration-300 ${
                  selectedIndex === index ? "opacity-100 scale-110 border-20 border-blue-500 rounded-md " : "  opacity-50 "
                }`}
              >
                <div className="relative pt-[56.25%]">
                  <Image
                    className={`absolute inset-0 w-full h-full object-cover rounded-md ${selectedIndex === index ? "border-20 border-blue-500" : "hover:scale-[105%] transition-all duration-300"}`}
                    src={src}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    placeholder="blur"
                    blurDataURL={BlurredDataImage}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmblaCarousel;
