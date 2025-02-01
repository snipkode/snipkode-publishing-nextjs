/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface BreadcrumbProps {
    title: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ title }) => {
    const pathname = usePathname();

    useEffect(() => {
        document.title = title;
    }, [title]);

    const generateBreadcrumbs = () => {
        const pathArray = pathname.split('/').filter((path) => path);
        return pathArray.map((path, index) => {
            const href = '/' + pathArray.slice(0, index + 1).join('/');
            const formattedPath = path.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
            return (
                <li key={index} className="flex items-center">
                    <a href={href}>{formattedPath}</a>
                    {index < pathArray.length - 1 && (
                        <span className="material-icons text-gray-400 mx-2" style={{ fontSize: '16px' }}>chevron_right</span>
                    )}
                </li>
            );
        });
    };

    return (
        <nav className="text-gray-600 mb-4 text-sm" aria-label="Breadcrumb">
            <ol className="list-none p-0 inline-flex items-center">
                <li className="flex items-center">
                    <a href="/">Beranda</a>
                    <span className="material-icons text-gray-400 mx-2" style={{ fontSize: '16px' }}>chevron_right</span>
                </li>
                {generateBreadcrumbs()}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
