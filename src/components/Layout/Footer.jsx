"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0b0b12] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* TOP GRID */}
        <div className="grid md:grid-cols-4 gap-12">

          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-black tracking-tight">
              📚 Fable
            </h2>

            <p className="text-white/60 mt-4 text-sm leading-relaxed">
              A modern ebook platform to read, share, and discover knowledge.
              Build your personal digital library effortlessly.
            </p>

            <div className="flex gap-3 mt-6">
              <SocialIcon href="https://facebook.com" icon={<FaFacebookF />} />
              <SocialIcon href="https://twitter.com" icon={<FaTwitter />} />
              <SocialIcon href="https://instagram.com" icon={<FaInstagram />} />
              <SocialIcon href="https://linkedin.com" icon={<FaLinkedinIn />} />
              <SocialIcon href="https://github.com" icon={<FaGithub />} />
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="font-semibold mb-5">Quick Links</h3>

            <ul className="space-y-3 text-sm text-white/60">
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h3 className="font-semibold mb-5">Resources</h3>

            <ul className="space-y-3 text-sm text-white/60">
              <li><Link href="#" className="hover:text-white transition">Browse Ebooks</Link></li>
              <li><Link href="#" className="hover:text-white transition">Top Authors</Link></li>
              <li><Link href="#" className="hover:text-white transition">Categories</Link></li>
              <li><Link href="#" className="hover:text-white transition">Help Center</Link></li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="font-semibold mb-5">Newsletter</h3>

            <p className="text-white/60 text-sm mb-4">
              Get updates about new ebooks and features.
            </p>

            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-violet-500 transition"
              />

              <button className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 font-semibold hover:scale-[1.02] transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 mt-14 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-white/40 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Fable. All rights reserved.
          </p>

          <p className="text-white/30 text-xs">
            Designed for modern readers 📖
          </p>

        </div>
      </div>
    </footer>
  );
}

/* SOCIAL ICON COMPONENT */
function SocialIcon({ href, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/30 transition"
    >
      {icon}
    </a>
  );
}