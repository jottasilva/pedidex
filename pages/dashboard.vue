<template>

    <div id="body">
        <nav>
            <img src="/assets/painel/imgs/logo.svg" alt="Logo Pedidex Sistema Simplificado de Gerenciamento.">
            <section class="menu">
                <div class="panel-title"/>
                <article class="nav-right">
                    <section class="info">
                        <span>{{ establishment.name }}</span>
                        <h1>{{ time.toLocaleDateString() +" "+ time.toLocaleTimeString()}}</h1>
                        <span><b>{{ orders }}</b> pedidos atendidos</span>
                    </section>
                    <div class="bt">
                        <span>SAIR</span>
                    </div>
                </article>

            </section>
        </nav>
        <dashboard-notify-call />
        <dashboard-notify-order />
        <order-recents />

    </div>
</template>
<script setup>
import { useEstablishmentStore } from '~/services/establishmentStore';
import { fetchEstablishments } from '~/services/getEstablishment';
import { ref, onMounted, onUnmounted } from 'vue';
import { countOrders } from '~/services/getOrdersCount';
const time = ref(new Date());
const orders = ref(0);
const updateTime = () => {
  time.value = new Date();
};
const establishment = ref([]);
const store = useEstablishmentStore();
const loadEstablishment = async (id) => {
    const data = await fetchEstablishments(id);
            establishment.value = data;
            store.setEstablishment(data);
};
let interval = null;

onUnmounted(() => {
  clearInterval(interval);
});
const loadOrdersCount = async () => {
  orders.value = await countOrders('2ea4bbb1-6675-4a74-9f0a-21acadf1d670');
};
onMounted(async () => {
    await loadEstablishment('bomsabor');
    interval = setInterval(updateTime, 1000);
    await loadOrdersCount();
});
</script>

<style scoped>
:root {
    --bgDark: #222323;
    --bgGreen: #009c8d;
    --bgRed: #c61b19;
    --bgBlue: #133d67;
    --bgOrange: #ee721b;

}

#body {
    display: flex;
    flex-direction: column;
    width: 70%;
    margin: 0 auto;
    margin-top: 100px;
    background-color: #f8f8f8;
    padding: 20px;
    border-radius: 4px;
}

nav {
    background-color: #133d67;
    display: flex;
    border-radius: 4px;
    height: 100px;
    width: 100%;
    margin-bottom: 20px;
    align-items: center;
}

.panel-title {
    width: 42px;
    height: 42px;
    background: url("/assets/painel/imgs/config-icon.svg") no-repeat center;
    background-size: contain;
}

.menu {
    display: flex;
    flex: 1;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
}

img {
    padding: 20px;
    min-width: 10%;
    width: 14%;
    margin: 10px;
}

.info {
    display: flex;
    flex-direction: column;
    line-height: 5px;
    height: 100px;
    justify-content: center;
    text-align: center;
    color: white;
    letter-spacing: 1px;
}

.info b {
    font-style: italic;
}
.info:nth-child(1){
    font-size:  clamp(12px,1vw, 14px);
}
.bt {
    display: flex;
    color: white;
    width: 100px;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: #ee721b;
    border-radius: 0 4px 4px 0;
    margin-left: 100px;
}

.nav-right {
    display: flex;

}

@media (max-width:868px) {
    nav {
        flex-direction: column;
    }

    img {
        width: 60%;
        margin: 50px;
    }

    .menu {
        display: flex;
        gap: 50px;
        flex-direction: column;
    }

    .nav-right {
        width: 80%;
        gap: 50px;
        height: 30vh;
        align-items: center;
        flex-direction: column;
    }

    .bt {
        width: 40%;
        border-radius: 4px;
        margin: 10px;
        height: 30px;

    }
    .info{
        gap: 10px;
    }
    .info span{
        font-size: clamp(18px,3vw, 34px);
    }
    .info h1{
        font-size: clamp(8vw,5vw, 34px);
    }
}
</style>