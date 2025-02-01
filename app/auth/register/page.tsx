"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/navigation';

interface DetailUsers {
    id: string,
    full_name: string,
    date_of_birth: string,
    address: string,
    phone_number: string,
    identity_number: string
}

interface Roles {
    id: string,
    name: string
}

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [roles, setRoles] = useState<Roles[]>([]);
    const [userDetail, setUserDetail] = useState<DetailUsers>({
        id: '',
        full_name: '',
        date_of_birth: '',
        address: '',
        phone_number: '',
        identity_number: ''
    });
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchRoles = async () => {
            const { data } = await supabase.from('roles').select('*');
            console.log(data);
            if (data) {
                setRoles(data);
            }
        };
        fetchRoles();
    }, [])

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
            setError(error.message);
        } else {
            // Save user role in a separate table
            if (userDetail) {
                try {
                    const { error: insertError } = await supabase.from('users').insert([{
                        role_id: role,
                        email: email,
                    }]);
                    if (insertError) throw insertError;
                } catch (insertError) {
                    setError((insertError as Error).message);
                    return;
                }

                // await supabase.from('users_detail').insert([{
                //     id: userDetail?.id,
                //     full_name: userDetail.full_name,
                //     address: userDetail.address,
                //     identity_number: userDetail.identity_number,
                //     phone_number: userDetail.phone_number,
                // }]);
            }
            router.push('/dashboard');
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            {roles.map((val) => (
                                <option key={val.id} value={val.id} className='capitalize'>{val.name}</option>
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
