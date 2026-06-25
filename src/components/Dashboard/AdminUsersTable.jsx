'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from '@gravity-ui/icons';
import { updateUserRole, deleteUser } from '@/lib/actions/users';

export default function AdminUsersTable({ users }) {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [pendingChange, setPendingChange] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const getUserId = (user) => user._id?.$oid || user.id;

    const initiateRoleChange = (userId, userName, newRole) => {
        setPendingChange({
            userId,
            userName,
            newRole,
        });
        setIsConfirmOpen(true);
    };

    const confirmRoleChange = async () => {
        if (!pendingChange) return;

        setIsUpdating(true);

        try {
            await updateUserRole(
                pendingChange.userId,
                pendingChange.newRole
            );
        } catch (error) {
            // console.error('Failed to update role:', error);
        } finally {
            setIsUpdating(false);
            setIsConfirmOpen(false);
            setPendingChange(null);
        }
    };

    const handleDelete = (userId, userName) => {
        setUserToDelete({
            userId,
            userName,
        });

        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!userToDelete) return;

        setIsDeleting(true);

        try {
            await deleteUser(userToDelete.userId);
        } catch (error) {
            // console.error('Failed to delete user:', error);
        } finally {
            setIsDeleting(false);
            setIsDeleteModalOpen(false);
            setUserToDelete(null);
        }
    };

    return (
        <div className="relative w-full">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">

                        {/* Header */}
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-gray-600">
                                <th className="px-6 py-4 text-left font-medium">
                                    Name
                                </th>

                                <th className="px-6 py-4 text-left font-medium">
                                    Email
                                </th>

                                <th className="px-6 py-4 text-left font-medium">
                                    Role
                                </th>

                                <th className="px-6 py-4 text-right font-medium">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        {/* Body */}
                        <tbody className="divide-y divide-gray-200">
                            {users.map((user) => {
                                const userId = getUserId(user);
                                const role = (user.role || 'reader').toLowerCase();

                                return (
                                    <tr
                                        key={userId}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        {/* Name */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm">
                                                    {user.name
                                                        ? user.name
                                                              .split(' ')
                                                              .map((word) => word[0])
                                                              .join('')
                                                              .toUpperCase()
                                                        : 'U'}
                                                </div>

                                                <span className="font-medium text-gray-900">
                                                    {user.name || 'Unknown User'}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Email */}
                                        <td className="px-6 py-4 text-gray-600">
                                            {user.email}
                                        </td>

                                        {/* Role */}
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-700">
                                                {role}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap items-center justify-end gap-2">

                                                {role !== 'reader' && (
                                                    <button
                                                        onClick={() =>
                                                            initiateRoleChange(
                                                                userId,
                                                                user.name,
                                                                'reader'
                                                            )
                                                        }
                                                        className="px-3 py-1.5 text-xs rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                                                    >
                                                        Reader
                                                    </button>
                                                )}

                                                {role !== 'writer' && (
                                                    <button
                                                        onClick={() =>
                                                            initiateRoleChange(
                                                                userId,
                                                                user.name,
                                                                'writer'
                                                            )
                                                        }
                                                        className="px-3 py-1.5 text-xs rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                                                    >
                                                        Writer
                                                    </button>
                                                )}

                                                {role !== 'admin' && (
                                                    <button
                                                        onClick={() =>
                                                            initiateRoleChange(
                                                                userId,
                                                                user.name,
                                                                'admin'
                                                            )
                                                        }
                                                        className="px-3 py-1.5 text-xs rounded-md bg-purple-100 text-purple-700 hover:bg-purple-200 transition"
                                                    >
                                                        Admin
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            userId,
                                                            user.name
                                                        )
                                                    }
                                                    className="px-3 py-1.5 text-xs rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 text-sm text-gray-500">
                    <p>Total Users: {users.length}</p>

                    <div className="flex items-center gap-2">
                        <button className="p-2 rounded hover:bg-gray-100">
                            <ChevronLeft width={16} height={16} />
                        </button>

                        <button className="w-8 h-8 rounded bg-blue-600 text-white font-medium">
                            1
                        </button>

                        <button className="p-2 rounded hover:bg-gray-100">
                            <ChevronRight width={16} height={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Role Change Modal */}
            {isConfirmOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-xl">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Confirm Role Change
                        </h3>

                        <p className="mt-3 text-sm text-gray-600">
                            Change role of{' '}
                            <span className="font-medium text-gray-900">
                                {pendingChange?.userName}
                            </span>{' '}
                            to{' '}
                            <span className="font-medium capitalize text-gray-900">
                                {pendingChange?.newRole}
                            </span>
                            ?
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                disabled={isUpdating}
                                onClick={() => {
                                    setIsConfirmOpen(false);
                                    setPendingChange(null);
                                }}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                            >
                                Cancel
                            </button>

                            <button
                                disabled={isUpdating}
                                onClick={confirmRoleChange}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                {isUpdating ? 'Updating...' : 'Confirm'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-xl">
                        <h3 className="text-lg font-semibold text-red-600">
                            Confirm Delete
                        </h3>

                        <p className="mt-3 text-sm text-gray-600">
                            Are you sure you want to delete{' '}
                            <span className="font-medium text-gray-900">
                                {userToDelete?.userName}
                            </span>
                            ? This action cannot be undone.
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                disabled={isDeleting}
                                onClick={() => {
                                    setIsDeleteModalOpen(false);
                                    setUserToDelete(null);
                                }}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                            >
                                Cancel
                            </button>

                            <button
                                disabled={isDeleting}
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                {isDeleting ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}