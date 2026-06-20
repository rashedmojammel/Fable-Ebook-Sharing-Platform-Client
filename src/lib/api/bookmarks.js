// import { safeJson } from "./fetcher";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const addBookmark = async (bookmark) => {
  const res = await fetch(`${baseUrl}/api/bookmarks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookmark),
  });
   return res.json();
};

export const removeBookmark = async (bookId, userEmail) => {
  const res = await fetch(`${baseUrl}/api/bookmarks`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bookId, userEmail }),
  });
   return res.json();
};

export const checkBookmark = async (bookId, email) => {
  const res = await fetch(
    `${baseUrl}/api/bookmarks/check?bookId=${bookId}&email=${email}`,
    { cache: "no-store" }
  );
   return res.json();
};

export const getUserBookmarks = async (email) => {
  const res = await fetch(`${baseUrl}/api/bookmarks?email=${email}`, {
    cache: "no-store",
  });
   return res.json();
};