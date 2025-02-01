"use client";

import { useEffect, useState } from 'react';
import withAuth from '@/middleware/withAuth';
import DashboardLayout from '@/components/DashboardLayout';
import Breadcrumb from '@/components/Breadcrumb';
import MainContentContainer from '@/components/MainContentContainer';
import MainTable from '@/components/MainTable';
import Popup from '@/components/Popup';

const ManagePengguna = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

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

    const handleAddNewClick = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <DashboardLayout>
            <div className="p-4 sm:p-6">
                <Breadcrumb title={"Manage Pengguna"} />
                <MainContentContainer title="Manage Pengguna" buttonText="Add New" onButtonClick={handleAddNewClick}>
                    <MainTable data={users} columns={columns} />
                </MainContentContainer>
                {isPopupOpen && (
                    <Popup title="Add New User" onClose={handleClosePopup}>
                        <form>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" className="mt-1 block w-full border rounded-md shadow-sm" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" className="mt-1 block w-full border rounded-md shadow-sm" />
                            </div>
                            <div className="flex justify-end">
                                <button type="button" className="mr-2 px-4 py-2 bg-gray-300 rounded-md" onClick={handleClosePopup}>Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Save</button>
                            </div>
                        </form>
                    </Popup>
                )}
            </div>
        </DashboardLayout>
    );
};

export default withAuth(ManagePengguna);
