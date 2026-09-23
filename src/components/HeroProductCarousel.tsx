"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SLIDES = [
  {
    src: "/products/YSL-001-pink.png",
    label: "Yandex Layt",
  },
  {
    src: "/products/YSM-001-yellow.png",
    label: "Yandex Stansiya Midi",
  },
  {
    src: "/products/YSL-001-green.png",
    label: "Yandex Layt yashil",
  },
  {
    src: "/products/YSL-001-teal.png",
    label: "Yandex Layt moviy",
  },
] as const;

export function HeroProductCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 2000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative w-full">
      <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10] md:aspect-[2/1]">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-500 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.label}
              fill
              className="object-contain p-2 sm:p-4"
              sizes="(max-width:768px) 100vw, 960px"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      <div className="mt-2 flex justify-center gap-1.5 pb-1">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            aria-label={slide.label}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-5 bg-white" : "w-1.5 bg-white/45"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
