// components/LogoutModal.js
import React from 'react';

const LogoutModal = ({ isOpen, onClose, onLogout }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg">
                <h2 className="text-lg font-semibold">Confirm Logout</h2>
                <p className="mt-2">Are you sure you want to log out?</p>
                <div className="mt-4 flex justify-end">
                    <button className="mr-2 px-4 py-2 bg-gray-300 rounded" onClick={onClose}>Cancel</button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={onLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;
