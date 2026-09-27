import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('lr_admin_token');
            setIsAuthenticated(!!token);
        };

        checkAuth();
        
        // Listen to storage events for cross-tab sync
        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    if (isAuthenticated === null) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};
