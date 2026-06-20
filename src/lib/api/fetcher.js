export const safeJson = async (res) => {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed (${res.status} ${res.url}): ${text.slice(0, 200)}`);
  }
  return res.json();
};