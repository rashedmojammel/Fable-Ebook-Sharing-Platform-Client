// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

import { serverFetch } from "../core/server";

// export const getFeaturedBooks = async () => {
//   const res = await fetch(`${baseUrl}/api/books/featured`, {
//     cache: "no-store",
//   });
//   return res.json();
// };

// export const getTopWriters = async () => {
//   const res = await fetch(`${baseUrl}/api/writers/top`, {
//     cache: "no-store",
//   });
//   return res.json();
// };

// import { serverFetch } from "@/lib/core/fetch";

export const getFeaturedBooks = async () => {
  return serverFetch("/api/books/featured");
};

export const getTopWriters = async () => {
  return serverFetch("/api/writers/top");
};