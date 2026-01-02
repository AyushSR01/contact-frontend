import React, { useState } from 'react';
import { Users, Mail, Phone, MessageSquare } from 'lucide-react';
import Input from '../components/input';
import { validateField } from '../utils/validation';

const ContactForm = ({ onSubmit, isLoading }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (touched[name]) {
            setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
        }
    };

   

    const handleSubmit = () => {
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        onSubmit(formData);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setErrors({});
    };

    const isFormValid = !errors.name && !errors.email && !errors.phone &&
        formData.name && formData.email && formData.phone;

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Users className="h-6 w-6 text-center" />
                Add New Contact
            </h2>

            <Input className="text-black"
                label="Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
     
                error={ errors.name}
                icon={Users}
                placeholder="John Doe"
                required
            />

            <Input className="text-black"
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
               
                error={errors.email}
                icon={Mail}
                placeholder="john@example.com"
                required
            />

            <Input className="text-black"
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
              
                error={errors.phone}
                icon={Phone}
                placeholder="+1 234 567 8900"
                required
            />

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                </label>
                <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                        <MessageSquare className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Optional message..."
                        rows="4"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none text-black"
                    />
                </div>
            </div>

            <button
                onClick={handleSubmit}
                disabled={!isFormValid || isLoading}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition ${!isFormValid || isLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
                    }`}
            >
                {isLoading ? 'Adding Contact...' : 'Add Contact'}
            </button>
        </div>
    );
};

export default ContactForm;
