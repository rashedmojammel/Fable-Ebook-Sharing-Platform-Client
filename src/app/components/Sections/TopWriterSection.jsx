"use client";

import { motion } from "framer-motion";

const writers = [
  {
    name: "James Clear",
    sales: "1.2M+ Sales",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Robert C. Martin",
    sales: "980K+ Sales",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Cal Newport",
    sales: "870K+ Sales",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const rankStyles = [
  "bg-yellow-400 text-black", // 1st
  "bg-gray-300 text-black",   // 2nd
  "bg-orange-300 text-black", // 3rd
];

export default function TopWriters() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-900">
            Top Writers
          </h2>
          <p className="text-gray-500 mt-3">
            Authors with highest ebook sales
          </p>
        </motion.div>

        {/* GRID */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {writers.map((writer, i) => (
            <motion.div
              key={i}
              variants={item}
              className="relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition group"
            >
              {/* RANK BADGE */}
              <div
                className={`absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${rankStyles[i]}`}
              >
                {i + 1}
              </div>

              {/* AVATAR */}
              <div className="flex flex-col items-center text-center">
                <img
                  src={writer.avatar}
                  alt={writer.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-gray-100 group-hover:scale-105 transition"
                />

                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {writer.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {writer.sales}
                </p>

                <button className="mt-4 px-4 py-2 rounded-full text-sm bg-violet-100 text-violet-600 hover:bg-violet-200 transition">
                  View Profile
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}