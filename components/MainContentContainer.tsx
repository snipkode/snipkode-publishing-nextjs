import React from 'react';

interface MainContentContainerProps {
    title: string;
    buttonText: string;
    onButtonClick?: () => void;
    children: React.ReactNode;
}

const MainContentContainer: React.FC<MainContentContainerProps> = ({ title, buttonText, onButtonClick, children }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 w-full sm:relative sm:w-auto sm:rounded-lg sm:shadow-sm sm:p-6 sm:bg-white absolute top-0 left-0 right-0 bottom-0 sm:top-auto sm:left-auto sm:right-auto sm:bottom-auto overflow-y-auto mt-4 sm:mt-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex items-center">
                    <span className="material-icons mr-2">grid_view</span>
                    <h1 className="text-lg sm:text-xl font-semibold">{title}</h1>
                </div>
                <button onClick={onButtonClick} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center text-sm hover:bg-blue-700 transition-colors w-full sm:w-auto justify-center">
                    <span className="material-icons text-sm mr-1">add</span>
                    {buttonText}
                </button>
            </div>
            
            <div className="overflow-auto">
                {children}
            </div>
        </div>
    );
};

export default MainContentContainer;
