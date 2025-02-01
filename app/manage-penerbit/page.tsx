"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import withAuth from '@/middleware/withAuth';
import DashboardLayout from '@/components/DashboardLayout';
import Breadcrumb from '@/components/Breadcrumb';
import MainContentContainer from '@/components/MainContentContainer';
import MainTable from '@/components/MainTable';

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

    const columns = [
        { header: "No", accessor: (row: any, index: number) => index + 1 },
        { header: "Nama Penerbit", accessor: "name" },
        { header: "Published", accessor: (row: any) => row.published ? 'Yes' : 'No' },
        { header: "Tanggal Dibuat", accessor: (row: any) => new Date(row.created_at).toLocaleDateString() },
        { header: "Dibuat Oleh", accessor: "created_by" },
        { header: "Status", accessor: "status", className: "text-center w-32" }
    ];

    return (
        <DashboardLayout>
            <div className="p-4 sm:p-6">
                <Breadcrumb title={"Manage Penerbit"} />
                <MainContentContainer title="Manage Penerbit" buttonText="Add New">
                    <MainTable data={publishers} columns={columns} />
                </MainContentContainer>
            </div>
        </DashboardLayout>
    );
};

export default withAuth(ManagePenerbit);
