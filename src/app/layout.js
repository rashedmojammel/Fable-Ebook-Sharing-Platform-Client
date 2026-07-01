import dns from 'node:dns'
dns.setServers(['8.8.8.8', '8.8.4.4'])

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Layout/Navbar';
import Providers from '@/components/Providers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Fable — Read, Share & Discover Ebooks",
  description: "A modern ebook sharing platform connecting readers and writers.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-zinc-950 transition-colors duration-300">
        <Providers>
          <Navbar />
          {children}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            theme="colored"
          />
        </Providers>
      </body>
    </html>
  );
}