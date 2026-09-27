import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export const AdminSignup = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
                <h1 className="text-2xl font-serif font-bold text-primary mb-4">Admin Signup Disabled</h1>
                <p className="text-gray-500 text-sm mb-6">Signup is disabled due to Cloudflare D1 migration.</p>
                <Link to="/admin/login">
                    <Button className="w-full justify-center">Go to Login</Button>
                </Link>
            </div>
        </div>
    );
};
