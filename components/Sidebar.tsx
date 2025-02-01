import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
    isCollapsed: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {
    const pathname = usePathname();

    return (
        <aside id="sidebar" className={`sidebar fixed md:relative w-72 lg:w-64 h-screen bg-[#1a1464] text-white z-30 transform ${isCollapsed ? '-translate-x-full md:translate-x-0' : 'translate-x-0'} transition-transform duration-300`}>
            <div className="flex flex-col h-full">
                <div className="p-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold px-2">Snipkode Publishing</h1>
                    <button className="text-white focus:outline-none md:hidden" onClick={toggleSidebar}>
                        <span className="material-icons">close</span>
                    </button>
                </div>
                <nav>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/dashboard" className={`flex items-center p-3 rounded-lg transition-colors mx-2 ${pathname === '/dashboard' ? 'bg-blue-800' : 'hover:bg-blue-800'}`}>
                                <span className="material-icons mr-3">dashboard</span>
                                <span className="text-sm">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/manage-penerbit" className={`flex items-center p-3 rounded-lg transition-colors mx-2 ${pathname === '/manage-penerbit' ? 'bg-blue-800' : 'hover:bg-blue-800'}`}>
                                <span className="material-icons mr-3">business</span>
                                <span className="text-sm">Manage Penerbit</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/manage-buku" className={`flex items-center p-3 rounded-lg transition-colors mx-2 ${pathname === '/manage-buku' ? 'bg-blue-800' : 'hover:bg-blue-800'}`}>
                                <span className="material-icons mr-3">menu_book</span>
                                <span className="text-sm">Manage Buku</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/manage-pengguna" className={`flex items-center p-3 rounded-lg transition-colors mx-2 ${pathname === '/manage-pengguna' ? 'bg-blue-800' : 'hover:bg-blue-800'}`}>
                                <span className="material-icons mr-3">people</span>
                                <span className="text-sm">Manage Pengguna</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="mt-auto p-4 text-sm">
                    E-book Digital Platform
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
