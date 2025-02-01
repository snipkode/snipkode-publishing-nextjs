"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import withAuth from '@/middleware/withAuth';

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

    if (!user) return <div>Loading...</div>;

    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside className="w-64 bg-white shadow-md">
                <div className="p-4">
                    <h2 className="text-2xl font-bold">SK Platform</h2>
                </div>
                <nav className="p-4">
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-200">
                                <span className="material-icons">person</span>
                                <span className="ml-2">Profile</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-200">
                                <span className="material-icons">book</span>
                                <span className="ml-2">Books</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-200">
                                <span className="material-icons">bar_chart</span>
                                <span className="ml-2">Statistics</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-200">
                                <span className="material-icons">message</span>
                                <span className="ml-2">Messages</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-200">
                                <span className="material-icons">settings</span>
                                <span className="ml-2">Settings</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-200">
                                <span className="material-icons">support</span>
                                <span className="ml-2">Support</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>
            <main className="flex-1 p-8">
                <div className="max-w-6xl mx-auto space-y-8 bg-white p-8 rounded shadow-md">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold">Dashboard</h2>
                        <p className="text-lg">Welcome, {user.email}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="p-6 bg-blue-100 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold">Profile</h3>
                            <p>Manage your profile settings and preferences.</p>
                        </div>
                        <div className="p-6 bg-green-100 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold">Books</h3>
                            <p>View and manage your book collection.</p>
                        </div>
                        <div className="p-6 bg-yellow-100 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold">Statistics</h3>
                            <p>View your reading and writing statistics.</p>
                        </div>
                        <div className="p-6 bg-purple-100 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold">Messages</h3>
                            <p>Check your messages and notifications.</p>
                        </div>
                        <div className="p-6 bg-red-100 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold">Settings</h3>
                            <p>Adjust your account and application settings.</p>
                        </div>
                        <div className="p-6 bg-indigo-100 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold">Support</h3>
                            <p>Get help and support for any issues.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default withAuth(Dashboard);
