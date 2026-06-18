import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Button, Chip } from "@heroui/react";

import {
    SquarePlus,
    Pencil,
    TrashBin,
    BookOpen
} from "@gravity-ui/icons";

import { getBooks } from "@/lib/api/job";

const page = async () => {
    const genre = "Educational";

    const books = await getBooks(genre);

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

                        <Button
                            color="primary"
                            className="rounded-xl"
                        >
                            <SquarePlus className="w-4 h-4" />
                            Add Ebook
                        </Button>

                    </Link>

                </div>

                {/* Stats */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

                    <div className="bg-white border border-zinc-200 rounded-3xl p-6">

                        <h3 className="text-zinc-500 text-sm">
                            Total Ebooks
                        </h3>

                        <p className="text-3xl font-black text-zinc-900 mt-2">
                            {books?.length || 0}
                        </p>

                    </div>

                    <div className="bg-white border border-zinc-200 rounded-3xl p-6">

                        <h3 className="text-zinc-500 text-sm">
                            Published
                        </h3>

                        <p className="text-3xl font-black text-emerald-600 mt-2">
                            {books?.length || 0}
                        </p>

                    </div>

                    <div className="bg-white border border-zinc-200 rounded-3xl p-6">

                        <h3 className="text-zinc-500 text-sm">
                            Genres
                        </h3>

                        <p className="text-3xl font-black text-violet-600 mt-2">
                            {
                                [...new Set(books?.map(book => book.genre))]
                                    .length
                            }
                        </p>

                    </div>

                </div>

                {/* Table */}

                <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden">

                    <div className="p-6 border-b border-zinc-200">

                        <h2 className="font-bold text-xl text-zinc-900">
                            Your Ebooks
                        </h2>

                    </div>

                    {books?.length > 0 ? (

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead>

                                    <tr className="bg-zinc-50 border-b border-zinc-200">

                                        <th className="text-left p-5 text-sm font-semibold text-zinc-600">
                                            Cover
                                        </th>

                                        <th className="text-left p-5 text-sm font-semibold text-zinc-600">
                                            Title
                                        </th>

                                        <th className="text-left p-5 text-sm font-semibold text-zinc-600">
                                            Genre
                                        </th>

                                        <th className="text-left p-5 text-sm font-semibold text-zinc-600">
                                            Price
                                        </th>

                                        <th className="text-left p-5 text-sm font-semibold text-zinc-600">
                                            Created
                                        </th>

                                        <th className="text-center p-5 text-sm font-semibold text-zinc-600">
                                            Actions
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {books.map((book) => (

                                        <tr
                                            key={book._id}
                                            className="border-b border-zinc-100 hover:bg-zinc-50 transition"
                                        >

                                            {/* Cover */}

                                            <td className="p-5">

                                                <Image
                                                    src={book.coverImage}
                                                    alt={book.title}
                                                    width={60}
                                                    height={80}
                                                    className="rounded-xl object-cover border border-zinc-200"
                                                />

                                            </td>

                                            {/* Title */}

                                            <td className="p-5">

                                                <h3 className="font-bold text-zinc-900">
                                                    {book.title}
                                                </h3>

                                                <p className="text-sm text-zinc-500 mt-1 line-clamp-2 max-w-sm">
                                                    {book.description}
                                                </p>

                                            </td>

                                            {/* Genre */}

                                            <td className="p-5">

                                                <Chip
                                                    variant="flat"
                                                    color="secondary"
                                                >
                                                    {book.genre}
                                                </Chip>

                                            </td>

                                            {/* Price */}

                                            <td className="p-5 font-semibold text-emerald-600">
                                                ${book.price}
                                            </td>

                                            {/* Date */}

                                            <td className="p-5 text-zinc-500 text-sm">

                                                {new Date(
                                                    book.createdAt
                                                ).toLocaleDateString()}

                                            </td>

                                            {/* Actions */}

                                            <td className="p-5">

                                                <div className="flex items-center justify-center gap-2">

                                                    <Button
                                                        isIconOnly
                                                        size="sm"
                                                        variant="light"
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>

                                                    <Button
                                                        isIconOnly
                                                        size="sm"
                                                        color="danger"
                                                        variant="light"
                                                    >
                                                        <TrashBin className="w-4 h-4" />
                                                    </Button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    ) : (

                        <div className="py-20 flex flex-col items-center">

                            <BookOpen
                                className="text-zinc-300"
                                width={60}
                                height={60}
                            />

                            <h3 className="text-xl font-bold text-zinc-800 mt-5">
                                No ebooks found
                            </h3>

                            <p className="text-zinc-500 mt-2">
                                Publish your first ebook to get started.
                            </p>

                            <Link
                                href="/dashboard/writer/books/new"
                                className="mt-5"
                            >

                                <Button color="primary">

                                    <SquarePlus className="w-4 h-4" />

                                    Add Ebook

                                </Button>

                            </Link>

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
};

export default page;