'use client';

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Home = () => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/dashboard');
        }
    }, [isAuthenticated]);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to Online Book Store</h1>
            <p className="text-lg mb-8">Read, Write, and Publish your favorite books.</p>
            <div className="space-x-4">
                <Link href="/auth/register" className="px-4 py-2 bg-blue-500 text-white rounded">Register</Link>
                <Link href="/auth/login" className="px-4 py-2 bg-green-500 text-white rounded">Login</Link>
            </div>
        </div>
    );
};

export default Home;
