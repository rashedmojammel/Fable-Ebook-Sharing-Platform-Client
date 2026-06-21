'use server'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const createbook = async(newBookData) =>{

    const res = await fetch(`${baseUrl}/api/books`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBookData)
    })  
    return res.json();


}

export const updatebook = async (id, updatedData) => {
  const res = await fetch(`${baseUrl}/api/books/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  return res.json();
};

export const deletebook = async (id) => {
    const res = await fetch(`${baseUrl}/api/books/${id}`, {
        method: 'DELETE',
    })
    return res.json();
}
export const updateBookStatus = async (id, status) => {
    const res = await fetch(`${baseUrl}/api/books/${id}/status`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
    });
    return res.json();
};