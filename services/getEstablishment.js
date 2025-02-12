import axios from 'axios';
import { API_URL } from './apiService';

export const fetchEstablishments = async (id) => {
    try {
        const response = await axios.get(`${API_URL}establishments/${id}`);
        return response.data; 
    } catch (error) {
        console.error('Erro ao buscar estabelecimento:', error);
        throw error; 
    }
};
