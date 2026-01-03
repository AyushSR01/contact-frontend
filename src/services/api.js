const API_BASE = 'http://localhost:5000/api/contacts';

const handleResponse = async (res) => {
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'API Error');
  }

  return data;
};

const apiService = {
  getContacts: async () => {
    const res = await fetch(API_BASE);
    return handleResponse(res);
  },

  createContact: async (contact) => {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact),
    });
    return handleResponse(res);
  },

  updateContact: async (id, data) => {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  deleteContact: async (id) => {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(res);
  },
};

export default apiService;
