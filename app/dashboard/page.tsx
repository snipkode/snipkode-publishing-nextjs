"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import withAuth from '@/middleware/withAuth';
import DashboardLayout from '@/components/DashboardLayout';

const Dashboard = () => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUser(user);
            } else {
                router.push('/auth/login');
            }
        };
        fetchUser();
    }, [router]);

    // if (!user) return <div>Loading...</div>;

    return (
        <DashboardLayout>
            <div className="p-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    {/* Semua Buku */}
                    <div className="bg-emerald-600 text-white rounded-lg p-6">
                        <div className="flex items-center mb-4">
                            <span className="material-icons mr-2">menu_book</span>
                            <h3>Semua Buku</h3>
                        </div>
                        <p className="text-3xl font-bold">12</p>
                        <div className="flex justify-end mt-4">
                            <a href="#" className="text-sm hover:underline">Lihat Detail</a>
                        </div>
                    </div>

                    {/* Semua Penerbit */}
                    <div className="bg-indigo-900 text-white rounded-lg p-6">
                        <div className="flex items-center mb-4">
                            <span className="material-icons mr-2">business</span>
                            <h3>Semua Penerbit</h3>
                        </div>
                        <p className="text-3xl font-bold">26</p>
                        <div className="flex justify-end mt-4">
                            <a href="#" className="text-sm hover:underline">Lihat Detail</a>
                        </div>
                    </div>

                    {/* Semua Pengguna */}
                    <div className="bg-purple-900 text-white rounded-lg p-6">
                        <div className="flex items-center mb-4">
                            <span className="material-icons mr-2">people</span>
                            <h3>Semua Pengguna</h3>
                        </div>
                        <p className="text-3xl font-bold">503</p>
                        <div className="flex justify-end mt-4">
                            <a href="#" className="text-sm hover:underline">Lihat Detail</a>
                        </div>
                    </div>
                </div>

                {/* Additional Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Books Transaction */}
                    <div className="bg-yellow-700 text-white rounded-lg p-6">
                        <div className="flex items-center mb-4">
                            <span className="material-icons mr-2">library_books</span>
                            <h3>Books Transaction</h3>
                        </div>
                        <p className="text-3xl font-bold">2331</p>
                        <div className="flex justify-end mt-4">
                            <a href="#" className="text-sm hover:underline">Lihat Detail</a>
                        </div>
                    </div>

                    {/* Saldo Platform */}
                    <div className="bg-red-800 text-white rounded-lg p-6">
                        <div className="flex items-center mb-4">
                            <span className="material-icons mr-2">account_balance_wallet</span>
                            <h3>Saldo Platform</h3>
                        </div>
                        <p className="text-2xl font-bold">Rp 230.000.000</p>
                        <div className="flex justify-end mt-4">
                            <a href="#" className="text-sm hover:underline">Lihat Detail</a>
                        </div>
                    </div>

                    {/* Estimasi Pendapatan */}
                    <div className="bg-red-700 text-white rounded-lg p-6">
                        <div className="flex items-center mb-4">
                            <span className="material-icons mr-2">trending_up</span>
                            <h3>Estimasi Pendapatan</h3>
                        </div>
                        <p className="text-2xl font-bold">Rp 15.000.000</p>
                        <div className="flex justify-end mt-4">
                            <a href="#" className="text-sm hover:underline">Lihat Detail</a>
                        </div>
                    </div>
                </div>

                {/* Online Users Section */}
                <div className="mt-6 bg-indigo-900 text-white rounded-lg p-6">
                    <div className="flex items-center mb-4">
                        <span className="material-icons mr-2">people_outline</span>
                        <h3>Pengguna Online (0)</h3>
                    </div>
                    <p className="text-sm">No users currently online</p>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default withAuth(Dashboard);
