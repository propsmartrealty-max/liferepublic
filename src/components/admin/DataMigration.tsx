import React, { useState } from 'react';
import { Database, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from './../ui/Button';

export const DataMigration: React.FC = () => {
    return (
        <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
            <h2 className="text-xl font-bold font-serif mb-4 flex items-center gap-2">
                <Database className="text-accent" /> Data Migration (Cloudflare D1)
            </h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex gap-3">
                <AlertTriangle className="text-yellow-600 shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-yellow-800">
                    This tool was for migrating old Supabase project IDs. This feature is disabled as the database is now running on Cloudflare D1.
                </p>
            </div>
            <Button disabled>Migrate</Button>
        </div>
    );
};
