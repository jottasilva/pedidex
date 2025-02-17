import axios from 'axios';
import { API_URL } from './apiService';
export const fetchMenu = async (id) => {
    try {
        const response = await axios.get(`${API_URL}product/${id}`);
        const ProductsData = response.data;
        localStorage.setItem('establishment_menuData', JSON.stringify(ProductsData));
        return ProductsData;
    } catch (error) {
        console.error('Erro ao buscar estabelecimento:', error);
        throw error;
    }
};
