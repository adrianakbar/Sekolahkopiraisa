// services/activity.ts
import api from '../utils/api';

const ENDPOINT = '/api/v1/news';

// GET semua berita
export const fetchAllActivity = async () => {
  const response = await api.get(ENDPOINT);
  return response.data;
};

// GET berita berdasarkan ID
export const fetchActivityById = async (id: number | string) => {
  const response = await api.get(`${ENDPOINT}/${id}`);
  return response.data;
};

// POST berita baru dengan media
export const createActivity = async (formData: FormData) => {
  const response = await api.post(`${ENDPOINT}/post`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// UPDATE berita
export const updateActivity = async (id: number, formData: FormData) => {
  const response = await api.put(`${ENDPOINT}/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// DELETE berita
export const deleteActivity = async (id: number) => {
  const response = await api.delete(`${ENDPOINT}/${id}`);
  return response.data;
};
