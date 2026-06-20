

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createPurchase = async (purchase) => {
  const res = await fetch(`${baseUrl}/api/purchases`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(purchase),
  });
  return res.json();
};

export const checkPurchase = async (bookId, email) => {
  const res = await fetch(
    `${baseUrl}/api/purchases/check?bookId=${bookId}&email=${email}`,
    { cache: "no-store" }
  );
   return res.json();
};

export const getUserPurchases = async (email) => {
  const res = await fetch(`${baseUrl}/api/purchases?email=${email}`, {
    cache: "no-store",
  });
  return res.json();
};

export const getWriterSales = async (email) => {
  const res = await fetch(`${baseUrl}/api/sales?email=${email}`, {
    cache: "no-store",
  });
 return res.json();
};