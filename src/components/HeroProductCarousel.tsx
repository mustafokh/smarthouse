"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SLIDES = [
  {
    src: "/products/hero-layt-pink.png",
    label: "Yandex Layt",
  },
  {
    src: "/products/hero-midi-yellow.png",
    label: "Yandex Stansiya Midi",
  },
  {
    src: "/products/hero-layt-green.png",
    label: "Yandex Layt yashil",
  },
  {
    src: "/products/hero-midi-pink.png",
    label: "Yandex Stansiya Midi pushti",
  },
] as const;

const INTERVAL_MS = 1400;
const SLIDE_MS = 550;

export function HeroProductCarousel() {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => {
      setAnimating(true);
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!animating) return;
    const t = window.setTimeout(() => setAnimating(false), SLIDE_MS);
    return () => window.clearTimeout(t);
  }, [index, animating]);

  function goTo(i: number) {
    if (i === index) return;
    setAnimating(true);
    setIndex(i);
  }

  return (
    <div className="relative w-full">
      <div className="relative aspect-[5/4] w-full overflow-hidden sm:aspect-[16/10] md:aspect-[2.1/1]">
        <div
          className="flex h-full"
          style={{
            width: `${SLIDES.length * 100}%`,
            transform: `translateX(-${(index * 100) / SLIDES.length}%)`,
            transition: animating
              ? `transform ${SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`
              : "none",
          }}
        >
          {SLIDES.map((slide, i) => (
            <div
              key={slide.src}
              className="relative h-full shrink-0"
              style={{ width: `${100 / SLIDES.length}%` }}
            >
              <Image
                src={slide.src}
                alt={slide.label}
                fill
                className="object-contain drop-shadow-[0_18px_28px_rgba(15,23,42,0.28)]"
                sizes="(max-width:768px) 100vw, 960px"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-1.5 flex justify-center gap-1.5 pb-1">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            aria-label={slide.label}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-5 bg-white" : "w-1.5 bg-white/45"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
