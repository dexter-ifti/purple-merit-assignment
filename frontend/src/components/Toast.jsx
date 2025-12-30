import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
    useEffect(() => {
        if (duration) {
            const timer = setTimeout(onClose, duration);
            return () => clearTimeout(timer);
        }
    }, [onClose, duration]);

    const config = {
        success: { cls: 'toast-success', icon: CheckCircle },
        error: { cls: 'toast-error', icon: AlertCircle },
        info: { cls: 'toast-info', icon: Info }
    };

    const { cls, icon: Icon } = config[type] || config.info;

    return (
        <div className={`toast ${cls} shadow-lg animate-slide-in`}>
            <Icon className="w-5 h-5 shrink-0" />
            <p className="flex-1 text-sm font-medium">{message}</p>
            <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors focus:outline-none"
            >
                <X className="w-5 h-5" />
            </button>
        </div>
    );
};

export default Toast;