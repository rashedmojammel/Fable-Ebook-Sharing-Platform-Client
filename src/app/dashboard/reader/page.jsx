import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Bookmark,
  Receipt,
  ArrowRight,
  CircleDollar,
  Clock,
} from "@gravity-ui/icons";
import { Card, Button } from "@heroui/react";

const page = async () => {
  // Replace with API data later
  const stats = [
    {
      title: "Purchased Ebooks",
      value: "12",
      icon: BookOpen,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Bookmarks",
      value: "8",
      icon: Bookmark,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      title: "Total Spent",
      value: "$230",
      icon: CircleDollar,
      color: "text-green-600",
      bg: "bg-green-50",
    },
  ];

  const shortcuts = [
    {
      title: "My Library",
      description: "Access all purchased ebooks",
      icon: BookOpen,
      href: "/dashboard/reader/purchased-ebooks",
      color: "text-blue-600",
    },
    {
      title: "Bookmarks",
      description: "Your saved ebooks collection",
      icon: Bookmark,
      href: "/dashboard/reader/bookmarks",
      color: "text-orange-600",
    },
    {
      title: "Purchase History",
      description: "View your transactions",
      icon: Receipt,
      href: "/dashboard/reader/purchase-history",
      color: "text-green-600",
    },
  ];

  const recentActivity = [
    {
      title: "The Art of JavaScript",
      date: "Purchased 2 days ago",
    },
    {
      title: "Modern React Patterns",
      date: "Bookmarked 5 days ago",
    },
  ];

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="mt-2 text-blue-100 max-w-xl">
          Continue exploring your digital library. 
          Manage your ebooks, bookmarks and purchases all in one place.
        </p>

        <Link href="/books">
          <Button
            className="mt-6 bg-white text-blue-700 font-semibold"
            radius="full"
          >
            Explore New Ebooks
          </Button>
        </Link>
      </div>


      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {stats.map((item) => (
          <Card
            key={item.title}
            className="p-6 rounded-2xl shadow-sm border border-gray-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">
                  {item.title}
                </p>

                <h2 className="text-4xl font-bold mt-2 text-gray-900">
                  {item.value}
                </h2>
              </div>

              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.bg}`}
              >
                <item.icon
                  width={28}
                  height={28}
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

          <div className="grid md:grid-cols-3 gap-4">
            {shortcuts.map((item) => (
              <Card
                key={item.title}
                className="p-5 border border-gray-200 rounded-2xl hover:shadow-md transition"
              >
                <item.icon
                  width={30}
                  height={30}
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
                    className="mt-4 px-0 text-blue-600"
                  >
                    Open
                    <ArrowRight width={16} />
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>


        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>

          <Card className="p-5 border border-gray-200 rounded-2xl">
            <div className="space-y-5">
              {recentActivity.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3"
                >
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <Clock width={18} height={18} />
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900">
                      {item.title}
                    </h4>

                    <p className="text-sm text-gray-500">
                      {item.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default page;