"use client";



import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";


const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dropdownRef = useRef(null);

  const { data: session, isPending } = useSession();

  const user = session?.user || null;
  const isLoggedIn = !!user;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/browse-ebooks", label: "Browse Ebooks" },
    { href: "/dashboard/writer", label: "Dashboard" },
  ];

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  };

  useEffect(() => {
    const handler = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/20 bg-white/70 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 flex items-center justify-center shadow-lg">
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
          <ul className="hidden md:flex items-center gap-2 bg-gray-50/80 border border-gray-100 rounded-full px-3 py-2 shadow-inner">
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
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center bg-white"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>

            {isPending ? (
              <div className="hidden md:block w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
            ) : !isLoggedIn ? (
              <>
                <Link
                  href="/auth/signin"
                  className="hidden md:flex px-5 py-2.5 rounded-full border border-gray-200 bg-white text-gray-700 text-sm font-semibold hover:border-violet-300 hover:text-violet-600 hover:shadow-md transition-all duration-300"
                >
                  Login
                </Link>

                <Link
                  href="/auth/signup"
                  className="hidden md:flex px-6 py-2.5 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 text-white text-sm font-semibold shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <div
                className="relative hidden md:block"
                ref={dropdownRef}
              >
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-3 bg-white border border-gray-200 hover:border-violet-300 px-2 py-1.5 rounded-full shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <img
                    src={
                      user.image ||
                      "https://img.heroui.chat/image/avatar?w=400&h=400&u=1"
                    }
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-semibold text-gray-800">
                      {user.name}
                    </p>

                    {user.role && (
                      <p className="text-xs text-gray-400">
                        {user.role}
                      </p>
                    )}
                  </div>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-4 w-72 bg-white border border-gray-100 rounded-3xl shadow-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 px-5 py-5 text-white">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            user.image ||
                            "https://img.heroui.chat/image/avatar?w=400&h=400&u=1"
                          }
                          alt={user.name}
                          className="w-14 h-14 rounded-full border-2 border-white"
                        />

                        <div>
                          <h3 className="font-bold">
                            {user.name}
                          </h3>

                          <p className="text-xs text-white/80">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-gray-50"
                      >
                        📊 Dashboard
                      </Link>

                      <Link
                        href="/my-library"
                        className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-gray-50"
                      >
                        📚 My Library
                      </Link>

                      <Link
                        href="/bookmarks"
                        className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-gray-50"
                      >
                        🔖 Bookmarks
                      </Link>

                      <div className="mt-2 pt-2 border-t border-gray-100">
                        <button
                          onClick={handleSignOut}
                          className="w-full text-left px-4 py-3 rounded-2xl hover:bg-red-50 text-red-500 font-semibold"
                        >
                          🚪 Logout
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-5 border-t border-gray-100">
            <div className="flex flex-col gap-2 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-2xl font-medium hover:bg-gray-50"
                >
                  {link.label}
                </Link>
              ))}

              {!isLoggedIn ? (
                <>
                  <Link
                    href="/auth/signin"
                    className="px-4 py-3 rounded-2xl border text-center"
                  >
                    Login
                  </Link>

                  <Link
                    href="/auth/signup"
                    className="px-4 py-3 rounded-2xl text-center bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 text-white"
                  >
                    Get Started
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleSignOut}
                  className="px-4 py-3 rounded-2xl bg-red-50 text-red-500 font-semibold"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;