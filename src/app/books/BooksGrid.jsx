// "use client";

// import BookCard from "@/components/Books/BookCard";

// export default function BooksGrid({ books }) {
//   if (!books?.length) {
//     return (
//       <div className="flex flex-col items-center justify-center py-20">
//         <h3 className="text-2xl font-semibold text-zinc-700">
//           No ebooks found
//         </h3>
//         <p className="text-zinc-500 mt-2">
//           Try changing your filters.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
//       {books.map((book) => (
//         <BookCard
//           key={book._id}
//           book={book}
//         />
//       ))}
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import BookCard from "@/components/Books/BookCard";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function BooksGrid() {
  const searchParams = useSearchParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);

      try {
        const params = new URLSearchParams();

        const search = searchParams.get("search");
        const genre = searchParams.get("genre");
        const minPrice = searchParams.get("minPrice");
        const maxPrice = searchParams.get("maxPrice");
        const sort = searchParams.get("sort");

        if (search) params.set("search", search);
        if (genre) params.set("genre", genre);
        if (minPrice) params.set("minPrice", minPrice);
        if (maxPrice) params.set("maxPrice", maxPrice);
        if (sort) params.set("sort", sort);

        const path = params.toString()
          ? `/api/books?${params.toString()}`
          : `/api/books`;

        const res = await fetch(`${baseUrl}${path}`, { cache: "no-store" });
        const data = await res.json();

        setBooks(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="rounded-3xl border border-zinc-100 overflow-hidden"
          >
            <div className="h-72 bg-zinc-200 animate-pulse" />
            <div className="p-5 space-y-3">
              <div className="h-5 bg-zinc-200 rounded-xl w-4/5 animate-pulse" />
              <div className="h-4 bg-zinc-200 rounded-lg w-1/2 animate-pulse" />
              <div className="h-8 bg-zinc-200 rounded-xl animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!books.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h3 className="text-2xl font-semibold text-zinc-700">
          No ebooks found
        </h3>
        <p className="text-zinc-500 mt-2">
          Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
}