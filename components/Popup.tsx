"use client";

import React, { useState } from 'react';

interface PopupProps {
    children: React.ReactNode;
    title: string;
    onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ children, title, onClose }) => {
    const [isMaximized, setIsMaximized] = useState(false);

    const toggleMaximize = () => {
        setIsMaximized(!isMaximized);
    };

    return (
        <div className={`fixed z-120 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg transition-all duration-300 ${isMaximized ? 'w-full h-full' : 'w-96'}`}>
            <div className="flex justify-between items-center p-4 bg-gray-100 border-b rounded-t-lg">
                <h2 className="text-lg font-semibold">{title}</h2>
                <div className="flex space-x-2">
                    <button onClick={toggleMaximize} title={isMaximized ? 'Restore' : 'Maximize'} className="p-1 rounded-full hover:bg-gray-200">
                        <span className="material-icons">{isMaximized ? 'fullscreen_exit' : 'fullscreen'}</span>
                    </button>
                    <button onClick={onClose} title="Close" className="p-1 rounded-full hover:bg-gray-200">
                        <span className="material-icons">close</span>
                    </button>
                </div>
            </div>
            <div className="p-4">{children}</div>
        </div>
    );
};

export default Popup;
