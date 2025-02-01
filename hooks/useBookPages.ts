import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

interface PageProps {
    id: string;
    page_number: number;
    content: string;
}

const useBookPages = (bookId: string) => {
    const [pages, setPages] = useState<PageProps[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        const fetchPages = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase.from('book_pages').select('*').eq('book_id', bookId);
                if (error) throw error;
                setPages(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPages();
    }, [bookId]);

    const createPage = async (pageNumber: number, content: string) => {
        setLoading(true);
        try {
            const { data, error } = await supabase.from('book_pages').insert([{ book_id: bookId, page_number: pageNumber, content }]);
            if (error) throw error;
            if (data) {
                setPages([...pages, data[0]]);
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { pages, loading, error, createPage };
};

export default useBookPages;
