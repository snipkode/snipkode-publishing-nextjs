import React, { FC, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth'; // Import the custom hook

const withAuth = (WrappedComponent: FC) => {
    const AuthComponent: FC = (props) => {
        const router = useRouter();
        const { isAuthenticated, loading } = useAuth(); // Use the custom hook

        useEffect(() => {
            if (!loading && !isAuthenticated) {
                router.push('/auth/login');
            }
        }, [loading, isAuthenticated, router]);

        return <WrappedComponent {...props} />;
    };

    return AuthComponent;
};

export default withAuth;