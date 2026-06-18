"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Link,
} from "@heroui/react";
import {
  Eye,
  EyeSlash,
  BookOpen,
  Pencil,
} from "@gravity-ui/icons";
import { FcGoogle } from "react-icons/fc";

export default function SignupPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [role, setRole] = useState("reader");

  const [loading, setLoading] = useState(false);

  const toggleVisibility = () =>
    setIsVisible(!isVisible);

  const toggleConfirmVisibility = () =>
    setIsConfirmVisible(!isConfirmVisible);

  const handleSignup = async (e) => {
    e.preventDefault();

    // your signup implementation
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#F6F3ED]">

      {/* LEFT PANEL */}
      <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-[#121A4A] via-[#161B4F] to-[#0E1238] text-white">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center">
            📖
          </div>

          <h2 className="font-serif font-bold text-3xl">
            Fable
          </h2>
        </div>

        {/* Content */}
        <div className="max-w-md">
          <h1 className="text-5xl font-serif font-bold leading-tight">
            Join thousands of readers & writers
          </h1>

          <div className="mt-10 space-y-8">

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                📚
              </div>

              <div>
                <h4 className="font-semibold">
                  Discover great reads
                </h4>

                <p className="text-sm text-white/60 mt-1">
                  Browse thousands of original ebooks
                  across every genre.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                ✍️
              </div>

              <div>
                <h4 className="font-semibold">
                  Publish your work
                </h4>

                <p className="text-sm text-white/60 mt-1">
                  Share your writing with a global
                  audience in minutes.
                </p>
              </div>
            </div>

          </div>
        </div>

        <p className="text-sm text-white/40">
          © 2026 Fable. All rights reserved.
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex items-center justify-center px-6 py-10">

        <div className="w-full max-w-md">

          <div className="mb-8">
            <h1 className="text-5xl font-serif font-bold text-[#151B4B]">
              Create your account
            </h1>

            <p className="text-gray-500 mt-2">
              Start reading and writing on Fable today
            </p>
          </div>

          <form
            onSubmit={handleSignup}
            className="space-y-5"
          >

            {/* Name */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Full Name
              </label>

              <Input
                placeholder="Jane Doe"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                radius="lg"
                classNames={{
                  inputWrapper:
                    "bg-[#ECE8E0] border border-[#DDD6CA]",
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Email
              </label>

              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                radius="lg"
                classNames={{
                  inputWrapper:
                    "bg-[#ECE8E0] border border-[#DDD6CA]",
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Password
              </label>

              <Input
                type={isVisible ? "text" : "password"}
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                radius="lg"
                endContent={
                  <button
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlash size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                }
                classNames={{
                  inputWrapper:
                    "bg-[#ECE8E0] border border-[#DDD6CA]",
                }}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Confirm Password
              </label>

              <Input
                type={
                  isConfirmVisible
                    ? "text"
                    : "password"
                }
                placeholder="Repeat password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                radius="lg"
                endContent={
                  <button
                    type="button"
                    onClick={
                      toggleConfirmVisibility
                    }
                  >
                    {isConfirmVisible ? (
                      <EyeSlash size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                }
                classNames={{
                  inputWrapper:
                    "bg-[#ECE8E0] border border-[#DDD6CA]",
                }}
              />
            </div>

            {/* ROLE */}
            <div>
              <label className="text-sm font-medium block mb-3">
                I want to join as
              </label>

              <div className="grid grid-cols-2 gap-3">

                <button
                  type="button"
                  onClick={() =>
                    setRole("reader")
                  }
                  className={`p-4 rounded-2xl border text-left transition ${
                    role === "reader"
                      ? "border-[#151B4B] bg-white"
                      : "border-gray-200"
                  }`}
                >
                  <BookOpen size={18} />

                  <h4 className="mt-3 font-semibold">
                    Reader
                  </h4>

                  <p className="text-xs text-gray-500 mt-1">
                    Discover & purchase ebooks
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setRole("writer")
                  }
                  className={`p-4 rounded-2xl border text-left transition ${
                    role === "writer"
                      ? "border-[#151B4B] bg-white"
                      : "border-gray-200"
                  }`}
                >
                  <Pencil size={18} />

                  <h4 className="mt-3 font-semibold">
                    Writer
                  </h4>

                  <p className="text-xs text-gray-500 mt-1">
                    Publish & sell your work
                  </p>
                </button>

              </div>
            </div>

            {/* CREATE ACCOUNT */}
            <Button
              type="submit"
              isLoading={loading}
              className="w-full h-12 bg-[#151B4B] text-white font-semibold rounded-xl"
            >
              Create Account
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="h-px bg-gray-300 flex-1" />
              <span className="text-xs text-gray-400">
                or
              </span>
              <div className="h-px bg-gray-300 flex-1" />
            </div>

            {/* Google */}
            <button
              type="button"
              className="w-full h-12 rounded-xl border bg-white flex items-center justify-center gap-3 hover:bg-gray-50 transition"
            >
              <FcGoogle size={20} />
              Continue with Google
            </button>

            {/* Sign In */}
            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="/auth/signin"
                className="text-amber-600 font-semibold"
              >
                Sign in
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}