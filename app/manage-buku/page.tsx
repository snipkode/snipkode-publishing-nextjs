"use client";

import { useEffect, useState } from 'react';
import withAuth from '@/middleware/withAuth';
import DashboardLayout from '@/components/DashboardLayout';
import Breadcrumb from '@/components/Breadcrumb';
import MainContentContainer from '@/components/MainContentContainer';
import MainTable from '@/components/MainTable';

const ManageBuku = () => {

    const [books, setBooks] = useState<any[]>([]);

    useEffect(() => {
        // Mock data for books
        const mockBooks = Array.from({ length: 40 }, (_, index) => ({
            id: index + 1,
            title: `Book ${index + 1}`,
            author: `Author ${index + 1}`,
            published: index % 2 === 0,
            created_at: `2023-01-${String(index + 1).padStart(2, '0')}`,
            created_by: "Admin",
            status: index % 2 === 0 ? "Active" : "Inactive"
        }));
        setBooks(mockBooks);
    }, []);

    const columns = [
        { header: "No", accessor: (row: any, index: number) => index + 1 },
        { header: "Judul Buku", accessor: "title" },
        { header: "Penulis", accessor: "author" },
        { header: "Published", accessor: (row: any) => row.published ? 'Yes' : 'No' },
        { header: "Tanggal Dibuat", accessor: (row: any) => new Date(row.created_at).toLocaleDateString() },
        { header: "Dibuat Oleh", accessor: "created_by" },
        { header: "Status", accessor: "status", className: "text-center w-32" }
    ];

    return (
        <DashboardLayout>
            <div className="p-4 sm:p-6">
                <Breadcrumb title={"Manage Buku"} />
                <MainContentContainer title="Manage Buku" buttonText="Add New">
                    <MainTable data={books} columns={columns} />
                </MainContentContainer>
            </div>
        </DashboardLayout>
    );
};

export default withAuth(ManageBuku);
