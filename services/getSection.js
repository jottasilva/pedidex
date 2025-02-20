import axios from 'axios';
import { API_URL } from './apiService';
export const fetchSection = async (id) => {
    try {
        const response = await axios.get(`${API_URL}sections`);
        const SectionsData = response.data;
        return SectionsData;
    } catch (error) {
        console.error('Erro ao buscar estabelecimento:', error);
        throw error;
    }
};
