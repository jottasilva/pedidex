import axios from 'axios';
import { API_URL } from './apiService';

export const fetchOrderData = async () => {
    try {
        const response = await axios.get(`${API_URL}orders`);
        const orderData = response.data;
        return orderData;
    } catch (error) {
        console.error('Erro ao buscar estabelecimento:', error);
        throw error;
    }
    
};
