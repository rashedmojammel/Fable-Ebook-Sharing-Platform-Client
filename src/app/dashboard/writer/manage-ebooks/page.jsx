import React from "react";
import Link from "next/link";

import { Button } from "@heroui/react";
import { SquarePlus, BookOpen } from "@gravity-ui/icons";

import { getBooks } from "@/lib/api/job";
import { getUserSession } from "@/lib/core/session";
import ManageEbooksTable from "./ManageEbooksTable";

const page = async () => {
    const user = await getUserSession();
    const books = await getBooks(user?.email);

    const publishedCount =
        books?.filter((book) => book.status === "published").length || 0;

    const genreCount = [...new Set(books?.map((book) => book.genre))].length;

    return (
        <div className="min-h-screen bg-zinc-50 p-6">

            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

                    <div>
                        <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">
                            <BookOpen className="w-4 h-4" />
                            Writer Dashboard
                        </div>

                        <h1 className="text-4xl font-black text-zinc-900 mt-3">
                            Manage Ebooks
                        </h1>

                        <p className="text-zinc-500 mt-2">
                            View, edit and manage all your published ebooks.
                        </p>
                    </div>

                    <Link href="/dashboard/writer/books/new">
                        <Button color="primary" className="rounded-xl">
                            <SquarePlus className="w-4 h-4" />
                            Add Ebook
                        </Button>
                    </Link>

                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

                    <div className="bg-white border border-zinc-200 rounded-3xl p-6">
                        <h3 className="text-zinc-500 text-sm">Total Ebooks</h3>
                        <p className="text-3xl font-black text-zinc-900 mt-2">
                            {books?.length || 0}
                        </p>
                    </div>

                    <div className="bg-white border border-zinc-200 rounded-3xl p-6">
                        <h3 className="text-zinc-500 text-sm">Published</h3>
                        <p className="text-3xl font-black text-emerald-600 mt-2">
                            {publishedCount}
                        </p>
                    </div>

                    <div className="bg-white border border-zinc-200 rounded-3xl p-6">
                        <h3 className="text-zinc-500 text-sm">Genres</h3>
                        <p className="text-3xl font-black text-violet-600 mt-2">
                            {genreCount}
                        </p>
                    </div>

                </div>

                <ManageEbooksTable books={books || []} />

            </div>

        </div>
    );
};

export default page;