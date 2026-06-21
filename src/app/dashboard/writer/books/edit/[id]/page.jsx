import Link from "next/link";
import { Button } from "@heroui/react";

import { getBookById } from "@/lib/api/job";
import { getUserSession } from "@/lib/core/session";
import EditEbookForm from "./EditEbookForm";

const Page = async ({ params }) => {
  const { id } = await params;

  const book = await getBookById(id);
  const user = await getUserSession();

  if (!book || book.error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-zinc-900">
            Ebook not found
          </h1>
          <p className="text-zinc-500 mt-3">
            This ebook doesn't exist or may have been removed.
          </p>
          <Link href="/dashboard/writer/manage-ebooks">
            <Button color="primary" className="mt-6">
              Back to Manage Ebooks
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (book.authorEmail !== user?.email) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-zinc-900">
            Not authorized
          </h1>
          <p className="text-zinc-500 mt-3">
            You can only edit ebooks you've published.
          </p>
          <Link href="/dashboard/writer/manage-ebooks">
            <Button color="primary" className="mt-6">
              Back to Manage Ebooks
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return <EditEbookForm book={book} />;
};

export default Page;