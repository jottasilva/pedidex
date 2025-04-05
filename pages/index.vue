<template>
    <div id="template">
        <div id="overlay" v-if="establishment.length < 1">
            <DotLottieVue style="height: 500px; width: 500px" autoplay loop
                src="https://lottie.host/946c12f9-f519-47f6-ba7a-e80de236c2bc/iDE8hvEJ2h.lottie" />
        </div>
        <header>
            <nav>
                <div id="navbar">
                    <section class="establishment">
                        <h2>
                            {{ establishment.name }}
                        </h2>
                        <span>{{ establishment.operation }}</span>
                    </section>
                    <NuxtPage />
                    <section class="menu">
                        <ul>
                            
                            <li @click="orderCall">
                                CHAMAR ATENDIMENTO</li>
                                <li @click="abrirModal">COMANDA</li>


                        </ul>
                        <div class="total">
                            <span>total dos pedidos</span>
                            <h3>{{ formattedTotal }}</h3>
                        </div>
                    </section>
                </div>
            </nav>
            <div id="container">
                <div id="logo" />
                <div id="search">
                    <section class="search"></section>
                    <form action="">
                        <input @input="updateSearchQuery" v-model="searchStore.searchQuery" type="text"
                            placeholder="faça uma pesquisa">
                    </form>
                </div>
            </div>
        </header>
        <article v-if="filteredSlides.length > 0" id="middle">
            <section class="promo-slide">
                <h1>NOSSAS PROMOÇÕES</h1>
            </section>
            <div id="slideBox">
                <Carousel v-bind="config">
                    <Slide v-for="product in filteredSlides" :key="product.id">
                        <PromoCard :title="product.name" :description="product.description"
                            :price=parseFloat(product.price) :bg="product.image" :product="product" />
                    </Slide>
                    <template #addons>
                        <Pagination />
                    </template>
                </Carousel>
            </div>
        </article>
        <article id="menu-itens">
            <menu-item :uuid="establishment.id" />
        </article>

        <footer-component />
        <modal-menu v-if="modalStore.modal" />
        <Toast position="top-left" group="bl" />
        <Dialog :visible=loginModal.loginModal modal header="Faça login Para continuar" :closable="false" >
           <div style="display: flex; justify-content: center; align-items: center; flex-direction: column; gap: 20px;padding: 10px;">
            <LoginBtn/>
            <div>
                <Button type="button" label="Cancelar" severity="secondary" @click="loginModal.closeLoginModal"></Button>
            </div>
           </div>
        </Dialog>
    </div>

</template>

<script setup>
import { useModalStore } from '~/stores/modal'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import { Carousel, Slide, Pagination } from 'vue3-carousel';
import { fetchEstablishments } from '~/services/getEstablishment';
import { fetchMenu } from '~/services/getMenu'
import { API_URL } from '~/services/apiService';
import { useRoute } from 'vue-router'
import { useEstablishmentStore } from '~/services/establishmentStore';
import { useCartStore } from '~/services/cartStore';
import { useSearchStore } from '~/services/searchService';
import webSocketService from '~/services/websocket_client';
import { useGoogleLoginStore } from "~/stores/googleLoginStore";
import { useModalLogin } from '~/stores/loginModal';
import { useClientStore } from '~/stores/orderData';
const searchStore = useSearchStore();
const store = useEstablishmentStore();
const cartStore = useCartStore();
const route = useRoute();
const page = computed(() => route.query.p);
const table_number = computed(() => route.query.t);
const toast = useToast();
const total = computed(() => cartStore.getTotal());
const establishment = ref([]);
const googleLoginStore = useGoogleLoginStore();
const slide = ref([]);
const loading = ref(false);
const messages = [];
const error = ref(null);
const router = useRouter();
const loginModal = useModalLogin();
const modalStore = useModalStore();
const verifyPage = () => {
    return router.push('/welcome');
}
const updateSearchQuery = () => {
    searchStore.setSearchQuery(searchStore.searchQuery);
};
const filteredSlides = computed(() => {
    return slide.value.flatMap(section =>
        section.products.filter(item => item.promotion === true)
    );
});

function abrirModal() {
        googleLoginStore.isLogged()?
        modalStore.openModal({ page:'command'}):
        loginModal.openLoginModal();
}
const formattedTotal = computed(() => {
    return formatCurrency(total.value);
});
const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};
const loadProducts = async (id) => {
    try {
        const data = await fetchMenu(id);
        slide.value = data;
    } catch (err) {
        error.value = 'Erro ao buscar itens do cardápio...';
        showToast('error', 'Ops.', error)
        verifyPage();
    }
};

const loadEstablishment = async (id) => {
    if (!id) {
        showToast('warn', 'ID inválido!', 'O ID do estabelecimento não foi fornecido');
        return;
    }

    if (page?.value) {
        loading.value = true;
        error.value = null;
        try {
            const data = await fetchEstablishments(id);
            data.table_number = table_number?.value || 0;
            establishment.value = data;
            store.setEstablishment(data);
        } catch (err) {
            console.error('Erro ao carregar Estabelecimento:', err);
            error.value = 'Erro ao carregar Estabelecimento';
            verifyPage();
        } finally {
            loading.value = false;
        }
    } else {
        showToast('warn', 'URL INVÁLIDA!', 'A URL inserida está incorreta');
    }
};


onMounted(() => {
    loadEstablishment(page.value).then(() => {
        if (establishment.value?.id) {
            loadProducts(establishment.value.id);
            webSocketService.connect();
        }
    });
    cartStore.initializeCart();
});

watch(establishment, (newEstablishment) => {
    if (newEstablishment?.image) {
        document.documentElement.style.setProperty('--bgImage', `url(${API_URL + "imgs/" + newEstablishment.image})`);
    }
}, { deep: true, immediate: true });

const showToast = (severity, summary, detail) => {
    toast.add({
        severity: severity,
        summary: summary,
        detail: detail,
        life: 4000,
        group: 'bl'
    })
}
const orderCall = () => {

    const data = {
            establishment_id:establishment.value.id,
            message:"chamando atendimento...",
            table_number:store.getEstablishment().table_number || 0,
            group_name: "notify"
    };

    try {
        webSocketService.sendMessage(data);
        showToast('success', 'Atendimento Solicitado!', 'Aguarde, em instantes você será atendido(a)!');
    } catch (err) {
        showToast('error', 'Erro', 'Erro ao tentar chamar atendimento... ' + err);
    }
};
const config = {
    height: 400,
    itemsToShow: 1,
    gap: 5,
    snapAlign: 'center',
    breakpointMode: 'carousel',
    breakpoints: {

        400: {
            itemsToShow: 1,
            snapAlign: 'start',
        },
        500: {
            itemsToShow: 2,
            snapAlign: 'start',
        },
        768: {
            itemsToShow: 3,
            snapAlign: 'start',
        },
        1024: {
            itemsToShow: 4,
            snapAlign: 'start',
        },
    },
};
</script>

<style lang="scss">
#overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgb(255, 255, 255);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

#slideBox {
    width: 65vw;
    margin-bottom: 100px;
    padding: 10px 0;
}

.carousel__pagination {
    position: relative;
    bottom: -60px;
    display: flex;
    justify-content: center;

}

.carousel__pagination-button {
    width: 12px;
    height: 12px;
    background-color: #ccc;
    border-radius: 50%;
    transition: background-color 0.3s ease;
}

.carousel__pagination-button--active {
    background-color: var(--bgGreen);
    transform: scale(1.3);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.p-toast {
    top: 85% !important;
    right: 10px !important;
    padding: 2px;
}

.dots {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 10px;
}

.dots button {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: none;
    background-color: #ccc;
    cursor: pointer;
    transition: background 0.3s ease-in-out;
}

.dots button.active {
    background-color: var(--bgGreen);
    transform: scale(1.2);
}

.p-toast-message-success {
    width: 20vw;
    background-color: #2e7d32 !important;
    border-left: 5px solid #4caf50 !important;
    color: #fff !important;
}

.p-toast-detail {
    color: white !important;
    font-weight: bold;
    letter-spacing: 1px;
}

.p-toast-summary {
    color: #ffffff !important;
    font-weight: bold !important;
    letter-spacing: 1px;
}

.p-toast-message-error {
    background-color: #f44336 !important;
    border-left: 5px solid #d32f2f !important;
    color: #fff !important;
}

.p-toast-message-warn {
    background-color: #ff9800 !important;
    border-left: 5px solid #f57c00 !important;
    color: #fff !important;
}

.p-toast-message-info {
    background-color: #2196f3 !important;
    border-left: 5px solid #1976d2 !important;
    color: #fff !important;
}

.p-toast-icon-close {
    color: white !important;
    font-size: 16px !important;
}

.gsi-material-button {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -webkit-appearance: none;
  background-color: WHITE;
  background-image: none;
  border: 1px solid #ccc;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  cursor: pointer;
  font-family: 'Roboto', arial, sans-serif;
  font-size: 14px;
  height: 40px;
  letter-spacing: 0.25px;
  outline: none;
  overflow: hidden;
  padding: 0 12px;
  position: relative;
  text-align: center;
  -webkit-transition: background-color .218s, border-color .218s, box-shadow .218s;
  transition: background-color .218s, border-color .218s, box-shadow .218s;
  vertical-align: middle;
  white-space: nowrap;
  width: auto;
  max-width: 400px;
  min-width: min-content;
}

.gsi-material-button .gsi-material-button-icon {
  height: 20px;
  margin-right: 12px;
  min-width: 20px;
  width: 20px;
}

.gsi-material-button .gsi-material-button-content-wrapper {
  -webkit-align-items: center;
  align-items: center;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-flex-wrap: nowrap;
  flex-wrap: nowrap;
  height: 100%;
  justify-content: space-between;
  position: relative;
  width: 100%;
}

.gsi-material-button .gsi-material-button-contents {
  -webkit-flex-grow: 1;
  flex-grow: 1;
  font-family: 'Roboto', arial, sans-serif;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: top;
}

.gsi-material-button .gsi-material-button-state {
  -webkit-transition: opacity .218s;
  transition: opacity .218s;
  bottom: 0;
  left: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 0;
}

.gsi-material-button:disabled {
  cursor: default;
  background-color: #ffffff61;

}

.gsi-material-button:disabled .gsi-material-button-contents {
  opacity: 38%;
}

.gsi-material-button:disabled .gsi-material-button-icon {
  opacity: 38%;
}

.gsi-material-button:not(:disabled):active .gsi-material-button-state, 
.gsi-material-button:not(:disabled):focus .gsi-material-button-state {
  background-color: #303030;
  opacity: 12%;
}

.gsi-material-button:not(:disabled):hover {
  -webkit-box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15);
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15);
}

.gsi-material-button:not(:disabled):hover .gsi-material-button-state {
  background-color: #303030;
  opacity: 8%;
}

body {
    background: white
}

@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap');

:root {
    --bgDark: #222323;
    --bgGreen: #009c8d;
    --bgRed: #c61b19;
    --bgBlue: #133d67;
    --bgImage: "";
}

nav {
    display: flex;
    justify-content: center;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(13.5px);
}

header {
    display: flex;
    height: 50vh;
    flex-direction: column;
    background: linear-gradient(rgba(0, 0, 0, .8), rgba(0, 0, 0, 0.5)),
        var(--bgImage) no-repeat;
    background-size: cover;
    background-position: top;
}

#menu-itens {
    display: flex;
    flex-direction: column;
    padding: 50px 0;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width: 60vw;
}

#container {
    display: flex;
    align-self: center;
    align-content: center;
    flex-direction: column;
    width: 65vw;
}

#logo {
    display: flex;
    margin-top: 20px;
    background: url('/imgs/logo.svg') no-repeat center;
    width: 265px;
    height: 170px;
    z-index: 9;
    background-size: contain;
}

#navbar {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 60vw;
    height: 100px;
}

#search {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    align-self: center;
    gap: 20px;
    width: 95%;
    margin-top: 60px;
    padding: 10px;
    background-color: white;
    border-radius: 5px;
    -webkit-box-shadow: 7px -3px 88px 27px rgba(0, 0, 0, 0.6);
    -moz-box-shadow: 7px -3px 88px 27px rgba(0, 0, 0, 0.6);
    box-shadow: 7px -3px 88px 27px rgba(0, 0, 0, 0.6);
}

#search input {
    display: flex;
    border: none;
    height: 40px;
    color: var(--bgGreen);
    background: white;
    text-transform: uppercase;
    outline: none;
    width: 55vw;
    font-size: 1rem;
    font-weight: bold;
}

.search {
    width: 22px;
    height: 22px;
    background: url('/imgs/search.svg') no-repeat center;
    background-size: contain;
    cursor: pointer;
}

.establishment {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 40%;
    font-family: "Noto Sans", serif;
    color: white;
    font-weight: 500;
    letter-spacing: 1px;
    line-height: 23px;
}

.establishment span {
    font-size: .8rem;
    color: var(--bgGreen);
}

.establishment h2 {
    font-size: clamp(1em, 1em + 1vw, 1.5em);

}

.total {
    display: flex;
    flex-direction: column;
    color: white;
    align-items: flex-start;
    font-family: "Noto Sans", serif;
}

.total span {
    padding: 4px 0;
    line-height: 1px;
    font-size: .8rem;
}

.total h3 {
    font-size: 1.6rem;
    color: var(--bgGreen);
}

.menu {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 30px;
    flex: 1;
    color: white;
}

.menu ul {
    display: flex;
    flex-direction: row;
    list-style: none;
    gap: 30px;
}

.menu ul li {
    display: flex;
    padding: 10px 20px;
    cursor: pointer;
    align-items: center;
    background-color: var(--bgGreen);
    border-radius: 5px;
    font-family: "Noto Sans", serif;
    font-weight: bold;
    letter-spacing: 1px;
    font-size: .8rem;
}

#middle {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60vw;
    margin: 0 auto;
}

.promo-slide {
    display: flex;
    width: 100%;
    text-align: left;
}

.promo-slide h1 {
    font-size: clamp(1em, 1em + 1vw, 2.5em);
    font-family: "Noto Sans", serif;
    color: var(--bgDark);
    text-align: left;
    padding: 50px 0;
}

.slide-box {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px;
    margin-top: 20px;
    overflow: hidden;
}

.keen-slider__slide {
    width: 20vw;
}

.keen-slider {
    gap: 30px;
}

@media (max-width: 1000px) {
    nav {
        flex: 1 1 30%;
    }

    .p-toast-message-success {
        width: 40vw;
        background-color: #4caf50 !important;
        border-left: 5px solid #2e7d32 !important;
        color: #fff !important;
        font-weight: bold;
    }

    .p-toast {
        top: 90vh !important;
        right: 40px !important;
        padding: 2px;
    }

    header {
        height: 80vh;
        padding-bottom: 30px;
    }

    #navbar {
        flex-direction: column;
        height: 40vh;
        text-align: center;
        align-items: center;
        justify-content: center;
    }

    .establishment {
        width: 80vw;
        gap: 12px;
        align-items: center;
        padding-top: 50px;
    }

    .menu {
        width: 80vw;
        flex-direction: column;
    }

    #middle {
        width: 80vw;

    }

    .total {
        align-items: center;
    }

    .total span {
        line-height: 40px;
        font-size: 1.5rem;
    }

    .total h3 {
        line-height: 40px;
        font-size: 3rem;
    }

    #container {
        width: 80vw;
        box-shadow: none;
    }

    .promo-slide {
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .promo-slide h1 {
        font-size: 26px;
    }

    #logo {
        background-size: 60%;
        align-self: center;
        margin-top: 0;
    }

    #slideBox {
        width: 84vw;
    }

    #search {
        margin-top: 10px;
        box-shadow: none;
    }
}
</style>
