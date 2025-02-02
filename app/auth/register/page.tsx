"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/navigation';

interface DetailUsers {
    email: string,
    password: string,
    role: string
    full_name: string,
    date_of_birth: string
}

const Register = () => {
 
    const [roles, setRoles] = useState<{
        id: string,
        name: string,
    }[]>([]);

    const [userDetail, setUserDetail] = useState<DetailUsers>({
        email: '',
        password: '',
        role: 'penulis',
        full_name: '',
        date_of_birth: ''
    });
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchRoles = async () => {
            const { data } = await supabase.from('roles').select('*');
            // console.log(data);
            if (data) {
                setRoles(data);
            }
        };
        fetchRoles();
    }, [])

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase.auth.signUp({
            email: userDetail.email,
            password: userDetail.password
        })
        if(error) setError((error as Error).message);

        try {
            const { error: insertError } = await supabase.rpc('pendaftaran', {
                p_email: userDetail.email,
                p_password: userDetail.password,
                p_role: userDetail.role,
                p_full_name: userDetail.full_name,
                p_date_of_birth: userDetail.date_of_birth,
            });

            if (insertError) setError((insertError as Error).message);
            router.push('/')
        } catch (insertError) {
            setError((insertError as Error).message);
            return;
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center">Register</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                        <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
                           Nama Lengkap
                        </label>
                        <input
                            id="fullname"
                            type="text"
                            required
                            value={userDetail.full_name}
                            onChange={(e) => setUserDetail({...userDetail, full_name: e.target.value})}
                            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="dateofbirth" className="block text-sm font-medium text-gray-700">
                            Tanggal Lahir
                        </label>
                        <input
                            id="dateofbirth"
                            name="dateofbirth"
                            type="date"
                            autoComplete="current-password"
                            required
                            value={userDetail.date_of_birth}
                            onChange={(e) => setUserDetail({...userDetail, date_of_birth: e.target.value})}
                            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={userDetail.email}
                            onChange={(e) => setUserDetail({...userDetail, email: e.target.value})}
                            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Masukan Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="password"
                            required
                            value={userDetail.password}
                            onChange={(e) => setUserDetail({...userDetail, password: e.target.value})}
                            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                            Role
                        </label>
                        <select
                            id="role"
                            name="role"
                            required
                            value={userDetail.role}
                            onChange={(e) =>setUserDetail({...userDetail, role: e.target.value})}
                            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            {roles.map((val) => (
                                <option key={val.id} value={val.name} className='capitalize'>{val.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
