import { defineStore } from 'pinia';

export const useEstablishmentStore = defineStore('establishment', {
  state: () => ({
    establishment: null, 
    error: null, 
    isLoading: false, 
  }),
  actions: {
    async loadEstablishment(id) {
      this.isLoading = true;
      this.error = null;
      try {
  
        const data = await fetchEstablishments(id); 
        this.setEstablishment(data); 
      } catch (err) {
        this.error = 'Erro ao carregar Estabelecimento';
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
    setEstablishment(newEstablishment) {
      this.establishment = newEstablishment; 
    },
    getEstablishment() {
      return this.establishment; 
    },
    clearStore() {
      this.establishment = null; 
      this.error = null; 
    },
  },
});
