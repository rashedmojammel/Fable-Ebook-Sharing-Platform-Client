"use client";

import React from "react";
import { Chip } from "@heroui/react";
import {
  BookOpen,
  Person,
  CircleDollar,
  Calendar,
} from "@gravity-ui/icons";

const SalesHistoryTable = ({ sales }) => {
  const totalRevenue = sales.reduce(
    (sum, sale) => sum + Number(sale.price || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">
            <CircleDollar className="w-4 h-4" />
            Writer Dashboard
          </div>

          <h1 className="text-4xl font-black text-zinc-900 mt-3">
            Sales History
          </h1>

          <p className="text-zinc-500 mt-2">
            Every purchase made on your ebooks.
          </p>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          <div className="bg-white border border-zinc-200 rounded-3xl p-6">
            <h3 className="text-zinc-500 text-sm">Total Sales</h3>
            <p className="text-3xl font-black text-zinc-900 mt-2">
              {sales.length}
            </p>
          </div>

          <div className="bg-white border border-zinc-200 rounded-3xl p-6">
            <h3 className="text-zinc-500 text-sm">Total Revenue</h3>
            <p className="text-3xl font-black text-emerald-600 mt-2">
              ${totalRevenue.toFixed(2)}
            </p>
          </div>

          <div className="bg-white border border-zinc-200 rounded-3xl p-6">
            <h3 className="text-zinc-500 text-sm">Unique Buyers</h3>
            <p className="text-3xl font-black text-violet-600 mt-2">
              {new Set(sales.map((s) => s.buyerEmail)).size}
            </p>
          </div>

        </div>

        {/* Table */}
        <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden">

          <div className="p-6 border-b border-zinc-200">
            <h2 className="font-bold text-xl text-zinc-900">Transactions</h2>
            <p className="text-sm text-zinc-500 mt-1">
              {sales.length} total sale{sales.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200">
                  <th className="text-left p-5 text-sm font-semibold text-zinc-600">
                    Ebook
                  </th>
                  <th className="text-left p-5 text-sm font-semibold text-zinc-600">
                    Buyer
                  </th>
                  <th className="text-left p-5 text-sm font-semibold text-zinc-600">
                    Purchase Date
                  </th>
                  <th className="text-left p-5 text-sm font-semibold text-zinc-600">
                    Amount
                  </th>
                  <th className="text-left p-5 text-sm font-semibold text-zinc-600">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {sales.length > 0 ? (
                  [...sales]
                    .sort(
                      (a, b) =>
                        new Date(b.purchasedAt) - new Date(a.purchasedAt)
                    )
                    .map((sale) => (
                      <tr
                        key={sale._id}
                        className="border-b border-zinc-100 hover:bg-zinc-50 transition"
                      >
                        {/* Ebook */}
                        <td className="p-5">
                          <div className="flex items-center gap-3">
                            <div className="bg-violet-50 p-2 rounded-xl">
                              <BookOpen
                                width={18}
                                height={18}
                                className="text-violet-600"
                              />
                            </div>

                            <div>
                              <p className="font-medium text-zinc-900">
                                {sale.bookTitle}
                              </p>
                              <p className="text-xs text-zinc-500 mt-0.5">
                                ID: {sale.bookId}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Buyer */}
                        <td className="p-5">
                          <div className="flex items-center gap-2">
                            <Person
                              width={16}
                              height={16}
                              className="text-zinc-400"
                            />
                            <div>
                              <p className="text-zinc-700">
                                {sale.buyerName}
                              </p>
                              <p className="text-xs text-zinc-500">
                                {sale.buyerEmail}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Date */}
                        <td className="p-5">
                          <div className="flex items-center gap-2 text-zinc-600">
                            <Calendar width={16} height={16} />
                            {new Date(
                              sale.purchasedAt
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                        </td>

                        {/* Amount */}
                        <td className="p-5">
                          <div className="flex items-center gap-2">
                            <CircleDollar
                              width={16}
                              height={16}
                              className="text-emerald-600"
                            />
                            <span className="font-semibold text-emerald-600">
                              ${sale.price}
                            </span>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="p-5">
                          <Chip color="success" variant="flat">
                            Completed
                          </Chip>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-12 text-center text-zinc-500"
                    >
                      <BookOpen
                        width={40}
                        height={40}
                        className="text-zinc-300 mx-auto mb-3"
                      />
                      No sales yet. Once readers purchase your ebooks,
                      transactions will appear here.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SalesHistoryTable;