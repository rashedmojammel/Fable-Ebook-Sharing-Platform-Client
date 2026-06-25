"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { Magnifier } from "@gravity-ui/icons";

const GENRES = [
  "All",
  "Fiction",
  "Mystery",
  "Fantasy",
  "Romance",
  "Sci-Fi",
  "Educational",
];

const SORT_OPTIONS = [
  { label: "Newest", value: "" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
];

export default function BooksFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [genre, setGenre] = useState(searchParams.get("genre") || "All");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "");

  const [debouncedSearch] = useDebounce(search, 400);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const params = new URLSearchParams();

    if (debouncedSearch) params.set("search", debouncedSearch);
    if (genre && genre !== "All") params.set("genre", genre);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (sort) params.set("sort", sort);

    router.push(`/books?${params.toString()}`, { scroll: false });
  }, [debouncedSearch, genre, minPrice, maxPrice, sort]);

  const handleReset = () => {
    setSearch("");
    setGenre("All");
    setMinPrice("");
    setMaxPrice("");
    setSort("");
    router.push("/books", { scroll: false });
  };

  const hasFilters =
    search || (genre && genre !== "All") || minPrice || maxPrice || sort;

  return (
    <div className="space-y-4">

      {/* Search bar */}
      <div className="relative">
        <Magnifier
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
          width={18}
          height={18}
        />
        <input
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-12 pl-11 pr-4 border border-zinc-200 rounded-2xl bg-white text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-violet-400 transition"
        />
      </div>

      {/* Genre + Price + Sort row */}
      <div className="flex flex-wrap items-center gap-3">

        {/* Genre pills */}
        <div className="flex flex-wrap gap-2">
          {GENRES.map((g) => (
            <button
              key={g}
              onClick={() => setGenre(g)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                genre === g
                  ? "bg-violet-600 text-white border-violet-600"
                  : "bg-white text-zinc-600 border-zinc-200 hover:border-violet-300"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price range */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min $"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-24 h-10 px-3 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:border-violet-400 transition"
          />
          <span className="text-zinc-400 text-sm">—</span>
          <input
            type="number"
            placeholder="Max $"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-24 h-10 px-3 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:border-violet-400 transition"
          />
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="h-10 px-3 border border-zinc-200 rounded-xl text-sm text-zinc-700 focus:outline-none focus:border-violet-400 bg-white transition"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Reset */}
        {hasFilters && (
          <button
            onClick={handleReset}
            className="h-10 px-4 rounded-xl text-sm text-red-500 border border-red-200 hover:bg-red-50 transition"
          >
            Reset
          </button>
        )}
      </div>

    </div>
  );
}