"use client";

import BookCard from "@/components/Books/BookCard";

// import BookCard from "./BookCard";

export default function BooksGrid({ books }) {
  if (!books?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h3 className="text-2xl font-semibold text-zinc-700">
          No ebooks found
        </h3>

        <p className="text-zinc-500 mt-2">
          Try changing your filters.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-2
        md:grid-cols-3
        xl:grid-cols-4
        gap-6
      "
    >
      {books.map((book) => (
        <BookCard
          key={book._id}
          book={book}
        />
      ))}
    </div>
  );
}