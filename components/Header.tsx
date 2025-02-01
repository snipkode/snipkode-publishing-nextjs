import React, { useState } from 'react';
import useUserCurrent from '@/hooks/useUserCurrent';
import { supabase } from '@/utils/supabaseClient';

interface HeaderProps {
    toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    const { user, loading } = useUserCurrent();
    const [showConfirm, setShowConfirm] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await supabase.auth.signOut();
        // Optionally, you can redirect the user to the login page or show a message
    };

    const confirmLogout = () => {
        setShowConfirm(true);
    };

    const cancelLogout = () => {
        setShowConfirm(false);
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-20">
            <div className="flex items-center md:hidden">
                <button id="menuToggle" className="text-gray-600 focus:outline-none" onClick={toggleSidebar}>
                    <span className="material-icons">menu</span>
                </button>
            </div>
            <div className="flex items-center relative ml-auto pointer" onClick={toggleDropdown}>
                <span className="mr-2 text-sm">{loading ? 'Loading...' : user?.email}</span>
                <button className="material-icons focus:outline-none btn-user">account_circle</button>
            </div>
            {dropdownVisible && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border rounded-lg shadow-lg py-2">
                    <button
                        onClick={() => {/* Navigate to profile */ }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                        <span className="material-icons mr-2">person</span>
                        Profile
                    </button>
                    <button
                        onClick={() => {/* Navigate to settings */ }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                        <span className="material-icons mr-2">settings</span>
                        Settings
                    </button>
                    <button
                        onClick={confirmLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                        <span className="material-icons mr-2">logout</span>
                        Logout
                    </button>
                </div>
            )}
            {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <div className="flex items-center mb-4">
                            <span className="material-icons text-yellow-500 mr-2">warning</span>
                            <h2 className="text-lg font-semibold">Confirm Logout</h2>
                        </div>
                        <p className="mb-6">Are you sure you want to logout?</p>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={cancelLogout}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center"
                            >
                                <span className="material-icons mr-2">logout</span>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
