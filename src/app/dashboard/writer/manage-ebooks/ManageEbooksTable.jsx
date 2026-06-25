"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button, Chip } from "@heroui/react";
import {
    SquarePlus,
    Pencil,
    TrashBin,
    BookOpen,
    Eye,
    EyeSlash,
} from "@gravity-ui/icons";

import { deletebook, updateBookStatus } from "@/lib/actions/books";
import { toast } from "react-toastify";

const ManageEbooksTable = ({ books }) => {
    const [list, setList] = useState(books);
    const [busyId, setBusyId] = useState(null);

    const handleDelete = async (book) => {
        const confirmed = confirm(`Delete "${book.title}"? This can't be undone.`);
        if (!confirmed) return;

        setBusyId(book._id);

        try {
            const res = await deletebook(book._id);
            if (res.deletedCount > 0) {
                setList((prev) => prev.filter((b) => b._id !== book._id));
            } else {
                toast.error("Failed to delete ebook");
            }
        } catch (error) {
            // console.log(error);
            toast.error("Failed to delete ebook");
        } finally {
            setBusyId(null);
        }
    };

    const handleToggleStatus = async (book) => {
        const nextStatus = book.status === "published" ? "unpublished" : "published";

        setBusyId(book._id);

        try {
            const res = await updateBookStatus(book._id, nextStatus);
            if (res.acknowledged) {
                setList((prev) =>
                    prev.map((b) =>
                        b._id === book._id ? { ...b, status: nextStatus } : b
                    )
                );
            } else {
                toast.error("Failed to update status");
            }
        } catch (error) {
            // console.log(error);
            toast.error("Failed to update status");
        } finally {
            setBusyId(null);
        }
    };

    return (
        <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden">

            <div className="p-6 border-b border-zinc-200">
                <h2 className="font-bold text-xl text-zinc-900">Your Ebooks</h2>
            </div>

            {list?.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-zinc-50 border-b border-zinc-200">
                                <th className="text-left p-5 text-sm font-semibold text-zinc-600">Title</th>
                                <th className="text-left p-5 text-sm font-semibold text-zinc-600">Price</th>
                                <th className="text-left p-5 text-sm font-semibold text-zinc-600">Status</th>
                                <th className="text-center p-5 text-sm font-semibold text-zinc-600">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {list.map((book) => (
                                <tr
                                    key={book._id}
                                    className="border-b border-zinc-100 hover:bg-zinc-50 transition"
                                >
                                    {/* Title */}
                                    <td className="p-5">
                                        <div className="flex items-center gap-3">
                                            <Image
                                                src={book.coverImage}
                                                alt={book.title}
                                                width={48}
                                                height={64}
                                                className="rounded-lg object-cover border border-zinc-200"
                                            />
                                            <div>
                                                <h3 className="font-bold text-zinc-900">{book.title}</h3>
                                                <p className="text-xs text-zinc-500 mt-1">{book.genre}</p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Price */}
                                    <td className="p-5 font-semibold text-emerald-600">
                                        ${book.price}
                                    </td>

                                    {/* Status */}
                                    <td className="p-5">
                                        <Chip
                                            variant="flat"
                                            color={book.status === "published" ? "success" : "default"}
                                            className="capitalize"
                                        >
                                            {book.status || "published"}
                                        </Chip>
                                    </td>

                                    {/* Actions */}
                                    <td className="p-5">
                                        <div className="flex items-center justify-center gap-2">

                                            <Link href={`/dashboard/writer/books/edit/${book._id}`}>
                                                <Button isIconOnly size="sm" variant="light" title="Edit">
                                                    <Pencil className="w-4 h-4" />
                                                </Button>
                                            </Link>

                                            <Button
                                                isIconOnly
                                                size="sm"
                                                variant="light"
                                                isLoading={busyId === book._id}
                                                onClick={() => handleToggleStatus(book)}
                                                title={book.status === "published" ? "Unpublish" : "Publish"}
                                            >
                                                {book.status === "published" ? (
                                                    <EyeSlash className="w-4 h-4" />
                                                ) : (
                                                    <Eye className="w-4 h-4" />
                                                )}
                                            </Button>

                                            <Button
                                                isIconOnly
                                                size="sm"
                                                color="danger"
                                                variant="light"
                                                isLoading={busyId === book._id}
                                                onClick={() => handleDelete(book)}
                                                title="Delete"
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
                    <BookOpen className="text-zinc-300" width={60} height={60} />
                    <h3 className="text-xl font-bold text-zinc-800 mt-5">No ebooks found</h3>
                    <p className="text-zinc-500 mt-2">Publish your first ebook to get started.</p>

                    <Link href="/dashboard/writer/books/new" className="mt-5">
                        <Button color="primary">
                            <SquarePlus className="w-4 h-4" />
                            Add Ebook
                        </Button>
                    </Link>
                </div>
            )}

        </div>
    );
};

export default ManageEbooksTable;