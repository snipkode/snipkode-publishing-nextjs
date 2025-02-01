import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

const usePurchase = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);

    const purchaseBookPage = async (bookId: string, pageNumber: number) => {
        setLoading(true);
        try {
            const { data, error } = await supabase.from('sales').insert([{ book_id: bookId, page_number: pageNumber }]);
            if (error) throw error;
            return data;
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, purchaseBookPage };
};

export default usePurchase;
