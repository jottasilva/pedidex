<template>

    <div id="body">
        <nav>
            <img src="/assets/painel/imgs/logo.svg" alt="Logo Pedidex Sistema Simplificado de Gerenciamento.">
            <section class="menu">
                <div class="panel-title" />
                <article class="nav-right">
                    <section class="info">
                        <span>{{ establishment.name }}</span>
                        <h2>{{ formatDate(time) + " " + time.toLocaleTimeString() }}</h2>
                        <span><b>{{ orders }}</b> pedidos atendidos</span>
                    </section>
                    <div class="bt">
                        <span>SAIR</span>
                    </div>
                </article>

            </section>
        </nav>
        <h3>Ultimas Atualizações</h3>
        <span v-if="filteredOrders.length === 0 && filteredCall.length === 0">Nenhum registro encontrado.</span>

        <div id="slider-container">
            <div v-if="filteredCall.length > 0" class="splide" ref="splide">
                <div class="splide__track">
                    <ul class="splide__list">
                        <li class="splide__slide" v-for="(msg, index) in filteredCall" :key="index">
                            <dashboard-notify-call :table_number="msg.table_number" :timestamp="msg.timestamp"
                            :id="msg.id"
                             />
                        </li>
                    </ul>
                </div>
            </div>
           
            <div v-if="filteredOrders.length > 0" class="splide" ref="splideOrders">
                <div class="splide__track">
                    <ul class="splide__list">
                        <li class="splide__slide" v-for="(msg, index) in filteredOrders" :key="index">
                            <dashboard-notify-order :table_number="msg.table_number"
                            :timestamp="msg.timestamp"
                            :id="msg.id"
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <order-recents />

    </div>

</template>
<script setup>
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { useEstablishmentStore } from '~/services/establishmentStore';
import { nextTick } from 'vue';
import { fetchEstablishments } from '~/services/getEstablishment';
import { useWebSocketStore } from '~/services/useWebSocketStore';
import { ref, onMounted, onUnmounted } from 'vue';
import { countOrders } from '~/services/getOrdersCount';
import webSocketService from '~/services/websocket_client';
import formatDate from '~/services/dateFormater';
const time = ref(new Date());
const ws_msg = computed(() => useWebSocketStore().messages);
const orders = ref(0);
const updateTime = () => {
    time.value = new Date();
};
const establishment = ref([]);
const store = useEstablishmentStore();
const splide = ref();
const splideOrders = ref();

const isEmpty = computed(() => filteredOrders.length === 0 && filteredCall.length === 0);
const filteredOrders = computed(() =>
    ws_msg.value.filter(msg =>
        msg.group_name === 'notify' && (msg.message && msg.message.includes('pedido'))
    )
);

const filteredCall = computed(() =>
    ws_msg.value.filter(msg =>
        msg.group_name === 'notify' && String(msg.message).includes('chamando')
    )
);
const loadEstablishment = async (id) => {
    const data = await fetchEstablishments(id);
    establishment.value = data;
    store.setEstablishment(data);
};
let interval = null;

onMounted(async () => {
    await loadEstablishment('bomsabor');
    interval = setInterval(updateTime, 1000);
    await loadOrdersCount();
    webSocketService.connect();
    webSocketService.socket.addEventListener('open', () => {
        webSocketService.socket.send(JSON.stringify({
            message: "service",
            group_name: "notify"
        }));
    });

});

onUnmounted(() => {
    clearInterval(interval);
    webSocketService.close();
});
const loadOrdersCount = async () => {
    orders.value = await countOrders('2ea4bbb1-6675-4a74-9f0a-21acadf1d670');
};

watch(ws_msg, async () => {
    await nextTick(); 
    if (splide.value) {
        splide.value.splide = new Splide(splide.value, {
            type: 'slide',
            autoplay: true,
            interval: 3000,
            pagination: false,
            arrows: true,
        }).mount();
    }
    if (splideOrders.value) {
        splideOrders.value.splide = new Splide(splideOrders.value, {
            type: 'slide',
            autoplay: true,
            interval: 4000,
            pagination: false,
            arrows: true,
        }).mount();
    }
}, { deep: true });
  
</script>

<style scoped>
:root {
    --bgDark: #222323;
    --bgGreen: #009c8d;
    --bgRed: #c61b19;
    --bgBlue: #133d67;
    --bgOrange: #ee721b;
}

.splide__slide{
    padding:0 60px;

}
.splide__pagination {
  display: none !important;
}
#body {
    display: flex;
    flex-direction: column;
    width:90%;
    margin: 0 auto;
    margin-top: 50px;
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
    width: 10%;
    margin: 10px;
}

.info {
    display: flex;
    flex-direction: column;
    height: 100px;
    justify-content: center;
    text-align: center;
    color: white;
    letter-spacing: 1px;
}

.info b {
    font-style: italic;
}

.info:nth-child(1) {
    font-size: clamp(12px, 1vw, 14px);
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

    .info {
        gap: 10px;
    }

    .info span {
        font-size: clamp(18px, 3vw, 34px);
    }

    .info h1 {
        font-size: clamp(8vw, 5vw, 34px);
    }
}
</style>