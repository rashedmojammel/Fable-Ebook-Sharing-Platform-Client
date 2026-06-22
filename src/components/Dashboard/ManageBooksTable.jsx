"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "@gravity-ui/icons";
import { deletebook, updateBookStatus } from "@/lib/actions/books";

const ITEMS_PER_PAGE = 10;

export default function ManageBooksTable({ books: initialBooks = [] }) {
  const [books, setBooks] = useState(initialBooks);
  const [loadingId, setLoadingId] = useState(null);
  const [confirmModal, setConfirmModal] = useState(null); // { type: 'delete'|'status', book }
  const [toast, setToast] = useState(null); // { message, type: 'success'|'error' }
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(books.length / ITEMS_PER_PAGE));
  const paginatedBooks = books.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Publish / Unpublish ──────────────────────────────────────────────────
  const handleStatusToggle = (book) => {
    setConfirmModal({ type: "status", book });
  };

  const confirmStatusToggle = async () => {
    const { book } = confirmModal;
    const newStatus = book.status === "published" ? "draft" : "published";
    setConfirmModal(null);
    setLoadingId(book._id);

    // Optimistic update
    setBooks((prev) =>
      prev.map((b) => (b._id === book._id ? { ...b, status: newStatus } : b))
    );

    try {
      await updateBookStatus(book._id, newStatus);
      showToast(
        `"${book.title}" ${newStatus === "published" ? "published" : "unpublished"} successfully.`
      );
    } catch {
      // Rollback on error
      setBooks((prev) =>
        prev.map((b) =>
          b._id === book._id ? { ...b, status: book.status } : b
        )
      );
      showToast("Failed to update status. Please try again.", "error");
    } finally {
      setLoadingId(null);
    }
  };

  // ── Delete ───────────────────────────────────────────────────────────────
  const handleDelete = (book) => {
    setConfirmModal({ type: "delete", book });
  };

  const confirmDelete = async () => {
    const { book } = confirmModal;
    setConfirmModal(null);
    setLoadingId(book._id);

    // Optimistic removal
    setBooks((prev) => prev.filter((b) => b._id !== book._id));

    // Adjust page if last item on page was removed
    const newTotal = books.length - 1;
    const newTotalPages = Math.max(1, Math.ceil(newTotal / ITEMS_PER_PAGE));
    if (currentPage > newTotalPages) setCurrentPage(newTotalPages);

    try {
      await deletebook(book._id);
      showToast(`"${book.title}" deleted successfully.`);
    } catch {
      // Rollback on error
      setBooks((prev) => {
        const idx = initialBooks.findIndex((b) => b._id === book._id);
        const next = [...prev];
        next.splice(idx, 0, book);
        return next;
      });
      showToast("Failed to delete book. Please try again.", "error");
    } finally {
      setLoadingId(null);
    }
  };

  // ── Helpers ──────────────────────────────────────────────────────────────
  const isLoading = (id) => loadingId === id;

  return (
    <div className="relative w-full mt-6">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-sm font-medium transition-all ${
            toast.type === "error"
              ? "bg-red-600 text-white"
              : "bg-green-600 text-white"
          }`}
        >
          <span>
            {toast.type === "error" ? "✕" : "✓"}
          </span>
          {toast.message}
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            {/* Header */}
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600">
                <th className="px-6 py-4 text-left font-medium">Title</th>
                <th className="px-6 py-4 text-left font-medium">Writer</th>
                <th className="px-6 py-4 text-left font-medium">Price</th>
                <th className="px-6 py-4 text-left font-medium">Sales</th>
                <th className="px-6 py-4 text-left font-medium">Status</th>
                <th className="px-6 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-gray-200">
              {paginatedBooks.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-16 text-center text-gray-400"
                  >
                    No books found.
                  </td>
                </tr>
              ) : (
                paginatedBooks.map((book) => {
                  const busy = isLoading(book._id);

                  return (
                    <tr
                      key={book._id}
                      className={`hover:bg-gray-50 transition-colors ${
                        busy ? "opacity-50 pointer-events-none" : ""
                      }`}
                    >
                      {/* Title */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {book.coverImage && (
                            <img
                              src={book.coverImage}
                              alt={book.title}
                              className="w-9 h-12 object-cover rounded shadow-sm flex-shrink-0"
                            />
                          )}
                          <div>
                            <p className="font-medium text-gray-900 line-clamp-1">
                              {book.title}
                            </p>
                            <p className="text-xs text-gray-400 capitalize">
                              {book.genre}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Writer */}
                      <td className="px-6 py-4 text-gray-600">
                        {book.authorName}
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4 text-gray-900 font-medium">
                        ${Number(book.price).toFixed(2)}
                      </td>

                      {/* Sales */}
                      <td className="px-6 py-4 text-gray-600">
                        {book.sales ?? 0}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium capitalize ${
                            book.status === "published"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              book.status === "published"
                                ? "bg-green-500"
                                : "bg-yellow-500"
                            }`}
                          />
                          {book.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {book.status === "published" ? (
                            <button
                              onClick={() => handleStatusToggle(book)}
                              disabled={busy}
                              className="px-3 py-1.5 text-xs rounded-md bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition font-medium"
                            >
                              Unpublish
                            </button>
                          ) : (
                            <button
                              onClick={() => handleStatusToggle(book)}
                              disabled={busy}
                              className="px-3 py-1.5 text-xs rounded-md bg-green-100 text-green-700 hover:bg-green-200 transition font-medium"
                            >
                              Publish
                            </button>
                          )}

                          <button
                            onClick={() => handleDelete(book)}
                            disabled={busy}
                            className="px-3 py-1.5 text-xs rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 text-sm text-gray-500">
          <p>
            Total Books:{" "}
            <span className="font-medium text-gray-700">{books.length}</span>
          </p>

          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft width={16} height={16} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded text-sm font-medium transition ${
                      page === currentPage
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-100 text-gray-600"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight width={16} height={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-xl">
            {confirmModal.type === "delete" ? (
              <>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-lg">
                    🗑
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Delete Book
                  </h3>
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  Are you sure you want to delete{" "}
                  <span className="font-medium text-gray-900">
                    "{confirmModal.book.title}"
                  </span>
                  ? This action cannot be undone.
                </p>
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => setConfirmModal(null)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-lg">
                    {confirmModal.book.status === "published" ? "📤" : "📢"}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {confirmModal.book.status === "published"
                      ? "Unpublish Book"
                      : "Publish Book"}
                  </h3>
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  {confirmModal.book.status === "published"
                    ? "Unpublishing will hide this book from readers. You can re-publish it any time."
                    : "This book will become visible to all readers on the platform."}
                </p>
                <p className="mt-2 text-sm font-medium text-gray-800">
                  "{confirmModal.book.title}"
                </p>
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => setConfirmModal(null)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmStatusToggle}
                    className={`px-4 py-2 rounded-lg text-sm font-medium text-white ${
                      confirmModal.book.status === "published"
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {confirmModal.book.status === "published"
                      ? "Unpublish"
                      : "Publish"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}