const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getBooks = async (email) => {
    const res = await fetch(`${baseUrl}/api/books?email=${email}`);
    return res.json();
}
export const getBookById = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${id}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
};