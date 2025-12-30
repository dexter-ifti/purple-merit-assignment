import React from 'react';

const Loading = ({ size = 'md', text = '' }) => {
    const sizeClasses = {
        sm: 'h-6 w-6 border-2',
        md: 'h-12 w-12 border-2',
        lg: 'h-16 w-16 border-3'
    };

    return (
        <div className="flex flex-col items-center justify-center py-12">
            <div className={`animate-spin rounded-full ${sizeClasses[size]} border-blue-600 border-t-transparent`}></div>
            {text && <p className="text-gray-600 mt-4 text-sm">{text}</p>}
        </div>
    );
};

export default Loading;