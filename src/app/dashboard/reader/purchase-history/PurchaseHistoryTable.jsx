"use client";

import React from "react";
import { Chip, Button } from "@heroui/react";
import {
  BookOpen,
  Person,
  CircleDollar,
  Calendar
} from "@gravity-ui/icons";

const PurchaseHistoryTable = ({ purchases }) => {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-zinc-200">
        <h2 className="text-xl font-semibold text-zinc-900">
          Purchase History
        </h2>

        <p className="text-sm text-zinc-500 mt-1">
          Total Purchases: {purchases.length}
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50">
              <th className="text-left p-4 text-sm font-semibold text-zinc-600">
                Ebook
              </th>

              <th className="text-left p-4 text-sm font-semibold text-zinc-600">
                Writer
              </th>

              <th className="text-left p-4 text-sm font-semibold text-zinc-600">
                Price
              </th>

              <th className="text-left p-4 text-sm font-semibold text-zinc-600">
                Purchase Date
              </th>

              <th className="text-left p-4 text-sm font-semibold text-zinc-600">
                Status
              </th>

              <th className="text-right p-4 text-sm font-semibold text-zinc-600">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {purchases?.length > 0 ? (
              purchases.map((purchase) => (
                <tr
                  key={purchase._id}
                  className="border-b border-zinc-100 hover:bg-zinc-50 transition"
                >
                  {/* Ebook */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-50 p-2 rounded-xl">
                        <BookOpen
                          width={18}
                          height={18}
                          className="text-blue-600"
                        />
                      </div>

                      <div>
                        <p className="font-medium text-zinc-900">
                          {purchase.bookTitle}
                        </p>

                        <p className="text-xs text-zinc-500">
                          ID: {purchase.bookId}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Writer */}
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Person
                        width={16}
                        height={16}
                        className="text-zinc-400"
                      />

                      <span className="text-zinc-700">
                        {purchase.writerName}
                      </span>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <CircleDollar
                        width={16}
                        height={16}
                        className="text-green-600"
                      />

                      <span className="font-medium text-green-600">
                        ${purchase.price}
                      </span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-zinc-600">
                      <Calendar width={16} height={16} />

                      {new Date(
                        purchase.purchasedAt
                      ).toLocaleDateString()}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <Chip
                      color="success"
                      variant="flat"
                    >
                      Completed
                    </Chip>
                  </td>

                  {/* Action */}
                  <td className="p-4 text-right">
                    <Button
                      size="sm"
                      variant="light"
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="p-10 text-center text-zinc-500"
                >
                  No purchase history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseHistoryTable;