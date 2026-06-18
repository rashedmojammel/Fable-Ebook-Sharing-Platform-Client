import { getBooks } from '@/lib/api/job';
import React from 'react';

const WriterBooks = async() => {




    const userEmail = session?.user?.email ;
    const books = await getBooks(userEmail); // Fetch books for the specified email
    console.log("Books:", books); // Log the fetched books to the console
    return (
        <div>
            <h2>Manage Ebooks</h2>
            <p>Here you can manage your ebooks.</p>
        </div>
    );
};

export default WriterBooks;