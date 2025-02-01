"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import withAuth from '@/middleware/withAuth';
import DashboardLayout from '@/components/DashboardLayout';

const ManagePenerbit = () => {
    const [user, setUser] = useState<User | null>(null);
    const [publishers, setPublishers] = useState<any[]>([]);
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
        const fetchPublishers = async () => {
            const { data, error } = await supabase.from('publishers').select('*');
            if (error) {
                console.error(error);
            } else {
                setPublishers(data);
            }
        };
        fetchPublishers();
    }, []);

    // if (!user) return <div>Loading...</div>;

    return (
        <DashboardLayout>
            <div className="p-4 sm:p-6">
                {/* Breadcrumb */}
                <nav className="text-gray-600 mb-4 text-sm" aria-label="Breadcrumb">
                    <ol className="list-none p-0 inline-flex items-center">
                        <li className="flex items-center">
                            <a href="#">Dashboard</a>
                            <span className="material-icons text-gray-400 mx-2" style={{ fontSize: '16px' }}>chevron_right</span>
                        </li>
                        <li>Manage Penerbit</li>
                    </ol>
                </nav>

                {/* Main Content Container */}
                <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <div className="flex items-center">
                            <span className="material-icons mr-2">grid_view</span>
                            <h1 className="text-lg sm:text-xl font-semibold">Manage Penerbit</h1>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center text-sm hover:bg-blue-700 transition-colors w-full sm:w-auto justify-center">
                            <span className="material-icons text-sm mr-1">add</span>
                            Add New
                        </button>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                        <div className="text-sm">Semua Penerbit (0)</div>
                        <div className="w-full sm:w-auto">
                            <input type="text" placeholder="Cari..." className="border rounded-lg px-4 py-2 w-full text-sm" />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="table-responsive">
                        <table className="w-full border-collapse min-w-[800px]">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="border px-4 py-2 text-left text-sm font-medium">No</th>
                                    <th className="border px-4 py-2 text-left text-sm font-medium">Nama Penerbit</th>
                                    <th className="border px-4 py-2 text-left text-sm font-medium">Published</th>
                                    <th className="border px-4 py-2 text-left text-sm font-medium">Tanggal Dibuat</th>
                                    <th className="border px-4 py-2 text-left text-sm font-medium">Dibuat Oleh</th>
                                    <th className="border px-4 py-2 text-center text-sm font-medium w-32">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={6} className="border px-4 py-8 text-center text-gray-500 text-sm">
                                        No data available
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-6">
                        <nav className="flex flex-wrap items-center justify-center gap-1">
                            <button className="px-3 py-1 rounded border text-sm hover:bg-gray-50 transition-colors">&laquo;</button>
                            <button className="px-3 py-1 rounded border bg-blue-600 text-white text-sm">1</button>
                            <button className="px-3 py-1 rounded border text-sm hover:bg-gray-50 transition-colors">2</button>
                            <button className="px-3 py-1 rounded border text-sm hover:bg-gray-50 transition-colors">3</button>
                            <button className="px-3 py-1 rounded border text-sm hover:bg-gray-50 transition-colors">4</button>
                            <button className="px-3 py-1 rounded border text-sm hover:bg-gray-50 transition-colors">5</button>
                            <button className="px-3 py-1 rounded border text-sm hover:bg-gray-50 transition-colors">&raquo;</button>
                        </nav>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default withAuth(ManagePenerbit);
