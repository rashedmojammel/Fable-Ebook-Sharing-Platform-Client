"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeSlash, Person, At, ShieldKeyhole } from "@gravity-ui/icons";
import { authClient, signUp } from "@/lib/auth-client";

const ROLES = [
  {
    value: "reader",
    label: "Reader",
    emoji: "📖",
    desc: "Browse and purchase ebooks",
  },
  {
    value: "writer",
    label: "Writer",
    emoji: "✍️",
    desc: "Publish and sell your work",
  },
];

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("reader");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const { data, error: authError } = await signUp.email({
        email,
        password,
        name,
        userRole: role,
        callbackURL: "/",
      });

      if (authError) {
        setError(authError.message || "Something went wrong during signup.");
      } else {
        setSuccess("Account created successfully! Welcome to Fable.");
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      setError("An unexpected network error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT PANEL */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(145deg, #0F0F1A 0%, #1a0533 60%, #0f1a2e 100%)" }}
      >
        {/* Ambient glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)" }}
        />

        {/* Decorative book spines */}
        <div className="absolute bottom-16 right-0 flex items-end gap-2 opacity-20">
          {[
            { h: 200, w: 28, color: "#7C3AED" },
            { h: 240, w: 22, color: "#a855f7" },
            { h: 180, w: 32, color: "#6d28d9" },
            { h: 260, w: 20, color: "#8b5cf6" },
            { h: 210, w: 26, color: "#7C3AED" },
            { h: 190, w: 30, color: "#9333ea" },
          ].map((spine, i) => (
            <div
              key={i}
              style={{
                height: spine.h,
                width: spine.w,
                backgroundColor: spine.color,
                borderRadius: "4px 4px 0 0",
              }}
            />
          ))}
        </div>

        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 z-10">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-2xl">
            📚
          </div>
          <span className="text-2xl font-black text-white" style={{ fontFamily: "Georgia, serif" }}>
            Fable
          </span>
        </Link>

        {/* Main copy */}
        <div className="relative z-10 space-y-6">
          <p
            className="text-4xl font-bold text-white leading-snug"
            style={{ fontFamily: "Georgia, serif" }}
          >
            "Not all those who wander are lost."
          </p>
          <p className="text-violet-300 text-sm tracking-widest uppercase">
            — J.R.R. Tolkien
          </p>

          <div className="pt-8 space-y-4">
            <p className="text-white/40 text-xs uppercase tracking-widest">
              Join as a
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📖</span>
                <div>
                  <p className="text-white font-semibold text-sm">Reader</p>
                  <p className="text-white/50 text-xs">
                    Discover and purchase original ebooks
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✍️</span>
                <div>
                  <p className="text-white font-semibold text-sm">Writer</p>
                  <p className="text-white/50 text-xs">
                    Publish your work and reach global readers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="relative z-10 text-white/20 text-xs">
          © {new Date().getFullYear()} Fable. All rights reserved.
        </p>
      </div>

      {/* RIGHT PANEL — Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white overflow-y-auto">
        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-lg">
              📚
            </div>
            <span className="text-xl font-black text-zinc-900" style={{ fontFamily: "Georgia, serif" }}>
              Fable
            </span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">
              Create your account
            </h1>
            <p className="text-zinc-500 text-sm mt-2">
              Join thousands of readers and writers
            </p>
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="w-full flex items-center justify-center gap-3 h-12 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-sm font-medium text-zinc-700 transition shadow-sm"
          >
            <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <g>
                <path d="m0 0H512V512H0" fill="#fff" />
                <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
                <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
                <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
                <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
              </g>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-zinc-100" />
            <span className="text-xs text-zinc-400">or sign up with email</span>
            <div className="flex-1 h-px bg-zinc-100" />
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-4">

            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-700">
                Full name
              </label>
              <div className="flex items-center gap-2 h-12 px-4 border border-zinc-200 rounded-xl bg-zinc-50 focus-within:border-violet-400 focus-within:bg-white transition-all">
                <Person className="text-zinc-400 shrink-0" size={16} />
                <input
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="flex-1 bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-700">
                Email address
              </label>
              <div className="flex items-center gap-2 h-12 px-4 border border-zinc-200 rounded-xl bg-zinc-50 focus-within:border-violet-400 focus-within:bg-white transition-all">
                <At className="text-zinc-400 shrink-0" size={16} />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-700">
                Password
              </label>
              <div className="flex items-center gap-2 h-12 px-4 border border-zinc-200 rounded-xl bg-zinc-50 focus-within:border-violet-400 focus-within:bg-white transition-all">
                <ShieldKeyhole className="text-zinc-400 shrink-0" size={16} />
                <input
                  type={isVisible ? "text" : "password"}
                  placeholder="Choose a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="flex-1 bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setIsVisible(!isVisible)}
                  className="text-zinc-400 hover:text-zinc-600 transition"
                >
                  {isVisible ? <EyeSlash size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Role selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700">
                I want to join as a
              </label>
              <div className="grid grid-cols-2 gap-3">
                {ROLES.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 text-center transition-all ${
                      role === r.value
                        ? "border-violet-500 bg-violet-50"
                        : "border-zinc-200 bg-white hover:border-zinc-300"
                    }`}
                  >
                    <span className="text-2xl">{r.emoji}</span>
                    <div>
                      <p
                        className={`text-sm font-semibold ${
                          role === r.value ? "text-violet-700" : "text-zinc-800"
                        }`}
                      >
                        {r.label}
                      </p>
                      <p className="text-xs text-zinc-500 mt-0.5 leading-tight">
                        {r.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Status */}
            {error && (
              <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
                {error}
              </p>
            )}
            {success && (
              <p className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-4 py-3">
                {success}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-sm font-semibold hover:opacity-90 transition disabled:opacity-60 shadow-lg shadow-violet-200"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-zinc-500 mt-6">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="font-semibold text-violet-600 hover:text-violet-700"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}