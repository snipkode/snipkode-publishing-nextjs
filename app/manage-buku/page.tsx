/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from 'react';
import withAuth from '@/middleware/withAuth';
import DashboardLayout from '@/components/DashboardLayout';
import Breadcrumb from '@/components/Breadcrumb';
import MainContentContainer from '@/components/MainContentContainer';
import MainTable from '@/components/MainTable';
import Popup from '@/components/Popup';

const ManageBuku = () => {
    const [books, setBooks] = useState<any[]>([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

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

    const handleAddNewClick = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

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
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2"
                                    placeholder="Enter Title"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
                                <input
                                    type="text"
                                    id="author"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2"
                                    placeholder="Enter Author"
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

export default withAuth(ManageBuku);
