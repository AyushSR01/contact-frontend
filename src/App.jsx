import React, { useState, useEffect } from 'react'; 
import ContactForm from './components/form'; 
import ContactList from './components/contacts'; 
import SuccessMessage from './components/sucessmssge';
 import apiService from './services/api'; 
 import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [sortConfig, setSortConfig] = useState({ field: 'createdAt', order: 'desc' });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await apiService.getContacts();
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleAddContact = async (contactData) => {
    setIsLoading(true);
    try {
      const response = await apiService.createContact(contactData);
      setContacts(prev => [response.data, ...prev]);
      setSuccessMessage('Contact added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error adding contact:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;

    try {
      await apiService.deleteContact(id);
      setContacts(prev => prev.filter(c => c._id !== id));
      setSuccessMessage('Contact deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleSort = (field) => {
    setSortConfig(prev => ({
      field,
      order: prev.field === field && prev.order === 'asc' ? 'desc' : 'asc'
    }));
  };

  const sortedContacts = [...contacts].sort((a, b) => {
    const aVal = a[sortConfig.field];
    const bVal = b[sortConfig.field];

    if (sortConfig.field === 'createdAt') {
      return sortConfig.order === 'asc'
        ? new Date(aVal) - new Date(bVal)
        : new Date(bVal) - new Date(aVal);
    }

    const comparison = String(aVal).localeCompare(String(bVal));
    return sortConfig.order === 'asc' ? comparison : -comparison;
  });

  return (
    <div className=" bg-gray-950 text-gray-100 px-4 py-6">

      {/* Header */}
      <header className=" mx-auto mb-8 text-center ">
        <h1 className="text-3xl font-bold text-blue-500">
          Contact Management System
        </h1>
      </header>

      {/* Success Message */}
      {successMessage && (
        <SuccessMessage
          message={successMessage}
          onClose={() => setSuccessMessage('')}
        />
      )}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Form */}
        <section className="lg:col-span-1 bg-gray-900 p-6 rounded-xl shadow-md">
          <ContactForm onSubmit={handleAddContact} isLoading={isLoading} />
        </section>

        {/* Contact List */}
        <section className="lg:col-span-2 bg-gray-900 p-6 rounded-xl shadow-md">
          <ContactList
            contacts={sortedContacts}
            onDelete={handleDeleteContact}
            onSort={handleSort}
            sortConfig={sortConfig}
          />
        </section>

      </main>
    </div>
  );
}

export default App;
