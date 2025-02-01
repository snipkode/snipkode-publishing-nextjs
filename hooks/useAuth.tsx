import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient'; // Import Supabase client

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuthStatus = async () => {
            const { data: { user } } = await supabase.auth.getUser(); // Get the current user
            setIsAuthenticated(!!user); // Set authentication status based on user presence
            setLoading(false);
        };

        checkAuthStatus();

        // Listen for auth state changes
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setIsAuthenticated(!!session?.user);
        });

        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, []);

    return { isAuthenticated, loading };
};
