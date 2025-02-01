import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useBreakpoint from '@/hooks/useBreakpoint';

interface SidebarProps {
    isCollapsed: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {
    const pathname = usePathname();
    const breakpoint = useBreakpoint();
    const isMobile = breakpoint === 'mobile';
    const isTablet = breakpoint === 'tablet';
    const isDesktop = breakpoint === 'desktop';

    return (
        <aside id="sidebar" className={`sidebar fixed md:relative w-20 lg:w-64 h-screen bg-[#1a1464] text-white z-30 transform ${isCollapsed ? '-translate-x-full md:translate-x-0' : 'translate-x-0'} transition-transform duration-300`}>
            <div className="flex flex-col h-full">
                <div className="p-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold px-2 lg:block">{isMobile || isTablet ? 'SP' : 'Snipkode Publishing'}</h1>
                    {isDesktop && (
                        <button className="text-white focus:outline-none md:hidden" onClick={toggleSidebar}>
                            <span className="material-icons">close</span>
                        </button>
                    )}
                </div>
                <nav>
                    <ul className="space-y-2">
                        <li className="relative group">
                            <Link href="/dashboard" className={`flex items-center justify-center lg:justify-start p-3 rounded-lg transition-colors mx-2 ${pathname === '/dashboard' ? 'bg-blue-800' : 'hover:bg-blue-800'}`}>
                                <span className="material-icons lg:mr-3">dashboard</span>
                                <span className="text-sm hidden lg:block whitespace-nowrap">Dashboard</span>
                            </Link>
                        </li>
                        <li className="relative group">
                            <Link href="/manage-penerbit" className={`flex items-center justify-center lg:justify-start p-3 rounded-lg transition-colors mx-2 ${pathname === '/manage-penerbit' ? 'bg-blue-800' : 'hover:bg-blue-800'}`}>
                                <span className="material-icons lg:mr-3">business</span>
                                <span className="text-sm hidden lg:block whitespace-nowrap">Manage Penerbit</span>
                            </Link>
                        </li>
                        <li className="relative group">
                            <Link href="/manage-buku" className={`flex items-center justify-center lg:justify-start p-3 rounded-lg transition-colors mx-2 ${pathname === '/manage-buku' ? 'bg-blue-800' : 'hover:bg-blue-800'}`}>
                                <span className="material-icons lg:mr-3">menu_book</span>
                                <span className="text-sm hidden lg:block whitespace-nowrap">Manage Buku</span>
                            </Link>
                        </li>
                        <li className="relative group">
                            <Link href="/manage-pengguna" className={`flex items-center justify-center lg:justify-start p-3 rounded-lg transition-colors mx-2 ${pathname === '/manage-pengguna' ? 'bg-blue-800' : 'hover:bg-blue-800'}`}>
                                <span className="material-icons lg:mr-3">people</span>
                                <span className="text-sm hidden lg:block whitespace-nowrap">Manage Pengguna</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="mt-auto p-4 text-sm hidden lg:block">
                    E-book Digital Platform
                </div>
                {(isMobile || isTablet) && (
                    <button className="text-white focus:outline-none md:hidden p-4" onClick={toggleSidebar}>
                        <span className="material-icons">close</span>
                    </button>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
