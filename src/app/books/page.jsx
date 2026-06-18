// import { getBooks } from "@/lib/api/books;
import { getBooks } from "@/lib/api/job";
import BooksGrid from "./BooksGrid";

export default async function BooksPage() {
  const books = await getBooks();

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-zinc-900">
          Explore Ebooks
        </h1>

        <p className="text-zinc-500 mt-2">
          Discover amazing books shared by talented writers.
        </p>
      </div>

      <BooksGrid books={books} />
    </section>
  );
}