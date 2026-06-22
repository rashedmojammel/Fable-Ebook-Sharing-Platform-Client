

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

import { serverFetch, serverMutation } from "../core/server";

// import { serverFetch, serverMutation } from "../core/server";

// export const createPurchase = async (purchase) => {
//   const res = await fetch(`${baseUrl}/api/purchases`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(purchase),
//   });
//   return res.json();
// };

// export const checkPurchase = async (bookId, email) => {
//   const res = await fetch(
//     `${baseUrl}/api/purchases/check?bookId=${bookId}&email=${email}`,
//     { cache: "no-store" }
//   );
//    return res.json();
// };

// export const getUserPurchases = async (email) => {
//   const res = await fetch(`${baseUrl}/api/purchases?email=${email}`, {
//     cache: "no-store",
//   });
//   return res.json();
// };

// export const getWriterSales = async (email) => {
//   const res = await fetch(`${baseUrl}/api/sales?email=${email}`, {
//     cache: "no-store",
//   });
//  return res.json();
// };
// import { serverFetch, serverMutation } from "@/lib/core/fetch";

export const createPurchase = async (purchase) => {
  return serverMutation("/api/purchases", purchase);
};

export const checkPurchase = async (bookId, email) => {
  return serverFetch(`/api/purchases/check?bookId=${bookId}&email=${email}`);
};

export const getUserPurchases = async (email) => {
  return serverFetch(`/api/purchases?email=${email}`);
};

export const getWriterSales = async (email) => {
  return serverFetch(`/api/sales?email=${email}`);
};