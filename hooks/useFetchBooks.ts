import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient';

interface Book {
    id: string;
    title: string;
    author: string;
    published_at: string;
    created_by: string;
}

const useFetchBooks = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBooks = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('books')
            .select('*');
        if (error) {
            setError(error.message);
        } else {
            setBooks(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return { books, loading, error };
};

export default useFetchBooks;
