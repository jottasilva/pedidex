<template>
    <div id="template">
        <header>
            <nav>
                <div id="navbar">
                    <section class="establishment">
                        <h2>Restaurante Pizza da casa</h2>
                        <span>Funcionamento Seg. a Sex. 18:40 - 23:50</span>
                    </section>
                    <NuxtPage />
                    <section class="menu">
                        <ul>

                            <li @click="showToast()">CHAMAR ATENDIMENTO</li>
                            <li @click="openModal({ page: 'command' })">COMANDA</li>
                        </ul>
                        <div class="total">
                            <span>total dos pedidos</span>
                            <h3>R$ 127,80</h3>
                        </div>
                    </section>
                </div>
            </nav>
            <div id="container">
                <div id="logo"></div>
                <div id="search">
                    <section class="search"></section>
                    <form action="">
                        <input type="text" placeholder="faça uma pesquisa">
                    </form>
                </div>
            </div>
        </header>

        <article id="middle">
            <section class="promo-slide">
                <h1>PROMOÇOES</h1>
            </section>
           <div id="slideBox">
            <Carousel v-bind="config">
            <Slide v-for="image in images" :key="image.id">
            <PromoCard />
            </Slide>
            <template #addons>
            <Pagination />
            </template>
            </Carousel>
           </div>
        </article>

        <article id="menu-itens">
            <menu-item />
            <menu-item />
            <menu-item />
            <menu-item />

        </article>
        <footer-component />
        <modal-menu v-if="modalStore.modal">
            <h1>HELO</h1>
        </modal-menu>
        <Toast position="top-left" group="bl" />

    </div>

</template>

<script setup>
import { useModalStore } from '~/stores/modal'
import { useToast } from 'primevue/usetoast'
import { Carousel, Slide, Pagination} from 'vue3-carousel';


const toast = useToast()

const showToast = () => {
    toast.add({
        severity: 'success',
        summary: 'Atendimento Solicitado com sucesso!',
        detail: 'Aguarde um momento, você já sera atendido!',
        life: 4000,
        group: 'bl'
    })
 
}
const modalStore = useModalStore();
const { openModal } = modalStore;


const images = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: `https://picsum.photos/800/600?random=${index + 1}`,
}));

const config = {
  height:400,
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
      itemsToShow:3,
      snapAlign: 'start',
    },
    1024: {
      itemsToShow:4,
      snapAlign: 'start',
    },
  },
};
</script>

<style lang="scss">
#slideBox{
    width: 64vw;
    margin-bottom:100px;
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
    box-sizing: 0;
}

.p-toast {
    top: 85vh !important;
    right: 40px !important;
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
    background-color: #4caf50 !important;
    border-left: 5px solid #2e7d32 !important;
    color: #fff !important;

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

body {
    background: white
}

@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap');

:root {
    --bgDark: #222323;
    --bgGreen: #009c8d;
    --bgRed: #c61b19;
    --bgBlue: #133d67;
}

nav {
    display: flex;
    justify-content: center;
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(2.5px);
    -webkit-backdrop-filter: blur(13.5px);
}

header {
    display: flex;
    height: 60vh;
    flex-direction: column;
    background: linear-gradient(rgba(0, 0, 0, .8), rgba(0, 0, 0, 0.5)),
        url('../public/imgs/bg.jpg') no-repeat;
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
    width: 60vw;
}

#logo {
    display: flex;
    margin-top: -50px;
    background: url('../public/imgs/logo.svg') no-repeat center;
    width: 285px;
    height: 190px;
    z-index: 9;
    background-size: cover;
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
    width: 100%;
    margin-top: 100px;
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
    background: url('../public/imgs/search.svg') no-repeat center;
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
    line-height: 20px;
}

.establishment span {
    font-size: .8rem;
    color: var(--bgGreen);
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
    font-size: 2.5rem;
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

@media (max-width: 1200px) {
    nav {
        flex: 1 1 30%;
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

    #logo {
        background-size: 80%;
        align-self: center;
        margin-top: 0;
    }
    #slideBox{
    width: 84vw;
    }
    #search {
        margin-top: 10px;
        box-shadow: none;
    }
}
</style>
