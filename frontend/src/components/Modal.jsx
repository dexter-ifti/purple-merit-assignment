import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', cancelText = 'Cancel', type = 'default' }) => {
    if (!isOpen) return null;

    const confirmButtonClass = type === 'danger' ? 'btn-danger' : 'btn-primary';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-slide-up">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <p className="text-gray-600 mb-6">{message}</p>

                <div className="modal-actions">
                    <button onClick={onClose} className="btn btn-secondary">
                        {cancelText}
                    </button>
                    <button onClick={onConfirm} className={`btn ${confirmButtonClass}`}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;