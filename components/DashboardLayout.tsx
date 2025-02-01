import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

import { ReactNode } from 'react';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    useEffect(() => {
        const updateSidebarState = () => {
            if (window.innerWidth < 768) {
                setIsSidebarCollapsed(true);
            } else {
                setIsSidebarCollapsed(false);
            }
        };

        updateSidebarState();
        window.addEventListener('resize', updateSidebarState);

        return () => {
            window.removeEventListener('resize', updateSidebarState);
        };
    }, []);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className="h-full flex bg-gray-100">
            <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
            <main className="flex-1">
                <Header toggleSidebar={toggleSidebar} />
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;
