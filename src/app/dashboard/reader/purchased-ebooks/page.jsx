import Image from "next/image";
import Link from "next/link";

import { Button } from "@heroui/react";
import { BookOpen } from "@gravity-ui/icons";

import { getUserPurchases } from "@/lib/api/purchases";
import { getUserSession } from "@/lib/core/session";

const Page = async () => {
  const user = await getUserSession();

  const purchasebooks = await getUserPurchases(user?.email);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-foreground">
            Purchased Ebooks
          </h1>

          <p className="text-default-500 mt-2">
            Access and manage all ebooks you have purchased.
          </p>
        </div>

        {/* Empty State */}
        {purchasebooks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 border rounded-3xl">
            <BookOpen size={60} className="text-default-400" />

            <h2 className="mt-4 text-xl font-semibold">
              No Purchased Books Yet
            </h2>

            <p className="text-default-500 mt-2">
              Purchased ebooks will appear here.
            </p>
          </div>
        )}

        {/* Books Grid */}
        {purchasebooks.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {purchasebooks.map((purchase) => (
              <div
                key={purchase._id}
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
                    src={purchase.bookCoverImage}
                    alt={purchase.bookTitle}
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
                    {purchase.bookTitle}
                  </h2>

                  <div className="mt-3 space-y-1 text-sm text-default-500">
                    <p>
                      Purchased:
                      {" "}
                      {new Date(
                        purchase.purchasedAt
                      ).toLocaleDateString()}
                    </p>

                    <p>
                      Price:
                      {" "}
                      <span className="font-semibold text-success">
                        ${purchase.price}
                      </span>
                    </p>
                  </div>

                  <Link
                    href={`/books/${purchase.bookId}`}
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