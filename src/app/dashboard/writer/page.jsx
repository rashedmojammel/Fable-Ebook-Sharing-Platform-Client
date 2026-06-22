import React from "react";
import Link from "next/link";
import {
  BookOpen,
  SquarePlus,
  Bookmark,
  ChartColumn,
  CircleDollar,
  ArrowRight,
  Clock,
  Person,
} from "@gravity-ui/icons";
import { Card, Button } from "@heroui/react";

import { getUserSession } from "@/lib/core/session";
import { getBooks } from "@/lib/api/job";
import { getWriterSales } from "@/lib/api/purchases";

const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  if (seconds < 60) return "Just now";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;

  const years = Math.floor(months / 12);
  return `${years} year${years > 1 ? "s" : ""} ago`;
};

const WriterDashboard = async () => {
  const session = await getUserSession();
  const user = session?.user || session || null;

  const books = (await getBooks(user?.email)) || [];
  const sales = (await getWriterSales(user?.email)) || [];

  const publishedCount = books.filter(
    (book) => book.status === "published"
  ).length;

  const totalRevenue = sales.reduce(
    (sum, sale) => sum + Number(sale.price || 0),
    0
  );

  const stats = [
    {
      title: "Total Ebooks",
      value: books.length,
      icon: BookOpen,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      title: "Published",
      value: publishedCount,
      icon: ChartColumn,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Total Sales",
      value: sales.length,
      icon: Person,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: CircleDollar,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  const shortcuts = [
    {
      title: "Manage Ebooks",
      description: "Edit, publish or delete your titles",
      icon: BookOpen,
      href: "/dashboard/writer/manage-ebooks",
      color: "text-violet-600",
    },
    {
      title: "Add Ebook",
      description: "Publish a brand new title",
      icon: SquarePlus,
      href: "/dashboard/writer/books/new",
      color: "text-fuchsia-600",
    },
    {
      title: "Sales History",
      description: "Track every purchase of your work",
      icon: ChartColumn,
      href: "/dashboard/writer/sales-history",
      color: "text-blue-600",
    },
    {
      title: "Bookmarks",
      description: "Ebooks you've saved to read",
      icon: Bookmark,
      href: "/dashboard/writer/bookmarks",
      color: "text-orange-600",
    },
  ];

  const recentSales = [...sales]
    .sort((a, b) => new Date(b.purchasedAt) - new Date(a.purchasedAt))
    .slice(0, 5);

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">

      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-violet-600 to-fuchsia-600 p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold">
          Welcome back{user?.name ? `, ${user.name}` : ""} 👋
        </h1>

        <p className="mt-2 text-violet-100 max-w-xl">
          Here's how your ebooks are performing. Publish new work, manage
          existing titles, and track your sales — all in one place.
        </p>

        <Link href="/dashboard/writer/books/new">
          <Button
            className="mt-6 bg-white text-violet-700 font-semibold"
            radius="full"
          >
            <SquarePlus width={16} height={16} />
            Add New Ebook
          </Button>
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((item) => (
          <Card
            key={item.title}
            className="p-6 rounded-2xl shadow-sm border border-gray-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">{item.title}</p>
                <h2 className="text-3xl font-bold mt-2 text-gray-900">
                  {item.value}
                </h2>
              </div>

              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.bg}`}
              >
                <item.icon
                  width={24}
                  height={24}
                  className={item.color}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Quick Access */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Access
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {shortcuts.map((item) => (
              <Card
                key={item.title}
                className="p-5 border border-gray-200 rounded-2xl hover:shadow-md transition"
              >
                <item.icon
                  width={28}
                  height={28}
                  className={item.color}
                />

                <h3 className="font-semibold text-lg mt-4">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {item.description}
                </p>

                <Link href={item.href}>
                  <Button
                    variant="light"
                    className="mt-4 px-0 text-violet-600"
                  >
                    Open
                    <ArrowRight width={16} />
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Sales */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Sales
          </h2>

          <Card className="p-5 border border-gray-200 rounded-2xl">
            {recentSales.length > 0 ? (
              <div className="space-y-5">
                {recentSales.map((sale) => (
                  <div
                    key={sale._id}
                    className="flex items-start gap-3"
                  >
                    <div className="bg-violet-50 p-2 rounded-lg">
                      <CircleDollar
                        width={18}
                        height={18}
                        className="text-violet-600"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">
                        {sale.bookTitle}
                      </h4>

                      <p className="text-sm text-gray-500">
                        {sale.buyerName} · ${sale.price}
                      </p>

                      <p className="text-xs text-gray-400 mt-0.5">
                        {timeAgo(sale.purchasedAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-6">
                No sales yet. Sales will appear here once readers start
                purchasing your ebooks.
              </p>
            )}
          </Card>
        </div>

      </div>
    </div>
  );
};

export default WriterDashboard;