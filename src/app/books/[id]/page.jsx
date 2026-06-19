import Image from "next/image";
import Link from "next/link";

import {
  Bookmark,
  Calendar,
  CircleDollar,
  Person,
  BookOpen,
} from "@gravity-ui/icons";

import { Button, Chip } from "@heroui/react";
import { getBookById, getBooks } from "@/lib/api/job";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const Page = async ({ params }) => {
  const { id } = await params;
  // const session = await auth.api.getSession({
  //     headers : await headers()
  //    });
  //  console.log("Session:", session); // Log the session object to the console
  //  const userName = session?.user?.name || "Unknown User";
  //  console.log("User Name:", userName); // Log the user's name to the console


  const book = await getBookById(id);
  console.log("Book Details:", book); // Log the fetched book details to the console

  const books2 = await getBooks();
    

  if (!book) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-zinc-900">
            Ebook Not Found
          </h1>

          <p className="text-zinc-500 mt-3">
            The ebook you're looking for doesn't exist.
          </p>

          <Link href="/books">
            <Button color="primary" className="mt-6">
              Browse Books
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Replace these with actual auth logic later
  const isOwner = false;
  const purchased = false;

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">

      <div className="grid lg:grid-cols-12 gap-10">

        {/* LEFT SIDE */}

        <div className="lg:col-span-4">
          <div className="sticky top-24">

            <div className="overflow-hidden rounded-3xl border border-zinc-200 shadow-sm">
              <Image
                src={book.coverImage}
                alt={book.title}
                width={700}
                height={1000}
                className="w-full h-[560px] object-cover"
              />
            </div>

            <div className="mt-6 space-y-3">

               <form action="/api/checkout_sessions" method="POST">
      <section>
        <button type="submit" role="link">
          Checkout
        </button>
      </section>
    </form>

              {purchased ? (
                <Button
                  fullWidth
                  color="success"
                  size="lg"
                >
                  Already Purchased
                </Button>
              ) : (
                <Button
                  fullWidth
                  color="primary"
                  size="lg"
                  isDisabled={isOwner}
                >
                  Buy Now — ${book.price}
                </Button>
              )}

              <Button
                fullWidth
                variant="bordered"
                size="lg"
                startContent={<Bookmark />}
              >
                Bookmark
              </Button>

              {isOwner && (
                <p className="text-center text-danger text-sm">
                  You cannot purchase your own ebook.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="lg:col-span-8">

          {/* BADGES */}

          <div className="flex gap-3 mb-4">
            <Chip
              size="sm"
              color="warning"
              variant="flat"
            >
              {book.genre}
            </Chip>

            <Chip
              size="sm"
              color="success"
              variant="flat"
            >
              Available
            </Chip>
          </div>

          {/* TITLE */}

          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900">
            {book.title}
          </h1>

          {/* WRITER */}

          <div className="mt-3">
            <Link
              href={`/writers/${book.writerId || ""}`}
              className="text-primary font-medium hover:underline"
            >
              by {book.authorName || "Unknown Writer"}
            </Link>
          </div>

          {/* INFO BAR */}

          <div className="border-t border-b border-zinc-200 py-5 mt-6">
            <div className="flex flex-wrap gap-8 text-zinc-600">

              <div className="flex items-center gap-2">
                <CircleDollar width={18} />
                <span className="font-semibold text-orange-600">
                  ${book.price}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar width={18} />
                <span>
                  {new Date(book.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <BookOpen width={18} />
                <span>{book.genre}</span>
              </div>

              <div className="flex items-center gap-2">
                <Person width={18} />
                <span>
                  {book.authorName || "Unknown"}
                </span>
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}

          <div className="mt-8">

            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              About this ebook
            </h2>

            <p className="text-zinc-600 leading-8">
              {book.description}
            </p>

          </div>

          {/* CONTENT PREVIEW */}

          <div className="mt-10 border border-zinc-200 rounded-2xl p-6 bg-zinc-50">

            <h3 className="text-xl font-semibold text-zinc-900 mb-4">
              Preview
            </h3>

            {purchased ? (
              <div>
                <p className="leading-8 text-zinc-700">
                  {book.fullContent || book.description}
                </p>
              </div>
            ) : (
              <div>

                <p className="text-zinc-600 leading-8">
                  {book.description?.slice(0, 250)}
                  ...
                </p>

                <p className="mt-5 text-orange-600 font-medium">
                  Purchase to unlock the full content.
                </p>

              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};

export default Page;