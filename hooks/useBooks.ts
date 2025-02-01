import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

const useBooks = () => {
    const [books, setBooks] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase.from('books').select('*');
                if (error) throw error;
                setBooks(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const createBook = async (title: string, authorId: string, publisherId: string, editorId: string) => {
        setLoading(true);
        try {
            const { data, error } = await supabase.from('books').insert([{ title, author_id: authorId, publisher_id: publisherId, editor_id: editorId }]);
            if (error) throw error;
            if (data) {
                setBooks([...books, data[0]]);
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { books, loading, error, createBook };
};

export default useBooks;
