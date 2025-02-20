import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [],
  }),
  actions: {
    initializeCart() {
      if (typeof window !== 'undefined') { 
        const storedCart = localStorage.getItem('cartItems');
        if (storedCart) {
          this.cartItems = JSON.parse(storedCart);
        }
      }
    },
    addToCart(items) {
      this.cartItems = items.filter(item => item.quantity > 0);
      this.saveToLocalStorage();
    },
    clearCart() {
      this.cartItems = [];
      this.saveToLocalStorage();
      console.log("Carrinho limpo.");
    },
    getTotal() {
      const totalFromLocalStorage = this.cartItems.reduce((total, item) => {
        return total + item.price * item.quantity; 
      }, 0);
      
      return totalFromLocalStorage;
    },
    saveToLocalStorage() {
      if (typeof window !== 'undefined') { 
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      }
    },
  },
});
