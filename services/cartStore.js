import { defineStore } from "pinia";
import { order } from "../services/sendCommand";
export const useCartStore = defineStore("cart", {
  state: () => ({
    cartItems: [],
    orderNumber: null,
    orderStatus: null,
  }),
  actions: {
    initializeCart() {
      if (typeof window !== "undefined") {
        const storedOrderNumber = localStorage.getItem("orderNumber");
        if (storedOrderNumber) {
          this.orderNumber = storedOrderNumber;
        } else {
          this.orderNumber = Date.now();
          localStorage.setItem("orderNumber", this.orderNumber);
        }

        const storedCart = localStorage.getItem("cartItems");
        if (storedCart) {
          this.cartItems = JSON.parse(storedCart);
        }
      }
    },
    generateOrderNumber() {
      this.orderNumber = Date.now();
      localStorage.setItem("orderNumber", this.orderNumber);
    },
    addToCart(items) {
      this.cartItems = items.filter((item) => item.quantity > 0);
      this.saveToLocalStorage();
    },
    clearCart() {
      this.cartItems = [];
      this.generateOrderNumber();
      this.saveToLocalStorage();
    },
    getTotal() {
      const totalFromLocalStorage = this.cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
      return totalFromLocalStorage;
    },

    async newOrder() {
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

      if (cartItems.length === 0) {
        console.log("Nenhum pedido encontrado.");
        this.orderStatus = "false";
        return;
      }
      try {
        if (await order(cartItems)) {
          this.orderStatus = "true";
          this.resetAllQuantities();
          this.generateOrderNumber();
        }
      } catch (error) {
        console.error("Erro ao enviar pedido:", error);
        this.orderStatus = "false";
      }
    },
    getAllCartItens() {
      return this.cartItems;
    },
    saveToLocalStorage() {
      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
      }
    },
    resetAllQuantities() {
      this.cartItems.forEach((item) => {
        item.quantity = 0;
      });
      this.clearCart();
    },
    getOrderNumber() {
      return this.orderNumber;
    },
  },
});
