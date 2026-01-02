import React from 'react';
import { Users, Trash2 } from 'lucide-react';

const ContactList = ({ contacts, onDelete, onSort, sortConfig }) => {
    if (contacts.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No contacts yet. Add your first contact!</p>
            </div>
        );
    }

    const SortButton = ({ field, children }) => (
        <button
            onClick={() => onSort(field)}
            className="font-semibold hover:text-blue-600 transition flex items-center gap-1"
        >
            {children}
            {sortConfig.field === field && (
                <span className="text-xs">{sortConfig.order === 'asc' ? '↑' : '↓'}</span>
            )}
        </button>
    );

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <Users className="h-6 w-6" />
                    Contact List ({contacts.length})
                </h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-gray-600">
                                <SortButton field="name">Name</SortButton>
                            </th>
                            <th className="px-6 py-3 text-left text-gray-600">
                                 <span>Email</span>
                            </th>
                            <th className="px-6 py-3 text-left text-gray-600">Phone</th>
                            <th className="px-6 py-3 text-left text-gray-600">Message</th>
                            <th className="px-6 py-3 text-left text-gray-600">
                                <span>Date</span>
                            </th>
                            <th className="px-6 py-3 text-center text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {contacts.map((contact) => (
                            <tr key={contact._id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-medium text-gray-900">{contact.name}</td>
                                <td className="px-6 py-4 text-gray-600">{contact.email}</td>
                                <td className="px-6 py-4 text-gray-600">{contact.phone}</td>
                                <td className="px-6 py-4 text-gray-600">
                                    {contact.message ? (
                                        <span className="text-sm">{contact.message.substring(0, 30)}...</span>
                                    ) : (
                                        <span className="text-gray-400 italic">No message</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-gray-600 text-sm">
                                    {new Date(contact.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button
                                        onClick={() => onDelete(contact._id)}
                                        className="text-red-600 hover:text-red-800 transition p-2 rounded-lg hover:bg-red-50"
                                        title="Delete contact"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContactList;