import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient';

interface User {
    id: string;
    name: string;
    email: string;
    created_at: string;
    created_by: string;
    status: string;
}

const useFetchUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('users')
            .select('*');
        if (error) {
            setError(error.message);
        } else {
            setUsers(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return { users, loading, error };
};

export default useFetchUsers;
