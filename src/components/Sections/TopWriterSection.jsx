"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const rankStyles = [
  "bg-yellow-400 text-black",
  "bg-gray-300 text-black",
  "bg-orange-300 text-black",
];

export default function TopWriters({ writers }) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

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

        {writers.length === 0 ? (
          <p className="text-center text-gray-400 py-10">
            No sales data yet — check back soon.
          </p>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {writers.map((writer, i) => (
              <motion.div
                key={writer._id}
                variants={item}
                className="relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition group"
              >
                <div
                  className={`absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${rankStyles[i]}`}
                >
                  {i + 1}
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-400 flex items-center justify-center border-4 border-gray-100 group-hover:scale-105 transition">
                    <span className="text-3xl font-black text-white">
                      {writer.name?.charAt(0)?.toUpperCase() || "?"}
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-semibold text-gray-900">
                    {writer.name || "Unknown Writer"}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {writer.totalSales} sale{writer.totalSales !== 1 ? "s" : ""}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>
    </section>
  );
}