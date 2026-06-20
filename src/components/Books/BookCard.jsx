import Link from "next/link";
import Image from "next/image";
import { Bookmark, ShoppingCart } from "@gravity-ui/icons";
import { Button } from "@heroui/react";

export default function BookCard({ book }) {
  return (
    <Link href={`/books/${book._id}`}>
      <article className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300">
        
        {/* Cover */}
        <div className="relative h-72 overflow-hidden">
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-600 text-white">
              {book.genre}
            </span>
          </div>

          {/* safer check to avoid hydration mismatch */}
          {Boolean(book?.isSold) && (
            <div className="absolute top-3 left-3">
              <span className="bg-emerald-500 text-white text-xs px-3 py-1 rounded-full">
                Sold
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-xl font-bold text-zinc-900 line-clamp-1">
            {book.title}
          </h3>

          <p className="text-zinc-500 mt-1">
            by {book.authorName}
          </p>

          <div className="mt-5 flex items-center justify-between">
            <span className="text-2xl font-bold text-amber-600">
              ${book.price}
            </span>

            <div className="flex items-center gap-2">
              <Bookmark className="size-4 text-zinc-500" />

              <Button size="sm" className="bg-amber-500 text-white rounded-xl">
                <ShoppingCart className="size-4" />
                Buy
              </Button>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}