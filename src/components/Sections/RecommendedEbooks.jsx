"use client";

import { motion } from "framer-motion";
import BookCard from "@/components/Books/BookCard";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function RecommendedEbooks({ books }) {
  return (
    <section className="py-20 bg-violet-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-violet-600 font-semibold">
            Recommended Picks
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900">
            Books fans are loving right now
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Explore a curated selection of ebooks that match trending genres and fresh releases.
          </p>
        </motion.div>

        {books.length === 0 ? (
          <p className="text-center text-gray-400 py-20">
            Recommendations will appear once ebooks are available.
          </p>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {books.map((book) => (
              <motion.div key={book._id} variants={itemVariants}>
                <BookCard book={book} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
