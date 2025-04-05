import { defineStore } from 'pinia';

export const useClientStore = defineStore('client', {
  state: () => ({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    street: '',
    number: '',
    address:'',
    observation:'',
    neighborhood: '',
    order_number:'',
    cityState: '',
    deliveryNotes: '',
    paymentMethod: '',
    change: ''
  }),
  actions: {
    setClientData(data) {
      const savedData = JSON.parse(localStorage.getItem("orderDataClient"));
      if (!savedData || JSON.stringify(savedData) !== JSON.stringify(data)) {
          this.name = data.name;
          this.email = data.email;
          this.phone = data.phone;
          this.cpf = data.cpf;
          this.street = data.addressName;
          this.number = data.number;
          this.neighborhood = data.AddressNeighborhood;
          this.cityState = data.AddressCityUf;
          this.observation = data.observation;
          this.deliveryNotes = data.deliveryNotes;
          this.order_number = data.order_number;
          this.paymentMethod = data.paymentMethod;
          this.change = data.change;
          this.table = data.table_number;
          localStorage.setItem("orderDataClient", JSON.stringify(data));
      }

  },
  },
  getters: {
    clientData(state) {
      return {
        name: state.name,
        email: state.email,
        phone: state.phone,
        cpf: state.cpf,
        address: state.address,
        observation: state.observation,
        deliveryNotes : state.deliveryNotes,
        paymentMethod : state.paymentMethod,
        table : state.table,
        change : state.change,
      };
    },
    fullName(state) {
      return `${state.name}`;
    },
  
  }
});
