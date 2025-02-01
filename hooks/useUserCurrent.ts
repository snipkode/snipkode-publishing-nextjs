import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient'; // Import Supabase client

interface User {
    email?: string;
}

const useUserCurrent = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser(); // Get the current user
            setUser(user); // Set user data
            setLoading(false);
        };

        fetchUser();

        // Listen for auth state changes
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user || null);
        });

        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, []);

    return { user, loading };
};

export default useUserCurrent;
