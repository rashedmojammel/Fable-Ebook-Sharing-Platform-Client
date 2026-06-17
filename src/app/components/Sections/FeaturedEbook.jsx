"use client";

import { motion } from "framer-motion";

const ebooks = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    image: "https://images-na.ssl-images-amazon.com/images/I/91bYsX41DVL.jpg",
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    image: "https://images-na.ssl-images-amazon.com/images/I/71aG+xDKSYL.jpg",
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    image: "https://images-na.ssl-images-amazon.com/images/I/41xShlnTZTL.jpg",
  },
  {
    title: "Zero to One",
    author: "Peter Thiel",
    image: "https://images-na.ssl-images-amazon.com/images/I/71m-MxdJ2WL.jpg",
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    image: "https://images-na.ssl-images-amazon.com/images/I/518FqJvR9aL.jpg",
  },
  {
    title: "Thinking Fast & Slow",
    author: "Daniel Kahneman",
    image: "https://images-na.ssl-images-amazon.com/images/I/71asFYBLloL.jpg",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function FeaturedEbooks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* HEADER */}
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

        {/* GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-8"
        >
          {ebooks.map((book, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="group bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition"
            >
              {/* IMAGE */}
              <div className="overflow-hidden">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <h3 className="font-semibold text-lg text-gray-900">
                  {book.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {book.author}
                </p>

                <button className="mt-4 text-sm font-semibold text-violet-600 hover:text-violet-800">
                  View Details →
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}