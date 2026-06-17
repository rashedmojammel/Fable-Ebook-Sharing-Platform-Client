"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dropdownRef = useRef(null);

  // dummy user (replace later with auth)
  const user = {
    name: "Rashed",
    email: "rashed@example.com",
    image: "https://img.heroui.chat/image/avatar?w=400&h=400",
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/browse-ebooks", label: "Browse Ebooks" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  const handleSignOut = () => {
    console.log("sign out clicked");
  };

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/20 bg-white/70 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 flex items-center justify-center">
                <span className="text-2xl">📚</span>
              </div>

              <div>
                <h1 className="text-3xl font-black bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
                  Fable
                </h1>
                <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400">
                  Read • Share • Discover
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-2 bg-gray-50/80 border border-gray-100 rounded-full px-3 py-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="px-5 py-2 rounded-full text-sm font-semibold text-gray-600 hover:bg-white hover:text-gray-900 transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            {/* Mobile Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 border rounded-xl flex items-center justify-center"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>

            {/* User (UI only) */}
            <div className="relative hidden md:block" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 px-2 py-1.5 border rounded-full bg-white"
              >
                <img
                  src={user.image}
                  alt="user"
                  className="w-10 h-10 rounded-full"
                />

                <div className="text-left hidden lg:block">
                  <p className="text-sm font-semibold">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-400">Reader</p>
                </div>
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white border rounded-2xl shadow-xl overflow-hidden">
                  
                  <div className="p-4 border-b bg-gradient-to-r from-violet-500 to-pink-500 text-white">
                    <p className="font-bold">{user.name}</p>
                    <p className="text-xs">{user.email}</p>
                  </div>

                  <div className="p-3 flex flex-col gap-2">
                    <Link className="p-2 hover:bg-gray-100 rounded-xl" href="/dashboard">
                      Dashboard
                    </Link>

                    <Link className="p-2 hover:bg-gray-100 rounded-xl" href="/my-library">
                      My Library
                    </Link>

                    <Link className="p-2 hover:bg-gray-100 rounded-xl" href="/bookmarks">
                      Bookmarks
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-xl text-left"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t mt-3 pt-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="p-3 rounded-xl hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <button
              onClick={handleSignOut}
              className="p-3 rounded-xl bg-red-50 text-red-500"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;