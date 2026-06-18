"use client";

import { useState } from "react";

const slides = [
  {
    title: "Discover Ebooks That Shape Your Thinking",
    desc: "Read, learn, and grow with thousands of curated digital books.",
    tag: "Trending Now",
  },
  {
    title: "Your Library, Anywhere You Go",
    desc: "Save ebooks, organize collections, and read offline anytime.",
    tag: "New Release",
  },
  {
    title: "Read Smarter Every Day",
    desc: "Minimal reading experience built for focus and clarity.",
    tag: "Editor’s Pick",
  },
];

const books = [
  { title: "Atomic Habits", author: "James Clear" },
  { title: "Deep Work", author: "Cal Newport" },
  { title: "Zero to One", author: "Peter Thiel" },
  { title: "Clean Code", author: "Robert C. Martin" },
];

export default function HeroBanner() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div>

            <span className="inline-block px-4 py-2 rounded-full bg-violet-100 text-violet-600 text-xs font-semibold">
              {slides[index].tag}
            </span>

            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mt-4 leading-tight transition-all duration-500">
              {slides[index].title}
            </h1>

            <p className="text-gray-600 mt-5 text-lg">
              {slides[index].desc}
            </p>

            <div className="mt-8 flex gap-4">
              <button className="px-6 py-3 rounded-full bg-black text-white font-semibold hover:scale-105 transition">
                Explore Library
              </button>

              <button className="px-6 py-3 rounded-full border border-gray-300 hover:border-black transition">
                Browse Categories
              </button>
            </div>

            {/* Controls */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-100"
              >
                ←
              </button>

              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-100"
              >
                →
              </button>
            </div>
          </div>

          {/* RIGHT SIDE - BOOK GRID */}
          <div className="grid grid-cols-2 gap-4">

            {books.map((book, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl border bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition"
              >
                <div className="h-32 bg-gradient-to-br from-violet-100 to-pink-100 rounded-xl mb-4" />

                <h3 className="font-semibold text-gray-900">
                  {book.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {book.author}
                </p>
              </div>
            ))}

          </div>
        </div>

        {/* Bottom indicator */}
        <div className="flex gap-2 mt-12 justify-center">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-8 bg-black" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}