/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from 'react';
import withAuth from '@/middleware/withAuth';
import DashboardLayout from '@/components/DashboardLayout';
import Breadcrumb from '@/components/Breadcrumb';
import MainContentContainer from '@/components/MainContentContainer';
import MainTable from '@/components/MainTable';
import Popup from '@/components/Popup';
import useBooks from '@/hooks/useBooks';
import LoadingScreen from '@/components/LoadingScreen';

const ManageBuku = () => {
    const { books, loading, error, createBook } = useBooks();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [newBook, setNewBook] = useState({ title: '', authorId: '', publisherId: '', editorId: '' });

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewBook({ ...newBook, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createBook(newBook.title, newBook.authorId, newBook.publisherId, newBook.editorId);
        setIsPopupOpen(false);
    };

    if (loading) return <LoadingScreen message={'Fetching Buku..'} />;
    if (error) return <LoadingScreen message={`${(error as unknown as Error).message}`} />;

    return (
        <DashboardLayout>
            <div className="p-4 sm:p-6">
                <Breadcrumb title={"Manage Buku"} />
                <MainContentContainer title="Manage Buku" buttonText="Add New" onButtonClick={handleAddNewClick}>
                    <MainTable data={books} columns={columns} />
                </MainContentContainer>
                {isPopupOpen && (
                    <Popup title="Add New Book" onClose={handleClosePopup}>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="title"
                                value={newBook.title}
                                onChange={handleInputChange}
                                placeholder="Title"
                                required
                            />
                            <input
                                type="text"
                                name="authorId"
                                value={newBook.authorId}
                                onChange={handleInputChange}
                                placeholder="Author ID"
                                required
                            />
                            <input
                                type="text"
                                name="publisherId"
                                value={newBook.publisherId}
                                onChange={handleInputChange}
                                placeholder="Publisher ID"
                                required
                            />
                            <input
                                type="text"
                                name="editorId"
                                value={newBook.editorId}
                                onChange={handleInputChange}
                                placeholder="Editor ID"
                                required
                            />
                            <button type="submit">Create Book</button>
                        </form>
                    </Popup>
                )}
            </div>
        </DashboardLayout>
    );
};

export default withAuth(ManageBuku);
