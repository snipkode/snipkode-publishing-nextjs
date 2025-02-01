import { create } from 'zustand';
import { supabase } from '@/utils/supabaseClient';

interface DashboardStats {
    totalBooks: number;
    totalPublishers: number;
    totalUsers: number;
    totalSales: number;
    platformBalance: number;
    estimatedRevenue: number;
    onlineUsers: number;
}

interface DashboardStore {
    stats: DashboardStats;
    fetchStats: () => void;
}

const useDashboardStore = create<DashboardStore>((set) => ({
    stats: {
        totalBooks: 0,
        totalPublishers: 0,
        totalUsers: 0,
        totalSales: 0,
        platformBalance: 0,
        estimatedRevenue: 0,
        onlineUsers: 0,
    },
    fetchStats: async () => {
        const { data: totalBooks } = await supabase.rpc('admin_get_total_books');
        const { data: totalPublishers } = await supabase.rpc('admin_get_total_publishers');
        const { data: totalUsers } = await supabase.rpc('admin_get_total_users');
        const { data: totalSales } = await supabase.rpc('admin_get_total_sales');
        const { data: platformBalance } = await supabase.rpc('platform_total_balance');
        const { data: estimatedRevenue } = await supabase.rpc('author_get_total_revenue_year', { user_id: 'user-id' });

        set({
            stats: {
                totalBooks: totalBooks[0]?.total_books || 0,
                totalPublishers: totalPublishers[0]?.total_publishers || 0,
                totalUsers: totalUsers[0]?.total_users || 0,
                totalSales: totalSales[0]?.total_sales || 0,
                platformBalance: platformBalance[0]?.total_balance || 0,
                estimatedRevenue: estimatedRevenue[0]?.total_revenue || 0,
                onlineUsers: 0, // This should be fetched from a real-time source
            },
        });
    },
}));

export default useDashboardStore;
