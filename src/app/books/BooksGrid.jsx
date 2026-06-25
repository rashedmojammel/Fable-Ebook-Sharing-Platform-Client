"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import BookCard from "@/components/Books/BookCard";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const BOOKS_PER_PAGE = 8;

export default function BooksGrid() {
  const searchParams = useSearchParams();
  const [allBooks, setAllBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch all books once
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${baseUrl}/api/books`, { cache: "no-store" });
        const data = await res.json();
        setAllBooks(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setAllBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchParams]);

  // Filter + sort on the client whenever searchParams change
  const filteredBooks = useMemo(() => {
    const search = searchParams.get("search")?.toLowerCase() || "";
    const genre = searchParams.get("genre") || "All";
    const minPrice = parseFloat(searchParams.get("minPrice")) || null;
    const maxPrice = parseFloat(searchParams.get("maxPrice")) || null;
    const sort = searchParams.get("sort") || "";

    let result = [...allBooks];

    if (search) {
      result = result.filter(
        (b) =>
          b.title?.toLowerCase().includes(search) ||
          b.authorName?.toLowerCase().includes(search)
      );
    }

    if (genre && genre !== "All") {
      result = result.filter((b) => b.genre === genre);
    }

    if (minPrice !== null) {
      result = result.filter((b) => parseFloat(b.price) >= minPrice);
    }

    if (maxPrice !== null) {
      result = result.filter((b) => parseFloat(b.price) <= maxPrice);
    }

    if (sort === "price_asc") {
      result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sort === "price_desc") {
      result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    return result;
  }, [allBooks, searchParams]);

  const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);

  const paginatedBooks = useMemo(() => {
    const start = (currentPage - 1) * BOOKS_PER_PAGE;
    return filteredBooks.slice(start, start + BOOKS_PER_PAGE);
  }, [filteredBooks, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Build page number array with ellipsis
  const getPageNumbers = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages = [];
    if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, "...", totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
    }
    return pages;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="rounded-3xl border border-zinc-100 overflow-hidden">
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

  if (!filteredBooks.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h3 className="text-2xl font-semibold text-zinc-700">No ebooks found</h3>
        <p className="text-zinc-500 mt-2">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Results count */}
      <p className="text-sm text-zinc-500">
        Showing{" "}
        <span className="font-medium text-zinc-700">
          {(currentPage - 1) * BOOKS_PER_PAGE + 1}–
          {Math.min(currentPage * BOOKS_PER_PAGE, filteredBooks.length)}
        </span>{" "}
        of <span className="font-medium text-zinc-700">{filteredBooks.length}</span> ebooks
      </p>

      {/* Books grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedBooks.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1 pt-4">
          {/* Prev */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-9 px-3 rounded-xl border border-zinc-200 text-sm text-zinc-600 hover:border-violet-400 hover:text-violet-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            ← Prev
          </button>

          {/* Page numbers */}
          {getPageNumbers().map((page, i) =>
            page === "..." ? (
              <span key={`ellipsis-${i}`} className="px-2 text-zinc-400 text-sm">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`h-9 w-9 rounded-xl text-sm font-medium border transition ${
                  currentPage === page
                    ? "bg-violet-600 text-white border-violet-600"
                    : "border-zinc-200 text-zinc-600 hover:border-violet-400 hover:text-violet-600"
                }`}
              >
                {page}
              </button>
            )
          )}

          {/* Next */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-9 px-3 rounded-xl border border-zinc-200 text-sm text-zinc-600 hover:border-violet-400 hover:text-violet-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}