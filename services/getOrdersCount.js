import axios from 'axios';
import { API_URL } from './apiService';

export const countOrders = async (id) => {
    try {
        const response = await axios.get(`${API_URL}orders/count/${id}`);
        const count = response.data;
        return count;
    } catch (error) {
        console.error('Erro ao buscar Pedidos... ', error);
        throw error;
    }
    
};