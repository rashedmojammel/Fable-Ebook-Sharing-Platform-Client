"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const slides = [
  {
    tag: "Trending Now",
    title: "Discover Ebooks That Shape Your Thinking",
    desc: "Read, learn, and grow with thousands of curated digital books from writers around the world.",
    accent: "from-violet-500 to-fuchsia-500",
    bg: "from-violet-50 via-white to-fuchsia-50",
  },
  {
    tag: "New Release",
    title: "Your Library, Anywhere You Go",
    desc: "Save ebooks, build your personal collection, and access your purchases from any device.",
    accent: "from-blue-500 to-cyan-500",
    bg: "from-blue-50 via-white to-cyan-50",
  },
  {
    tag: "Editor's Pick",
    title: "Read Smarter Every Day",
    desc: "A minimal reading experience built for deep focus, clarity, and continuous growth.",
    accent: "from-rose-500 to-pink-500",
    bg: "from-rose-50 via-white to-pink-50",
  },
];

const CARD_COLORS = [
  "from-violet-400 to-purple-500",
  "from-blue-400 to-cyan-500",
  "from-rose-400 to-pink-500",
  "from-amber-400 to-orange-500",
];

const STATS = [
  { value: "10K+", label: "Ebooks" },
  { value: "5K+", label: "Writers" },
  { value: "50K+", label: "Readers" },
];

export default function HeroBanner() {
  const [index, setIndex] = useState(0);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // Fetch featured books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/books/featured`, {
          cache: "no-store",
        });
        const data = await res.json();
        setBooks(Array.isArray(data) ? data.slice(0, 4) : []);
      } catch (err) {
        console.error("Failed to fetch featured books:", err);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[index];

  return (
    <section
      className={`w-full bg-gradient-to-br ${slide.bg} transition-all duration-700 py-16 md:py-24 overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.45 }}
              >
                <span
                  className={`inline-block px-4 py-1.5 rounded-full bg-gradient-to-r ${slide.accent} text-white text-xs font-semibold shadow-sm`}
                >
                  {slide.tag}
                </span>

                <h1 className="text-4xl md:text-6xl font-black text-gray-900 mt-5 leading-[1.1] tracking-tight">
                  {slide.title}
                </h1>

                <p className="text-gray-500 mt-5 text-lg leading-relaxed max-w-lg">
                  {slide.desc}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/books"
                className={`px-7 py-3.5 rounded-full bg-gradient-to-r ${slide.accent} text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300`}
              >
                Explore Library
              </Link>

              <Link
                href="/books"
                className="px-7 py-3.5 rounded-full border-2 border-gray-200 text-gray-700 font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
              >
                Browse Genres
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-10 pt-8 border-t border-gray-200">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Slide controls */}
            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={() =>
                  setIndex((prev) => (prev - 1 + slides.length) % slides.length)
                }
                className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition"
              >
                ←
              </button>

              <div className="flex gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === index ? "w-8 bg-gray-900" : "w-2 bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setIndex((prev) => (prev + 1) % slides.length)}
                className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition"
              >
                →
              </button>
            </div>
          </div>

          {/* RIGHT SIDE - BOOK GRID */}
          <div className="relative">

            {/* Ambient glow */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${slide.accent} opacity-10 blur-3xl rounded-3xl pointer-events-none`}
            />

            {/* Skeleton loading */}
            {loading ? (
              <div className="relative grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white/80 rounded-2xl border border-white shadow-md overflow-hidden animate-pulse"
                  >
                    <div className="h-36 bg-gray-200" />
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative grid grid-cols-2 gap-4">
                {books.map((book, i) => (
                  <Link href={`/books/${book._id}`} key={book._id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      whileHover={{ y: -6, scale: 1.02 }}
                      className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                    >
                      {/* Cover image */}
                      {book.coverImage ? (
                        <div className="h-36 overflow-hidden">
                          <img
                            src={book.coverImage}
                            alt={book.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ) : (
                        <div
                          className={`h-36 bg-gradient-to-br ${CARD_COLORS[i % CARD_COLORS.length]} flex items-end p-4`}
                        >
                          <span className="text-white/90 text-xs font-medium bg-black/20 px-2 py-1 rounded-full">
                            📚 Ebook
                          </span>
                        </div>
                      )}

                      {/* Info */}
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-1">
                          {book.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                          {book.authorName || "Unknown"}
                        </p>
                        <p className="text-xs font-semibold text-amber-600 mt-2">
                          ${book.price}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                ))}

                {/* Fill empty slots if fewer than 4 books */}
                {books.length < 4 &&
                  [...Array(4 - books.length)].map((_, i) => (
                    <div
                      key={`empty-${i}`}
                      className={`h-36 bg-gradient-to-br ${CARD_COLORS[(books.length + i) % CARD_COLORS.length]} rounded-2xl opacity-30`}
                    />
                  ))}
              </div>
            )}

            {/* Floating badge top */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 flex items-center gap-2"
            >
              <span className="text-xl">🎉</span>
              <div>
                <p className="text-xs font-bold text-gray-900">New Arrivals</p>
                <p className="text-xs text-gray-500">Updated daily</p>
              </div>
            </motion.div>

            {/* Floating badge bottom */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 3.5,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 flex items-center gap-2"
            >
              <span className="text-xl">⭐</span>
              <div>
                <p className="text-xs font-bold text-gray-900">Top Rated</p>
                <p className="text-xs text-gray-500">By our readers</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}