/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import withAuth from '@/middleware/withAuth';
import DashboardLayout from '@/components/DashboardLayout';
import Breadcrumb from '@/components/Breadcrumb';
import Link from 'next/link';
import useFetchStats from '@/hooks/useFetchStats';

const Dashboard = () => {
    const router = useRouter();
    const stats = useFetchStats();

    return (
        <DashboardLayout>
            <div className="p-6">
                <Breadcrumb title={"Beranda"}/>
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    {/* Semua Buku */}
                    <div className="bg-emerald-600 text-white rounded-lg p-6">
                        <div className="flex items-center mb-4">
                            <span className="material-icons mr-2">menu_book</span>
                            <h3>Semua Buku</h3>
                        </div>
                        <p className="text-3xl font-bold">{stats.totalBooks}</p>
                        <div className="flex justify-end mt-4">
                            <Link href="#" className="text-sm hover:underline">Lihat Detail</Link>
                        </div>
                    </div>

                    {/* Semua Penerbit */}
                    <div className="bg-indigo-900 text-white rounded-lg p-6">
                        <div className="flex items-center mb-4">
                            <span className="material-icons mr-2">business</span>
                            <h3>Semua Penerbit</h3>
                        </div>
                        <p className="text-3xl font-bold">{stats.totalPublishers}</p>
                        <div className="flex justify-end mt-4">
                            <Link href="#" className="text-sm hover:underline">Lihat Detail</Link>
                        </div>
                    </div>

                    {/* Semua Pengguna */}
                    <div className="bg-purple-900 text-white rounded-lg p-6">
                        <div className="flex items-center mb-4">
                            <span className="material-icons mr-2">people</span>
                            <h3>Semua Pengguna</h3>
                        </div>
                        <p className="text-3xl font-bold">{stats.totalUsers}</p>
                        <div className="flex justify-end mt-4">
                            <Link href="#" className="text-sm hover:underline">Lihat Detail</Link>
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
                        <p className="text-3xl font-bold">{stats.totalSales}</p>
                        <div className="flex justify-end mt-4">
                            <Link href="#" className="text-sm hover:underline">Lihat Detail</Link>
                        </div>
                    </div>

                    {/* Saldo Platform */}
                    <div className="bg-red-800 text-white rounded-lg p-6">
                        <div className="flex items-center mb-4">
                            <span className="material-icons mr-2">account_balance_wallet</span>
                            <h3>Saldo Platform</h3>
                        </div>
                        <p className="text-2xl font-bold">Rp {stats.platformBalance}</p>
                        <div className="flex justify-end mt-4">
                            <Link href="#" className="text-sm hover:underline">Lihat Detail</Link>
                        </div>
                    </div>

                    {/* Estimasi Pendapatan */}
                    <div className="bg-red-700 text-white rounded-lg p-6">
                        <div className="flex items-center mb-4">
                            <span className="material-icons mr-2">trending_up</span>
                            <h3>Estimasi Pendapatan</h3>
                        </div>
                        <p className="text-2xl font-bold">Rp {stats.estimatedRevenue}</p>
                        <div className="flex justify-end mt-4">
                            <Link href="#" className="text-sm hover:underline">Lihat Detail</Link>
                        </div>
                    </div>
                </div>

                {/* Online Users Section */}
                <div className="mt-6 bg-indigo-900 text-white rounded-lg p-6">
                    <div className="flex items-center mb-4">
                        <span className="material-icons mr-2">people_outline</span>
                        <h3>Pengguna Online ({stats?.onlineUsers})</h3>
                    </div>
                    <p className="text-sm">No users currently online</p>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default withAuth(Dashboard);
