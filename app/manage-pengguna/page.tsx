/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from 'react';
import withAuth from '@/middleware/withAuth';
import DashboardLayout from '@/components/DashboardLayout';
import Breadcrumb from '@/components/Breadcrumb';
import MainContentContainer from '@/components/MainContentContainer';
import MainTable from '@/components/MainTable';
import Popup from '@/components/Popup';
import useFetchUsers from '@/hooks/useFetchUsers';
import LoadingScreen from '@/components/LoadingScreen';

const ManagePengguna = () => {
    const { users, loading, error } = useFetchUsers();
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    if (loading) return <LoadingScreen message={'Fetching Pengguna...'}/>;
    if (error) return <LoadingScreen message={`${(error as unknown as Error).message}`} />;

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
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2"
                                    placeholder="Enter Name"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2"
                                    placeholder="Enter Email"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2"
                                    placeholder="Enter password"
                                />
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-200"
                                    onClick={handleClosePopup}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </Popup>
                )}
            </div>
        </DashboardLayout>
    );
};

export default withAuth(ManagePengguna);
