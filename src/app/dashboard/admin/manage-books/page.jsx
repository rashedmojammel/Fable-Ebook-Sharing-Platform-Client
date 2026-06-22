import ManageBooksTable from "@/components/Dashboard/ManageBooksTable";
import { getBooks } from "@/lib/api/job";
// import ManageBooksTable from "@/components/admin/ManageBooksTable";

const Page = async () => {
  const books = await getBooks();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Manage All Ebooks</h1>
        <p className="text-default-500 mt-1">
          Publish, unpublish, or delete ebooks from the platform.
        </p>
      </div>

      <ManageBooksTable books={books} />
    </div>
  );
};

export default Page;