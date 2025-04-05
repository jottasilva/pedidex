import axios from 'axios';
import { API_URL } from './apiService';

export const updateOrder = async (id,status) => {
    const data = {
        "status": status
    };
    try {
        const response = await axios.put(`${API_URL}edit_order/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar pedido:', error);
        throw error;
    }
};
