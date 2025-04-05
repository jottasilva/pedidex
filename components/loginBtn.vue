<script setup lang="ts">
import { useGoogleLoginStore } from "~/stores/googleLoginStore";
import { useModalLogin } from "~/stores/loginModal";
import {
  GoogleSignInButton,
  type CredentialResponse,
} from "vue3-google-signin";

const authStore = useGoogleLoginStore();
const authStoreData = authStore.loadLoginStore(); 
const useModal = useModalLogin();

const handleLoginSuccess = (response: CredentialResponse) => {
  const { credential } = response;
  if (credential) {
    const userData = JSON.parse(atob(credential.split(".")[1]));

    authStore.setLoginStore({
      email: userData.email,
      name: userData.name,
      picture: userData.picture,
      sub: userData.sub,
      isLogged: true
    });
    useModal.closeLoginModal();
    authStore.loadLoginStore();
  } else {
    console.error("Credential não encontrado");
  }
};

const handleLoginError = () => {
  console.error("Login failed");
};

const handleLogout = () => {
  authStore.logout();
};
</script>

<template>
  <div>
    <GoogleSignInButton
      @success="handleLoginSuccess"
      @error="handleLoginError"
    ></GoogleSignInButton>

  </div>
</template>

<style scoped>
  div{
    display: flex;
    align-items: center;
    align-self: center;
  }
</style>