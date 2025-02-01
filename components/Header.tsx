import React from 'react';

interface HeaderProps {
    toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    return (
        <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-20">
            <div className="flex items-center md:hidden">
                <button id="menuToggle" className="text-gray-600 focus:outline-none" onClick={toggleSidebar}>
                    <span className="material-icons">menu</span>
                </button>
            </div>
            <div className="flex items-center ml-auto">
                <span className="mr-2 text-sm">Super Administrator</span>
                <span className="material-icons">account_circle</span>
            </div>
        </header>
    );
};

export default Header;
