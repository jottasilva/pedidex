import axios from "axios";
import { API_URL } from "./apiService";
import { useClientStore } from "~/stores/orderData";
import { useCartStore } from "./cartStore";
export const order = async (data) => {
  const cStore = useClientStore();
  const store = useCartStore();

  const establishmentData = JSON.parse(localStorage.getItem('establishmentData')); 
  const orderdata = JSON.parse(localStorage.getItem("orderDataClient"));

  const orderItems = {
    establishment: establishmentData.id,
    items: data.map(item => ({
        name: item.name,
        establishment: item.establishment,
        price: item.price,
        quantity: item.quantity
    })),
    client_name: orderdata?.name || "Cliente não identificado",
    address:orderdata?.street +", "+orderdata.number+", "+ orderdata?.neighborhood +", "+ orderdata.cityState+", ("+orderdata?.deliveryNotes+")",
    payment: orderdata?.paymentMethod || "Não especificado",
    total: store.getTotal(),
    email: orderdata?.email || "Não especificado",
    order_number: orderdata?.order_number || "0000",
    observation: cStore.observation || "Nenhuma Observação encotrada...", 
    phone: orderdata?.phone || "Não especificado",
    cpf: orderdata?.cpf || "Cpf não informado",
};

  try {
    const response = await axios.post(`${API_URL}order`, orderItems, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar pedido:", error);
    throw error;
  }
};
