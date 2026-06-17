'use client';
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaBook,
  FaGhost,
  FaRocket,
  FaHeart,
  FaMagic,
  FaSkull,
  FaSearch,
} from "react-icons/fa";

const genres = [
  {
    name: "Fiction",
    icon: <FaBook />,
    slug: "fiction",
    color: "from-blue-500 to-indigo-500",
  },
  {
    name: "Mystery",
    icon: <FaSearch />,
    slug: "mystery",
    color: "from-gray-700 to-black",
  },
  {
    name: "Romance",
    icon: <FaHeart />,
    slug: "romance",
    color: "from-pink-500 to-rose-500",
  },
  {
    name: "Sci-Fi",
    icon: <FaRocket />,
    slug: "sci-fi",
    color: "from-cyan-500 to-blue-500",
  },
  {
    name: "Fantasy",
    icon: <FaMagic />,
    slug: "fantasy",
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    name: "Horror",
    icon: <FaGhost />,
    slug: "horror",
    color: "from-red-500 to-black",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function EbookGenres() {
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
            Explore Genres
          </h2>
          <p className="text-gray-500 mt-3">
            Discover ebooks by category
          </p>
        </motion.div>

        {/* GRID */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {genres.map((genre, i) => (
            <motion.div key={i} variants={item}>
              <Link
                href={`/browse-ebooks?genre=${genre.slug}`}
                className="group block rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition"
              >
                <div
                  className={`h-36 bg-gradient-to-r ${genre.color} flex items-center justify-center text-white text-3xl group-hover:scale-105 transition`}
                >
                  {genre.icon}
                </div>

                <div className="p-5 bg-white border">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {genre.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Browse {genre.name} ebooks
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}