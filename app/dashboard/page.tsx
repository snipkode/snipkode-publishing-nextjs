"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import withAuth from '@/middleware/withAuth';

const Dashboard = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
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

    useEffect(() => {
        const updateSidebarState = () => {
            if (window.innerWidth < 768) {
                setIsSidebarCollapsed(true);
            } else {
                setIsSidebarCollapsed(false);
            }
        };

        updateSidebarState();
        window.addEventListener('resize', updateSidebarState);

        return () => {
            window.removeEventListener('resize', updateSidebarState);
        };
    }, []);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="h-full flex">
            {/* Sidebar */}
            <aside id="sidebar" className={`sidebar fixed md:relative w-72 lg:w-64 h-screen bg-[#1a1464] text-white z-30 ${isSidebarCollapsed ? 'collapsed' : ''}`}>
                <div className="flex flex-col h-full">
                    <div className="p-4">
                        <h1 className="text-xl font-bold mb-8 px-2">Snipkode Publishing</h1>
                        <nav>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="flex items-center p-3 bg-blue-800 rounded-lg transition-colors">
                                        <span className="material-icons mr-3">dashboard</span>
                                        <span className="text-sm">Dashboard</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center p-3 hover:bg-blue-800 rounded-lg transition-colors">
                                        <span className="material-icons mr-3">business</span>
                                        <span className="text-sm">Manage Penerbit</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center p-3 hover:bg-blue-800 rounded-lg transition-colors">
                                        <span className="material-icons mr-3">menu_book</span>
                                        <span className="text-sm">Manage Buku</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center p-3 hover:bg-blue-800 rounded-lg transition-colors">
                                        <span className="material-icons mr-3">people</span>
                                        <span className="text-sm">Manage Pengguna</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="mt-auto p-4 text-sm">
                        E-book Digital Platform
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
                {/* Top Header */}
                <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-20">
                    <div className="flex items-center md:hidden">
                        <button id="menuToggle" className="text-gray-600 focus:outline-none" onClick={toggleSidebar}>
                            <span className="material-icons">menu</span>
                        </button>
                    </div>
                    <div className="flex items-center ml-auto">
                        <span className="mr-2 text-sm">Super Administrator</span>
                        <span className="material-icons">account_circle</span>
                    </div>
                </header>

                {/* Dashboard Content */}
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
            </main>

            {/* Overlay */}
            <div id="overlay" className={`fixed inset-0 bg-black transition-opacity z-20 ${isSidebarCollapsed ? 'opacity-50' : 'opacity-0 pointer-events-none'}`} onClick={toggleSidebar}></div>
        </div>
    );
};

export default withAuth(Dashboard);
