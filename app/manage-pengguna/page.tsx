"use client";

import { useEffect, useState } from 'react';
import withAuth from '@/middleware/withAuth';
import DashboardLayout from '@/components/DashboardLayout';
import Breadcrumb from '@/components/Breadcrumb';
import MainContentContainer from '@/components/MainContentContainer';
import MainTable from '@/components/MainTable';

const ManagePengguna = () => {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        // Mock data for users
        const mockUsers = Array.from({ length: 40 }, (_, index) => ({
            id: index + 1,
            name: `User ${index + 1}`,
            email: `user${index + 1}@example.com`,
            created_at: `2023-01-${String(index + 1).padStart(2, '0')}`,
            created_by: "Admin",
            status: index % 2 === 0 ? "Active" : "Inactive"
        }));
        setUsers(mockUsers);
    }, []);

    const columns = [
        { header: "No", accessor: (row: any, index: number) => index + 1 },
        { header: "Nama Pengguna", accessor: "name" },
        { header: "Email", accessor: "email" },
        { header: "Tanggal Dibuat", accessor: (row: any) => new Date(row.created_at).toLocaleDateString() },
        { header: "Dibuat Oleh", accessor: "created_by" },
        { header: "Status", accessor: "status", className: "text-center w-32" }
    ];

    return (
        <DashboardLayout>
            <div className="p-4 sm:p-6">
                <Breadcrumb title={"Manage Pengguna"} />
                <MainContentContainer title="Manage Pengguna" buttonText="Add New">
                    <MainTable data={users} columns={columns} />
                </MainContentContainer>
            </div>
        </DashboardLayout>
    );
};

export default withAuth(ManagePengguna);
