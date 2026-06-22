const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getFeaturedBooks = async () => {
  const res = await fetch(`${baseUrl}/api/books/featured`, {
    cache: "no-store",
  });
  return res.json();
};

export const getTopWriters = async () => {
  const res = await fetch(`${baseUrl}/api/writers/top`, {
    cache: "no-store",
  });
  return res.json();
};