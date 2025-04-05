// ~/stores/modal.js
import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
  state: () => ({
    modal: false,
    modalData: null,
  }),
  actions: {
    openModal(data) {
      this.modal = true;
      this.modalData = data;
    },
    closeModal() {
      this.modal = false;
      this.modalData = null;
    },
  },
});
