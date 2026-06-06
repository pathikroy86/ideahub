"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    image: "https://i.ibb.co.com/0yr47H2N/banner1.avif",
    eyebrow: "Launch better ideas",
    title: "Share Ideas. Inspire the Future. Build Together.",
    highlight: "Inspire",
    description:
      "IdeaVault is a community platform to share startup ideas, explore innovative concepts, and collaborate to turn ideas into reality.",
  },
  {
    id: 2,
    image: "https://i.ibb.co.com/W46Rh69T/banner2.avif",
    eyebrow: "Find your spark",
    title: "Discover Concepts. Validate Faster. Grow Smarter.",
    highlight: "Validate",
    description:
      "Browse fresh ideas, learn from community feedback, and shape early concepts into stronger startup opportunities.",
  },
  {
    id: 3,
    image: "https://i.ibb.co.com/yFQ8PD2d/banner3.avif",
    eyebrow: "Collaborate openly",
    title: "Meet Builders. Exchange Feedback. Create Momentum.",
    highlight: "Exchange",
    description:
      "Connect with makers, founders, and curious thinkers who can help refine the next product worth building.",
  },
  {
    id: 4,
    image: "https://i.ibb.co.com/SwZb2fb5/banner4.png",
    eyebrow: "Build what matters",
    title: "Turn Problems into Products People Love.",
    highlight: "Products",
    description:
      "Capture the problem, outline the solution, and bring your startup idea into a community built for action.",
  },
];

const splitTitle = (title, highlight) => {
  const parts = title.split(highlight);

  if (parts.length === 1) {
    return title;
  }

  return (
    <>
      {parts[0]}
      <span className="text-[#4f46e5]">{highlight}</span>
      {parts.slice(1).join(highlight)}
    </>
  );
};

const Banner = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#f7f8ff] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-white shadow-[0_18px_55px_rgba(42,53,121,0.08)] ring-1 ring-slate-100">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <article
              aria-hidden={activeSlide !== index}
              className="grid min-w-full items-center gap-6 px-5 py-8 sm:px-8 md:grid-cols-[0.95fr_1.05fr] lg:gap-8 lg:px-12 lg:py-12"
              key={slide.id}
            >
              <div className="mx-auto max-w-xl text-center md:mx-0 md:text-left">
                <p className="mb-3 text-xs font-bold uppercase tracking-normal text-[#4f46e5] sm:text-sm">
                  {slide.eyebrow}
                </p>
                <h1 className="text-3xl font-black leading-tight tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
                  {splitTitle(slide.title, slide.highlight)}
                </h1>
                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 lg:max-w-lg">
                  {slide.description}
                </p>

                <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row md:justify-start">
                  <Link
                    href="/ideas"
                    className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#4f46e5] px-7 text-sm font-bold text-white shadow-[0_12px_28px_rgba(79,70,229,0.25)] transition hover:bg-[#4338ca] focus:outline-none focus:ring-2 focus:ring-[#6f7cf6] focus:ring-offset-2 sm:w-auto"
                  >
                    Explore Ideas
                  </Link>
                  <button
                    className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-transparent px-2 text-sm font-bold text-slate-700 transition hover:text-[#3651d6] focus:outline-none focus:ring-2 focus:ring-[#6f7cf6] focus:ring-offset-2 sm:w-auto"
                    type="button"
                  >
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#eef0ff] text-[#4f46e5] shadow-[0_10px_20px_rgba(79,70,229,0.14)]">
                      <span className="ml-0.5 h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-current" />
                    </span>
                    How it works
                  </button>
                </div>
              </div>

              <div className="relative mx-auto aspect-[1.22/1] w-full max-w-md md:max-w-xl">
                <Image
                  alt={`${slide.eyebrow} illustration`}
                  className="object-contain"
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1024px) 560px, (min-width: 768px) 48vw, 90vw"
                  src={slide.image}
                />
              </div>
            </article>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 pb-6">
          {slides.map((slide, index) => (
            <button
              aria-label={`Show slide ${index + 1}`}
              aria-pressed={activeSlide === index}
              className={`h-2 rounded-full transition-all ${
                activeSlide === index
                  ? "w-6 bg-[#4f46e5]"
                  : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
              key={slide.id}
              onClick={() => setActiveSlide(index)}
              type="button"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
