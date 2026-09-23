"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SLIDES = [
  {
    src: "/products/YSM-001-yellow.png",
    label: "Yandex Stansiya Midi",
  },
  {
    src: "/products/VKL-002.png",
    label: "Sensorli viklyuchatel",
  },
  {
    src: "/products/TGW-60W.png",
    label: "Smart termostat",
  },
  {
    src: "/products/SMZ-001.png",
    label: "Smart motor",
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
    <div className="relative h-40 w-40 shrink-0 sm:h-52 sm:w-52">
      <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] bg-white/95 shadow-[0_16px_40px_-12px_rgba(15,23,42,0.35)] ring-1 ring-white/50">
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
              className="object-contain p-4 sm:p-5"
              sizes="208px"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            aria-label={slide.label}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-5 bg-white" : "w-1.5 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
