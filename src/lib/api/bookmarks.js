// // // import { safeJson } from "./fetcher";

import { protectedFetch } from "../core/server";

// import { serverMutation } from "../core/server";

// // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// // export const addBookmark = async (bookmark) => {
// //   const res = await fetch(`${baseUrl}/api/bookmarks`, {
// //     method: "POST",
// //     headers: { "Content-Type": "application/json" },
// //     body: JSON.stringify(bookmark),
// //   });
// //    return res.json();
// // };

// // export const removeBookmark = async (bookId, userEmail) => {
// //   const res = await fetch(`${baseUrl}/api/bookmarks`, {
// //     method: "DELETE",
// //     headers: { "Content-Type": "application/json" },
// //     body: JSON.stringify({ bookId, userEmail }),
// //   });
// //    return res.json();
// // };

// // export const checkBookmark = async (bookId, email) => {
// //   const res = await fetch(
// //     `${baseUrl}/api/bookmarks/check?bookId=${bookId}&email=${email}`,
// //     { cache: "no-store" }
// //   );
// //    return res.json();
// // };

// // export const getUserBookmarks = async (email) => {
// //   const res = await fetch(`${baseUrl}/api/bookmarks?email=${email}`, {
// //     cache: "no-store",
// //   });
// //    return res.json();
// // };

// // import { serverFetch, serverMutation } from "@/lib/core/fetch";

// export const addBookmark = async (bookmark) => {
//   return serverMutation("/api/bookmarks", bookmark);
// };

// export const removeBookmark = async (bookId, userEmail) => {
//   return serverMutation("/api/bookmarks", { bookId, userEmail }, "DELETE");
// };

// export const checkBookmark = async (bookId, email) => {
//   return serverFetch(`/api/bookmarks/check?bookId=${bookId}&email=${email}`);
// };

// export const getUserBookmarks = async (email) => {
//   return serverFetch(`/api/bookmarks?email=${email}`);
// };

// import { protectedFetch } from "@/lib/core/server";

export const getUserBookmarks = async (email) => {
  return protectedFetch(`/api/bookmarks?email=${email}`);
};