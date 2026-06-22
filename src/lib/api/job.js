// import { serverFetch } from "@/lib/core/fetch";

import { serverFetch } from "../core/server";

// import { serverFetch } from "../core/server";

// import { serverFetch } from "../core/server";

export const getBooks = async (email) => {
  const path = email ? `/api/books?email=${email}` : `/api/books`;
  return serverFetch(path);
};

export const getBookById = async (id) => {
  return serverFetch(`/api/books/${id}`);
};