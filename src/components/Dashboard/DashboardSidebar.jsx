

import {Bars, Bell, Envelope, Gear, House, LayoutSideContentLeft, Magnifier, Person} from "@gravity-ui/icons";
import {Button, Drawer} from "@heroui/react";
import {
  BookOpen,
  SquarePlus,
  Bookmark,
  ClockArrowRotateLeft,
  ShoppingCart,

  ChartColumn,
} from "@gravity-ui/icons";


import Link from "next/link";
import { getUserSession } from "@/lib/core/session";

export function DashboardSidebar() {

  const user = getUserSession();

  const readerNavItems = [
  {
    icon: ShoppingCart,
    href: "/dashboard/reader/purchased-ebooks",
    label: "Purchased Ebooks",
  },
  {
    icon: ClockArrowRotateLeft,
    href: "/dashboard/reader/purchase-history",
    label: "Purchase History",
  },
  {
    icon: Bookmark,
    href: "/dashboard/reader/bookmarks",
    label: "Bookmarks",
  },
  {
    icon: Person,
    href: "/dashboard/reader/profile",
    label: "Profile",
  },
];


 const writerNavItems = [
  { icon: BookOpen, href: "/dashboard/writer/manage-ebooks", label: "Manage Ebooks" },
  { icon: SquarePlus, href: "/dashboard/writer/books/new", label: "Add Ebook" },
  { icon: Bookmark, href: "/dashboard/writer/bookmarks", label: "Bookmarks" },
  { icon: ChartColumn, href: "/dashboard/writer/sales-history", label: "Sales History" },
];

const navLinksMap =
{
  reader: readerNavItems,
  writer: writerNavItems,
}
const navItems = navLinksMap[user?.role || 'reader'] ;

  const navContent = 
// import Link from "next/link";

<nav className="flex flex-col gap-1">
  {navItems.map((item) => (
    <Link
      key={item.label}
      href={item.href}
      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
    >
      <item.icon className="size-5 text-muted" />
      {item.label}
    </Link>
  ))}
</nav>

  return (
   <>
            <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
                {navContent}
            </aside>
            <Drawer>
                <Button className="lg:hidden" variant="secondary">
                    <LayoutSideContentLeft />
                    Sidebar
                </Button>
                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />
                            <Drawer.Header>
                                <Drawer.Heading>Navigation</Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body>
                                {navContent}
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </>
  );
}