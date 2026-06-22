"use server";

import { serverFetch, serverMutation } from "../core/server";

// import { serverFetch, serverMutation } from "@/lib/core/server";

export const addBookmark = async (bookmark) => {
  return serverMutation("/api/bookmarks", bookmark);
};

export const removeBookmark = async (bookId, userEmail) => {
  return serverMutation("/api/bookmarks", { bookId, userEmail }, "DELETE");
};

export const checkBookmark = async (bookId, email) => {
  return serverFetch(`/api/bookmarks/check?bookId=${bookId}&email=${email}`);
};