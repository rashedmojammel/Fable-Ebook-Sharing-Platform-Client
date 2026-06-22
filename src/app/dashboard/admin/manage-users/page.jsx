import AdminUsersTable from '@/components/Dashboard/AdminUsersTable';
import { getUsersList } from '@/lib/api/user';
import React from 'react';

export default async function AdminUsersPage() {
    const data = await getUsersList();
    const users = data?.users || [];

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">
                            User Management
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Manage all readers, writers and administrators
                        </p>
                    </div>

                    <div className="px-4 py-2 rounded-lg bg-white border border-gray-200 shadow-sm">
                        <span className="text-sm font-medium text-gray-700">
                            Total Users: {users.length}
                        </span>
                    </div>
                </div>

                {/* Users Table */}
                <AdminUsersTable users={users} />
            </div>
        </div>
    );
}