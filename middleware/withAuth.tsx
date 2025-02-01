import React, { FC } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth'; // Import the custom hook

const withAuth = (WrappedComponent: FC) => {
    const AuthComponent: FC = (props) => {
        const router = useRouter();
        const { isAuthenticated, loading } = useAuth(); // Use the custom hook

        if (loading) {
            return <div>Loading...</div>; // Show a loading state while checking authentication
        }

        if (!isAuthenticated) {
            router.push('/auth/login');
            return null;
        }

        return <WrappedComponent {...props} />;
    };

    return AuthComponent;
};

export default withAuth;