

// // import { serverFetch } from "../core/server";


// // export const getBooks = async (email) => {
// //   const path = email ? `/api/books?email=${email}` : `/api/books`;
// //   return serverFetch(path);
// // };


// // export const getBookById = async (id) => {
// //   return serverFetch(`/api/books/${id}`);
// // };

// import { serverFetch } from "../core/server";

// export const getBooks = async (params = {}) => {
//   const queryParams = new URLSearchParams();

//   if (params.search) queryParams.append("search", params.search);
//   if (params.genre && params.genre !== "All") queryParams.append("genre", params.genre);
//   if (params.minPrice) queryParams.append("minPrice", params.minPrice);
//   if (params.maxPrice) queryParams.append("maxPrice", params.maxPrice);
//   if (params.sort) queryParams.append("sort", params.sort);
//   if (params.email) queryParams.append("email", params.email);

//   const queryString = queryParams.toString();
//   const path = queryString ? `/api/books?${queryString}` : `/api/books`;

//   return serverFetch(path);
// };

// export const getBookById = async (id) => {
//   return serverFetch(`/api/books/${id}`);
// };

import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getBooks = async (params = {}) => {
  const query = new URLSearchParams();

  if (params.email) query.set("email", params.email);
  if (params.genre) query.set("genre", params.genre);
  if (params.search) query.set("search", params.search);
  if (params.minPrice) query.set("minPrice", params.minPrice);
  if (params.maxPrice) query.set("maxPrice", params.maxPrice);
  if (params.sort) query.set("sort", params.sort);

  const path = query.toString()
    ? `/api/books?${query.toString()}`
    : `/api/books`;

  const res = await fetch(`${baseUrl}${path}`, { cache: "no-store" });
  return res.json();
};

export const getBookById = async (id) => {
  return serverFetch(`/api/books/${id}`);
};