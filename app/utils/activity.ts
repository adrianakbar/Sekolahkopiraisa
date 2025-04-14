// services/activity.ts
import api from '../utils/api';

const ENDPOINT = '/api/v1/news';

// GET semua berita
export const fetchAllNews = async () => {
  const response = await api.get(ENDPOINT);
  return response.data;
};

// GET berita berdasarkan ID
export const fetchNewsById = async (id: number | string) => {
  const response = await api.get(`${ENDPOINT}/${id}`);
  return response.data;
};

// POST berita baru dengan media
export const createNews = async (formData: FormData) => {
  const response = await api.post(`${ENDPOINT}/post`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// UPDATE berita
export const updateNews = async (id: number, formData: FormData) => {
  const response = await api.put(`${ENDPOINT}/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// DELETE berita
export const deleteNews = async (id: number) => {
  const response = await api.delete(`${ENDPOINT}/${id}`);
  return response.data;
};
