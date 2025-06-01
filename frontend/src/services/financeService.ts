// src/services/financeService.ts
import api from './api';
import type { Finance } from '../models/Finance';

export const financeService = {
  getAll: async (): Promise<Finance[]> => {
    try {
      const response = await api.get('http://localhost:8080/finances');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar finanças:', error);
      throw error;
    }
  },

  getOne: async (id: number): Promise<Finance> => {
    try {
      const response = await api.get(`http://localhost:8080/finances/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar finança ${id}:`, error);
      throw error;
    }
  },

  create: async (data: Finance): Promise<Finance> => {
    try {
      const response = await api.post('http://localhost:8080/finances', data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar finança:', error);
      throw error;
    }
  },

  update: async (id: number, data: Finance): Promise<Finance> => {
    try {
      const response = await api.put(`http://localhost:8080/finances/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar finança ${id}:`, error);
      throw error;
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      await api.delete(`http://localhost:8080/finances/${id}`);
    } catch (error) {
      console.error(`Erro ao deletar finança ${id}:`, error);
      throw error;
    }
  },
};