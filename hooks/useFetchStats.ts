import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient';

interface Stats {
    onlineUsers: number;
    totalBooks: number;
    totalPublishers: number;
    totalUsers: number;
    totalSales: number;
    platformBalance: number;
    estimatedRevenue: number;
}

const useFetchStats = () => {
    const [stats, setStats] = useState<Stats>({
        totalBooks: 0,
        totalPublishers: 0,
        totalUsers: 0,
        totalSales: 0,
        platformBalance: 0,
        estimatedRevenue: 0,
        onlineUsers: 0
    });

    const fetchStats = async () => {
        const { data: total_books } = await supabase.rpc('admin_get_total_books');
        const { data: total_publishers } = await supabase.rpc('admin_get_total_publishers');
        const { data: total_users } = await supabase.rpc('admin_get_total_users');
        const { data: total_sales } = await supabase.rpc('admin_get_total_sales');
        const { data: total_unwithdrawn_balance } = await supabase.rpc('admin_get_total_unwithdrawn_balance');
        const { data: total_revenue } = await supabase.rpc('admin_get_total_withdrawn_balance');

        setStats({
            totalBooks: total_books[0]?.total_books || 0,
            totalPublishers: total_publishers[0]?.total_publishers || 0,
            totalUsers: total_users[0]?.total_users || 0,
            totalSales: total_sales[0]?.total_sales || 0,
            platformBalance: total_unwithdrawn_balance[0]?.total_unwithdrawn_balance || 0,
            estimatedRevenue: total_revenue[0]?.total_withdrawn_balance || 0,
            onlineUsers: 0
        });
    };

    useEffect(() => {
        fetchStats();
    }, []);

    return stats;
};

export default useFetchStats;
