import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalLogin = defineStore("modalLogin", () => {
  const loginModal = ref(false);

  function openLoginModal() {
    loginModal.value = true;
  }

  function closeLoginModal() {
    loginModal.value = false;
  }

  function toggleLoginModal() {
    loginModal.value = !loginModal.value;
  }

  return { loginModal, openLoginModal, closeLoginModal, toggleLoginModal };
});
