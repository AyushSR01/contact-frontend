import React from 'react';
import { CheckCircle } from 'lucide-react';

const SuccessMessage = ({ message, onClose }) => (
    <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between animate-fade-in">
        <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <p className="text-green-800 font-medium">{message}</p>
        </div>
        <button onClick={onClose} className="text-green-600 hover:text-green-800">
            ×
        </button>
    </div>
);

export default SuccessMessage;