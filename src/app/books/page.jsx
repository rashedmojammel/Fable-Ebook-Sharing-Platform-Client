// import { getBooks } from "@/lib/api/job";
// import BooksGrid from "./BooksGrid";
// import BooksFilter from "./SearchAndFilter";
// // import BooksFilter from "./BooksFilter";

// export const dynamic = "force-dynamic";

// export default async function BooksPage({ searchParams }) {
//   const { genre, search, minPrice, maxPrice, sort } = await searchParams;

//   const books = await getBooks({ genre, search, minPrice, maxPrice, sort });

//   return (
//     <section className="max-w-7xl mx-auto px-4 py-8">

//       <div className="mb-8">
//         <h1 className="text-4xl font-bold text-zinc-900">Explore Ebooks</h1>
//         <p className="text-zinc-500 mt-2">
//           Discover amazing books shared by talented writers.
//         </p>
//       </div>

//       <BooksFilter />

//       <div className="mt-6">
//         <BooksGrid books={books || []} />
//       </div>

//     </section>
//   );
// }
import BooksGrid from "./BooksGrid";
// import BooksFilter from "./BooksFilter";
import { Suspense } from "react";
import BooksFilter from "./SearchAndFilter";

export default function BooksPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-zinc-900">Explore Ebooks</h1>
        <p className="text-zinc-500 mt-2">
          Discover amazing books shared by talented writers.
        </p>
      </div>

      <Suspense>
        <BooksFilter />
      </Suspense>

      <div className="mt-6">
        <Suspense>
          <BooksGrid />
        </Suspense>
      </div>

    </section>
  );
}