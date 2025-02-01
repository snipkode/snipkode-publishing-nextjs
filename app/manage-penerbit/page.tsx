/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import withAuth from '@/middleware/withAuth';
import DashboardLayout from '@/components/DashboardLayout';
import Breadcrumb from '@/components/Breadcrumb';
import MainContentContainer from '@/components/MainContentContainer';
import MainTable from '@/components/MainTable';
import Popup from '@/components/Popup';
import useFetchPublishers from '@/hooks/useFetchPublishers';
import LoadingScreen from '@/components/LoadingScreen';

const ManagePenerbit = () => {
    const { publishers, loading, error } = useFetchPublishers();
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const columns = [
        { header: "No", accessor: (row: any, index: number) => index + 1 },
        { header: "Nama Penerbit", accessor: "name" },
        { header: "Email", accessor: "email" },
        { header: "Tanggal Dibuat", accessor: (row: any) => new Date(row.created_at).toLocaleDateString() },
        { header: "Dibuat Oleh", accessor: "created_by" }
    ];

    const handleAddNewClick = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    if (loading) return <LoadingScreen message={'Fetching Penerbit..'}/>;
    if (error) return <LoadingScreen message={`${error}`}/>;

    return (
        <DashboardLayout>
            <div className="p-4 sm:p-6">
                <Breadcrumb title={"Manage Penerbit"} />
                <MainContentContainer title="Manage Penerbit" buttonText="Add New" onButtonClick={handleAddNewClick}>
                    <MainTable data={publishers} columns={columns} />
                </MainContentContainer>
                {isPopupOpen && (
                    <Popup title="Add New Publisher" onClose={handleClosePopup}>
                        <form>
                            {/* <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2"
                                    placeholder="Enter Name"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="published" className="block text-sm font-medium text-gray-700">Published</label>
                                <select
                                    id="published"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2"
                                >
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div> */}

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

export default withAuth(ManagePenerbit);
