/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from 'react';
import withAuth from '@/middleware/withAuth';
import DashboardLayout from '@/components/DashboardLayout';
import Breadcrumb from '@/components/Breadcrumb';
import MainContentContainer from '@/components/MainContentContainer';
import MainTable from '@/components/MainTable';
import Popup from '@/components/Popup';
import useFetchBooks from '@/hooks/useFetchBooks';
import LoadingScreen from '@/components/LoadingScreen';

const ManageBuku = () => {
    const { books, loading, error } = useFetchBooks();
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const columns = [
        { header: "No", accessor: (row: any, index: number) => index + 1 },
        { header: "Judul Buku", accessor: "title" },
        { header: "Penulis", accessor: "author" },
        { header: "Tanggal Terbit", accessor: (row: any) => new Date(row.published_at).toLocaleDateString() },
        { header: "Dibuat Oleh", accessor: "created_by" }
    ];

    const handleAddNewClick = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    if (loading) return <LoadingScreen message={'Fetching Buku..'}/>;
    if (error) return <LoadingScreen message={`${error}`}/>;

    return (
        <DashboardLayout>
            <div className="p-4 sm:p-6">
                <Breadcrumb title={"Manage Buku"} />
                <MainContentContainer title="Manage Buku" buttonText="Add New" onButtonClick={handleAddNewClick}>
                    <MainTable data={books} columns={columns} />
                </MainContentContainer>
                {isPopupOpen && (
                    <Popup title="Add New Book" onClose={handleClosePopup}>
                        <form>
                            {/* ...existing code... */}
                        </form>
                    </Popup>
                )}
            </div>
        </DashboardLayout>
    );
};

export default withAuth(ManageBuku);
