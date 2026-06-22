"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "@gravity-ui/icons";

const ITEMS_PER_PAGE = 10;

const TYPE_STYLES = {
  "publishing fee": "bg-purple-100 text-purple-700",
  purchase:         "bg-blue-100 text-blue-700",
};

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year:  "numeric",
    month: "short",
    day:   "numeric",
  });
};

const shortId = (id = "") =>
  id.length > 14 ? `${id.slice(0, 6)}…${id.slice(-4)}` : id;

export default function TransactionsTable({ transactions: initial = [] }) {
  const [search,      setSearch]      = useState("");
  const [typeFilter,  setTypeFilter]  = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  /* ── filtering ── */
  const filtered = initial.filter((tx) => {
    const email = (tx.userEmail || tx.writerEmail || "").toLowerCase();
    const id    = (tx._id || "").toLowerCase();

    const matchSearch =
      search === "" ||
      email.includes(search.toLowerCase()) ||
      id.includes(search.toLowerCase());

    const matchType =
      typeFilter === "all" ||
      (tx.type || "").toLowerCase() === typeFilter;

    return matchSearch && matchType;
  });

  /* ── pagination ── */
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated  = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearch = (e) => { setSearch(e.target.value);      setCurrentPage(1); };
  const handleType   = (e) => { setTypeFilter(e.target.value);  setCurrentPage(1); };

  /* ── summary ── */
  const totalAmount = filtered.reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
  const purchaseCount = filtered.filter((tx) => tx.type === "purchase").length;
  const feeCount      = filtered.filter((tx) => tx.type === "publishing fee").length;

  return (
    <div className="relative w-full mt-6 space-y-4">

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Revenue",      value: `$${totalAmount.toFixed(2)}`, color: "text-gray-900" },
          { label: "Purchases",           value: purchaseCount,                color: "text-blue-700"  },
          { label: "Publishing Fees",     value: feeCount,                     color: "text-purple-700"},
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search by email or transaction ID…"
          value={search}
          onChange={handleSearch}
          className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={typeFilter}
          onChange={handleType}
          className="px-4 py-2 text-sm border border-gray-200 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Types</option>
          <option value="purchase">Purchase</option>
          <option value="publishing fee">Publishing Fee</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600">
                <th className="px-6 py-4 text-left font-medium">Transaction ID</th>
                <th className="px-6 py-4 text-left font-medium">Type</th>
                <th className="px-6 py-4 text-left font-medium">Email</th>
                <th className="px-6 py-4 text-left font-medium">Book</th>
                <th className="px-6 py-4 text-left font-medium">Amount</th>
                <th className="px-6 py-4 text-left font-medium">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-gray-400">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                paginated.map((tx) => {
                  const type  = (tx.type || "purchase").toLowerCase();
                  const email = tx.userEmail || tx.writerEmail || "—";

                  return (
                    <tr key={tx._id} className="hover:bg-gray-50 transition-colors">

                      {/* ID */}
                      <td className="px-6 py-4">
                        <span
                          title={tx._id}
                          className="font-mono text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded cursor-default"
                        >
                          {shortId(tx._id)}
                        </span>
                      </td>

                      {/* Type */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium capitalize ${TYPE_STYLES[type] || "bg-gray-100 text-gray-700"}`}>
                          {type}
                        </span>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4 text-gray-600 max-w-[200px] truncate" title={email}>
                        {email}
                      </td>

                      {/* Book title */}
                      <td className="px-6 py-4 text-gray-600 max-w-[180px] truncate" title={tx.bookTitle}>
                        {tx.bookTitle || "—"}
                      </td>

                      {/* Amount */}
                      <td className="px-6 py-4 font-medium text-gray-900">
                        ${Number(tx.amount || 0).toFixed(2)}
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                        {formatDate(tx.date)}
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 text-sm text-gray-500">
          <p>
            Showing{" "}
            <span className="font-medium text-gray-700">{filtered.length}</span>{" "}
            of <span className="font-medium text-gray-700">{initial.length}</span> transactions
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

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight width={16} height={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}