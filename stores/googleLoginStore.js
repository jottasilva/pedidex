import { defineStore } from "pinia";

export const useGoogleLoginStore = defineStore("googleLogin", {
  state: () => ({
    email: "",
    name: "",
    picture: "",
    sub: "",
    isLogged:"",
  }),
  actions: {
    setLoginStore(data) {
      this.email = data.email;
      this.name = data.name;
      this.picture = data.picture;
      this.sub = data.sub;
      this.isLogged = data.isLogged;
      if (process.client) {
        localStorage.setItem("GoogleAuthStore", JSON.stringify(data));
      }
    },
    loadLoginStore() {
      if (process.client) {
        const data = localStorage.getItem("GoogleAuthStore");
        if (data) {
          const parsedData = JSON.parse(data);
          this.email = parsedData.email;
          this.name = parsedData.name;
          this.picture = parsedData.picture;
          this.sub = parsedData.sub;
          this.isLogged = parsedData.isLogged;
          return parsedData;
        }
      }
      return null;
    },
    logout() {
      this.email = "";
      this.name = "";
      this.picture = "";
      this.sub = "";
      this.isLogged = false;
      if (process.client) {
        localStorage.removeItem("GoogleAuthStore");
      }
    },
    isLogged() {
      if (process.client) {
        return !!localStorage.getItem("GoogleAuthStore");
      }
      return false;
    },
  },
});
