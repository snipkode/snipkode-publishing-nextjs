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
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-6">Manage Penerbit</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {publishers.map((publisher) => (
                                <tr key={publisher.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{publisher.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{publisher.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{publisher.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default withAuth(ManagePenerbit);
