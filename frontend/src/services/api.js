import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getUserStats = async (handle) => {
  const response = await api.get(`/users/${handle}`);
  return response.data;
};

export const getRatingHistory = async (handle) => {
  const response = await api.get(`/users/${handle}/rating-history`);
  return response.data;
};

export const getProblemStats = async (handle) => {
  const response = await api.get(`/users/${handle}/problem-stats`);
  return response.data;
};

export const getSubmissions = async (handle) => {
  const response = await api.get(`/users/${handle}/submissions`);
  return response.data;
};

export default api;
