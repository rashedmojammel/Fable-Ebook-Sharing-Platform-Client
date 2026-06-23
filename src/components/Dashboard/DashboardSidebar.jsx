// import Link from "next/link";
// import { Button, Drawer } from "@heroui/react";
// import {
//   BookOpen,
//   SquarePlus,
//   Bookmark,
//   ClockArrowRotateLeft,
//   ShoppingCart,
//   ChartColumn,
//   LayoutSideContentLeft,
//   Person,
//   House,
// } from "@gravity-ui/icons";

// import { getUserSession } from "@/lib/core/session";

// export async function DashboardSidebar() {
//   const user = await getUserSession();
//   const role = user?.userRole || "reader";

//   const navMap = {
//     reader: [
//       { 
//         icon: ShoppingCart, 
//         href: "/dashboard/reader/purchased-ebooks", 
//         label: "Purchased Ebooks" 
//       },
//       { 
//         icon: ClockArrowRotateLeft, 
//         href: "/dashboard/reader/purchase-history", 
//         label: "Purchase History" 
//       },
//       { 
//         icon: Bookmark, 
//         href: "/dashboard/reader/bookmarks", 
//         label: "Bookmarks" 
//       },
//       { 
//         icon: Person, 
//         href: "/dashboard/reader/profile", 
//         label: "Profile" 
//       },
//     ],
//     writer: [
//       { 
//         icon: House, 
//         href: "/dashboard/writer", 
//         label: "Dashboard" 
//       },
//       { 
//         icon: BookOpen, 
//         href: "/dashboard/writer/manage-ebooks", 
//         label: "Manage Ebooks" 
//       },
//       { 
//         icon: SquarePlus, 
//         href: "/dashboard/writer/books/new", 
//         label: "Add New Ebook" 
//       },
//       { 
//         icon: ChartColumn, 
//         href: "/dashboard/writer/sales-history", 
//         label: "Sales History" 
//       },
//       { 
//         icon: Bookmark, 
//         href: "/dashboard/writer/bookmarks", 
//         label: "Bookmarks" 
//       },
//     ],
//     admin : [
//       { 
//         icon: House, 
//         href: "/dashboard/admin", 
//         label: "Dashboard" 
//       },
//       { 
//         icon: BookOpen, 
//         href: "/dashboard/admin/manage-users", 
//         label: "Manage Users" 
//       },
//       { 
//         icon: SquarePlus, 
//         href: "/dashboard/admin/manage-books", 
//         label: "Manage Books" 
//       },
//       { 
//         icon: ChartColumn, 
//         href: "/dashboard/admin/transaction-history", 
//         label: "Transaction History" 
//       },
//     ],
//   };
//   const navItems = navMap[role];

//   const NavList = () => (
//     <nav className="flex flex-col gap-1">
//       {navItems?.map((item) => (
//         <Link
//           key={item.href}
//           href={item.href}
//           className="group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-accent hover:text-foreground transition-all duration-200 active:scale-[0.985]"
//         >
//           <div className="flex h-5 w-5 items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors">
//             <item.icon className="size-5" />
//           </div>
//           <span>{item.label}</span>
//         </Link>
//       ))}
//     </nav>
//   );

//   return (
//     <>
//       {/* Desktop Sidebar */}
//       <aside className="hidden lg:flex w-72 flex-col border-r bg-background h-screen sticky top-0">
//         {/* Header */}
//         {/* <div className="p-6 border-b">
//           <div className="flex items-center gap-3">
//             <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
//               <BookOpen className="size-5" />
//             </div>
//             <div>
//               <div className="font-semibold tracking-tight">EbookHub</div>
//               <div className="text-[10px] text-muted-foreground -mt-0.5">Publisher Platform</div>
//             </div>
//           </div>
//         </div> */}

//         {/* User Info */}
//         <div className="p-6 border-b bg-muted/30">
//           <div className="flex items-center gap-3">
//             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
//               <Person className="size-5 text-primary" />
//             </div>
//             <div className="min-w-0">
//               <div className="font-medium truncate">{user?.name || "User"}</div>
//               <div className="text-xs text-muted-foreground truncate">{user?.email}</div>
//               <div className="mt-1 inline-block px-2 py-0.5 text-[10px] font-medium rounded-md bg-primary/10 text-primary capitalize">
//                 {role}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Navigation */}
//         <div className="flex-1 overflow-auto p-4">
//           <div className="mb-2 px-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
//             {role === "writer" ? "Writer Studio" : "Reader Hub"}
//           </div>
//           <NavList />
//         </div>

//         {/* Footer */}
//         <div className="p-4 border-t mt-auto">
//           <Link
//             href="/dashboard/settings"
//             className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-all"
//           >
//             <Person className="size-5" />
//             Account Settings
//           </Link>
//         </div>
//       </aside>

//       {/* Mobile Menu */}
//       <div className="lg:hidden fixed top-4 left-4 z-50">
//         <Drawer>
//           <Button 
//             variant="secondary" 
//             size="md"
//             className="shadow-md"
//           >
//             <LayoutSideContentLeft className="size-5" />
//             <span className="ml-2">Menu</span>
//           </Button>

//           <Drawer.Backdrop>
//             <Drawer.Content placement="left" className="w-72">
//               <Drawer.Dialog className="h-full">
//                 <Drawer.Body className="p-0 h-full flex flex-col">
//                   {/* Mobile Header */}
//                   <div className="p-6 border-b">
//                     <div className="flex items-center gap-3">
//                       <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
//                         <BookOpen className="size-5" />
//                       </div>
//                       <div>
//                         <div className="font-semibold tracking-tight">EbookHub</div>
//                         <div className="text-[10px] text-muted-foreground -mt-0.5">Publisher Platform</div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="p-6 border-b bg-muted/30">
//                     <div className="flex items-center gap-3">
//                       <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
//                         <Person className="size-5 text-primary" />
//                       </div>
//                       <div className="min-w-0">
//                         <div className="font-medium truncate">{user?.name || "User"}</div>
//                         <div className="text-xs text-muted-foreground truncate">{user?.email}</div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex-1 overflow-auto p-4">
//                     <div className="mb-2 px-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
//                       {role === "writer" ? "Writer Studio" : "Reader Hub"}
//                     </div>
//                     <NavList />
//                   </div>
//                 </Drawer.Body>
//               </Drawer.Dialog>
//             </Drawer.Content>
//           </Drawer.Backdrop>
//         </Drawer>
//       </div>
//     </>
//   );
// }
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BookOpen, SquarePlus, Bookmark,
  ClockArrowRotateLeft, ShoppingCart, ChartColumn,
  LayoutSideContentLeft, Person, House, Xmark,
} from "@gravity-ui/icons";

// import { getUserSession } from "@/lib/core/session";

export async function DashboardSidebar({ user }) {
  // const user = await getUserSession();
  const role = user?.userRole || "reader";

  const navMap = {
    reader: [
      { icon: ShoppingCart,          href: "/dashboard/reader/purchased-ebooks",  label: "Purchased Ebooks"  },
      { icon: ClockArrowRotateLeft,  href: "/dashboard/reader/purchase-history",  label: "Purchase History"  },
      { icon: Bookmark,              href: "/dashboard/reader/bookmarks",          label: "Bookmarks"         },
      { icon: Person,                href: "/dashboard/reader/profile",            label: "Profile"           },
    ],
    writer: [
      { icon: House,       href: "/dashboard/writer",              label: "Dashboard"     },
      { icon: BookOpen,    href: "/dashboard/writer/manage-ebooks", label: "Manage Ebooks" },
      { icon: SquarePlus,  href: "/dashboard/writer/books/new",    label: "Add New Ebook" },
      { icon: ChartColumn, href: "/dashboard/writer/sales-history", label: "Sales History" },
      { icon: Bookmark,    href: "/dashboard/writer/bookmarks",    label: "Bookmarks"     },
    ],
    admin: [
      { icon: House,       href: "/dashboard/admin",                    label: "Dashboard"           },
      { icon: BookOpen,    href: "/dashboard/admin/manage-users",       label: "Manage Users"        },
      { icon: SquarePlus,  href: "/dashboard/admin/manage-books",       label: "Manage Books"        },
      { icon: ChartColumn, href: "/dashboard/admin/transaction-history", label: "Transaction History" },
    ],
  };

  const navItems = navMap[role] ?? [];

  const NavList = () => (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-accent hover:text-foreground transition-all duration-200 active:scale-[0.985]"
        >
          <div className="flex h-5 w-5 items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors">
            <item.icon className="size-5" />
          </div>
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col border-r bg-background h-screen sticky top-0">
        {/* User Info */}
        <div className="p-6 border-b bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
              <Person className="size-5 text-primary" />
            </div>
            <div className="min-w-0">
              <div className="font-medium truncate">{user?.name || "User"}</div>
              <div className="text-xs text-muted-foreground truncate">{user?.email}</div>
              <div className="mt-1 inline-block px-2 py-0.5 text-[10px] font-medium rounded-md bg-primary/10 text-primary capitalize">
                {role}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-auto p-4">
          <div className="mb-2 px-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {role === "writer" ? "Writer Studio" : role === "admin" ? "Admin Panel" : "Reader Hub"}
          </div>
          <NavList />
        </div>

        {/* Footer */}
        <div className="p-4 border-t mt-auto">
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-all"
          >
            <Person className="size-5" />
            Account Settings
          </Link>
        </div>
      </aside>

      {/* Mobile — uses a plain checkbox toggle, no UI lib needed */}
      <MobileSidebar role={role} user={user}>
        <NavList />
      </MobileSidebar>
    </>
  );
}

// separate client component just for mobile drawer toggle
function MobileSidebar({ role, user, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-40 flex items-center gap-2 bg-white border border-zinc-200 shadow-md rounded-xl px-3 py-2 text-sm font-medium text-zinc-700"
      >
        <LayoutSideContentLeft className="size-5" />
        Menu
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-background border-r shadow-xl flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Header */}
        <div className="p-5 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <BookOpen className="size-5" />
            </div>
            <div>
              <div className="font-semibold tracking-tight">EbookHub</div>
              <div className="text-[10px] text-muted-foreground">Publisher Platform</div>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-accent">
            <Xmark className="size-5 text-muted-foreground" />
          </button>
        </div>

        {/* User */}
        <div className="p-5 border-b bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
              <Person className="size-5 text-primary" />
            </div>
            <div className="min-w-0">
              <div className="font-medium truncate">{user?.name || "User"}</div>
              <div className="text-xs text-muted-foreground truncate">{user?.email}</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-auto p-4" onClick={() => setOpen(false)}>
          <div className="mb-2 px-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {role === "writer" ? "Writer Studio" : role === "admin" ? "Admin Panel" : "Reader Hub"}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}