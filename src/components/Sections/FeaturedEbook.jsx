"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FeaturedEbooks({ books }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-900">
            Featured Ebooks
          </h2>
          <p className="text-gray-500 mt-4">
            Handpicked books for better reading experience
          </p>
        </motion.div>

        {books.length === 0 ? (
          <p className="text-center text-gray-400 py-20">
            No ebooks available yet.
          </p>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-8"
          >
            {books.map((book) => (
              <motion.div
                key={book._id}
                variants={cardVariants}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
              >
                <Link href={`/books/${book._id}`}>
                  <div className="overflow-hidden">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
                      {book.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      by {book.authorName || "Unknown"}
                    </p>

                    <div className="flex items-center justify-between mt-4">
                      <span className="text-lg font-bold text-amber-600">
                        ${book.price}
                      </span>

                      <span className="text-xs px-3 py-1 rounded-full bg-violet-100 text-violet-700 font-medium">
                        {book.genre}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/books"
            className="inline-block px-8 py-3 rounded-full bg-black text-white font-semibold hover:scale-105 transition"
          >
            Browse All Ebooks →
          </Link>
        </div>

      </div>
    </section>
  );
}