const API_BASE = 'https://contact-management-api-0upn.onrender.com/api/contacts' || 'http://localhost:5000/api/contacts';

const apiService = {
  getContacts: async () => {
    const res = await fetch(API_BASE);
    return res.json();
  },

  createContact: async (contact) => {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact),
    });
    return res.json();
  },

  updateContact: async (id, data) => {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  deleteContact: async (id) => {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
    });
    return res.json();
  },
};

export default apiService;
