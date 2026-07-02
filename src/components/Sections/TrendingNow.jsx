"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function TrendingNow({ books }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-[0.3em] text-violet-600 font-semibold">
            Trending Now
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900">
            Swipe through top ebook picks
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Browse the hottest ebooks and find your next favorite story in one smooth carousel.
          </p>
        </div>

        {books.length === 0 ? (
          <p className="text-center text-gray-400 py-20">
            No trending ebooks available yet.
          </p>
        ) : (
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {books.map((book) => (
              <SwiperSlide key={book._id}>
                <Link
                  href={`/books/${book._id}`}
                  className="group block rounded-[2rem] overflow-hidden border border-zinc-200 shadow-sm hover:shadow-xl transition-all duration-300 bg-white"
                >
                  <div className="relative h-96 overflow-hidden">
                    <Image
                      src={book.coverImage}
                      alt={book.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-6">
                    <span className="inline-flex px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold uppercase tracking-[0.16em]">
                      {book.genre}
                    </span>

                    <h3 className="mt-5 text-2xl font-semibold text-zinc-900 line-clamp-2">
                      {book.title}
                    </h3>

                    <p className="mt-3 text-sm text-zinc-500">
                      by {book.authorName || "Unknown"}
                    </p>

                    <div className="mt-6 flex items-center justify-between gap-3">
                      <span className="text-2xl font-bold text-amber-600">
                        ${book.price}
                      </span>
                      <span className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                        Read now
                      </span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
