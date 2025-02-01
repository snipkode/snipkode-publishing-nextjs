"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import withAuth from '@/middleware/withAuth';
import DashboardLayout from '@/components/DashboardLayout';
import Breadcrumb from '@/components/Breadcrumb';
import MainContentContainer from '@/components/MainContentContainer';
import MainTable from '@/components/MainTable';

const ManagePenerbit = () => {
    const [publishers, setPublishers] = useState<any[]>([]);

    useEffect(() => {
        // Mock data for publishers
        const mockPublishers = Array.from({ length: 40 }, (_, index) => ({
            id: index + 1,
            name: `Publisher ${index + 1}`,
            published: index % 2 === 0,
            created_at: `2023-01-${String(index + 1).padStart(2, '0')}`,
            created_by: "Admin",
            status: index % 2 === 0 ? "Active" : "Inactive"
        }));
        setPublishers(mockPublishers);
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
