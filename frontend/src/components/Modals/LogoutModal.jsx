// Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
                <p>Are you sure you want to log out?</p>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={onClose}
                        className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
