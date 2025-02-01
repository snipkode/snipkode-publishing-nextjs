import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient';

interface Publisher {
    id: string;
    name: string;
    email: string;
    created_at: string;
    created_by: string;
}

const useFetchPublishers = () => {
    const [publishers, setPublishers] = useState<Publisher[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPublishers = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('publishers')
            .select('*');
        if (error) {
            setError(error.message);
        } else {
            setPublishers(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPublishers();
    }, []);

    return { publishers, loading, error };
};

export default useFetchPublishers;
