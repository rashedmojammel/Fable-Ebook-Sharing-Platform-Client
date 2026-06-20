import Image from "next/image";
import Link from "next/link";

import { Button } from "@heroui/react";
import { Bookmark } from "@gravity-ui/icons";
import { getUserSession } from "@/lib/core/session";
import { getUserBookmarks } from "@/lib/api/bookmarks";

// import { getUserBookmarks } from "@/lib/api/bookmarks";
// import { getUserSession } from "@/lib/core/session";

const Page = async () => {
  const user = await getUserSession();

  const bookmarks = await getUserBookmarks(user?.email);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-foreground">
            Bookmarks
          </h1>

          <p className="text-default-500 mt-2">
            Ebooks you've saved to read or buy later.
          </p>
        </div>

        {/* Empty State */}
        {bookmarks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 border rounded-3xl">
            <Bookmark size={60} className="text-default-400" />

            <h2 className="mt-4 text-xl font-semibold">
              No Bookmarks Yet
            </h2>

            <p className="text-default-500 mt-2">
              Save ebooks while browsing to find them here.
            </p>

            <Link href="/books" className="mt-5">
              <Button color="primary">Browse Ebooks</Button>
            </Link>
          </div>
        )}

        {/* Books Grid */}
        {bookmarks.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {bookmarks.map((bookmark) => (
              <div
                key={bookmark._id}
                className="
                  group
                  overflow-hidden
                  rounded-3xl
                  border
                  bg-content1
                  shadow-sm
                  hover:shadow-xl
                  transition-all
                  duration-300
                "
              >
                {/* Cover */}
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={bookmark.bookCoverImage}
                    alt={bookmark.bookTitle}
                    fill
                    className="
                      object-cover
                      group-hover:scale-105
                      transition-transform
                      duration-500
                    "
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h2 className="font-bold text-lg line-clamp-1">
                    {bookmark.bookTitle}
                  </h2>

                  <p className="text-sm text-default-500 mt-1">
                    by {bookmark.writerName}
                  </p>

                  <p className="mt-3 text-sm font-semibold text-success">
                    ${bookmark.price}
                  </p>

                  <Link
                    href={`/books/${bookmark.bookId}`}
                    className="block mt-5"
                  >
                    <Button
                      fullWidth
                      color="primary"
                      variant="flat"
                    >
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;