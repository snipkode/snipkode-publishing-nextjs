import React from 'react';

const PublisherTable: React.FC<{ publishers: any[] }> = ({ publishers }) => {
    return (
        <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <div className="text-sm">Semua Penerbit ({publishers.length})</div>
                <div className="w-full sm:w-auto">
                    <input type="text" placeholder="Cari..." className="border rounded-lg px-4 py-2 w-full text-sm" />
                </div>
            </div>

            <div className="table-responsive">
                <table className="w-full border-collapse min-w-[800px]">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="border px-4 py-2 text-left text-sm font-medium">No</th>
                            <th className="border px-4 py-2 text-left text-sm font-medium">Nama Penerbit</th>
                            <th className="border px-4 py-2 text-left text-sm font-medium">Published</th>
                            <th className="border px-4 py-2 text-left text-sm font-medium">Tanggal Dibuat</th>
                            <th className="border px-4 py-2 text-left text-sm font-medium">Dibuat Oleh</th>
                            <th className="border px-4 py-2 text-center text-sm font-medium w-32">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {publishers.length > 0 ? (
                            publishers.map((publisher, index) => (
                                <tr key={publisher.id}>
                                    <td className="border px-4 py-2 text-sm">{index + 1}</td>
                                    <td className="border px-4 py-2 text-sm">{publisher.name}</td>
                                    <td className="border px-4 py-2 text-sm">{publisher.published ? 'Yes' : 'No'}</td>
                                    <td className="border px-4 py-2 text-sm">{new Date(publisher.created_at).toLocaleDateString()}</td>
                                    <td className="border px-4 py-2 text-sm">{publisher.created_by}</td>
                                    <td className="border px-4 py-2 text-center text-sm">{publisher.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="border px-4 py-8 text-center text-gray-500 text-sm">
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-6">
                <nav className="flex flex-wrap items-center justify-center gap-1">
                    <button className="px-3 py-1 rounded border text-sm hover:bg-gray-50 transition-colors">&laquo;</button>
                    <button className="px-3 py-1 rounded border bg-blue-600 text-white text-sm">1</button>
                    <button className="px-3 py-1 rounded border text-sm hover:bg-gray-50 transition-colors">2</button>
                    <button className="px-3 py-1 rounded border text-sm hover:bg-gray-50 transition-colors">3</button>
                    <button className="px-3 py-1 rounded border text-sm hover:bg-gray-50 transition-colors">4</button>
                    <button className="px-3 py-1 rounded border text-sm hover:bg-gray-50 transition-colors">5</button>
                    <button className="px-3 py-1 rounded border text-sm hover:bg-gray-50 transition-colors">&raquo;</button>
                </nav>
            </div>
        </>
    );
};

export default PublisherTable;
