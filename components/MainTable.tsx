"use client";

import React, { useState } from 'react';
import '@/styles/MainTable.css';

interface Column {
    header: string;
    accessor: string | ((row: any, index: number) => any);
    className?: string;
}

interface MainTableProps {
    data: any[];
    columns: Column[];
    itemsPerPage?: number;
}

const MainTable: React.FC<MainTableProps> = ({ data, columns, itemsPerPage = 10 }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = data.filter(row =>
        columns.some(column => {
            const value = typeof column.accessor === 'function' ? column.accessor(row, 0) : row[column.accessor];
            return value.toString().toLowerCase().includes(searchTerm.toLowerCase());
        })
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <div className="text-sm">Semua Data ({filteredData.length})</div>
                <div className="w-full sm:w-auto">
                    <input
                        type="text"
                        placeholder="Cari..."
                        className="border rounded-lg px-4 py-2 w-full text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="table-responsive max-h-96 overflow-y-auto overflow-x-auto">
                <table className="w-full border-collapse min-w-[600px]">
                    <thead>
                        <tr className="bg-gray-50">
                            {columns.map((column, index) => (
                                <th key={index} className={`border px-4 py-2 text-left text-sm font-medium whitespace-nowrap ${column.className || ''}`}>
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="fade">
                        {currentData.length > 0 ? (
                            currentData.map((row, rowIndex) => (
                                <tr key={row.id}>
                                    {columns.map((column, colIndex) => (
                                        <td key={colIndex} className={`border px-4 py-2 text-sm whitespace-nowrap ${column.className || ''}`}>
                                            {typeof column.accessor === 'function' ? column.accessor(row, rowIndex) : row[column.accessor]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="border px-4 py-8 text-center text-gray-500 text-sm">
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-6">
                <nav className="flex flex-wrap items-center justify-center gap-1">
                    <button onClick={() => handlePageChange(currentPage - 1)} className="px-3 py-1 rounded border text-sm hover:bg-gray-50 transition-colors">&laquo;</button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-3 py-1 rounded border text-sm ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'hover:bg-gray-50 transition-colors'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button onClick={() => handlePageChange(currentPage + 1)} className="px-3 py-1 rounded border text-sm hover:bg-gray-50 transition-colors">&raquo;</button>
                </nav>
            </div>
        </>
    );
};

export default MainTable;
