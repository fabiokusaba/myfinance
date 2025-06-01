// services/api.js
import axios from 'axios';
import type { Finance } from '../models/Finance';

const api = axios.create({
  baseURL: 'http://localhost:8080/finances',
  headers: {
    'Content-Type': 'application/json',
  }
});

export const financeService = {
  getFinances: () => api.get('/finances'),
  createFinance: (finance: Finance) => api.post('/finances', finance),
  updateFinance: (id: number, finance: Finance) => api.put(`/finances/${id}`, finance),
  deleteFinance: (id: number) => api.delete(`/finances/${id}`)
};

export default api;