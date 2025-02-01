import React from 'react';

interface SidebarProps {
    isCollapsed: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {
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
                            <a href="#" className="flex items-center p-3 bg-blue-800 rounded-lg transition-colors mx-2">
                                <span className="material-icons mr-3">dashboard</span>
                                <span className="text-sm">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-3 hover:bg-blue-800 rounded-lg transition-colors mx-2">
                                <span className="material-icons mr-3">business</span>
                                <span className="text-sm">Manage Penerbit</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-3 hover:bg-blue-800 rounded-lg transition-colors mx-2">
                                <span className="material-icons mr-3">menu_book</span>
                                <span className="text-sm">Manage Buku</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-3 hover:bg-blue-800 rounded-lg transition-colors mx-2">
                                <span className="material-icons mr-3">people</span>
                                <span className="text-sm">Manage Pengguna</span>
                            </a>
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
