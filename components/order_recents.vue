<template>
    <div>
        <div class="orderRecents filter">
           <section>
            <img src="/assets/painel/imgs/order-icon-recent.svg" width="30">
            <span>
                Pedidos Recentes
            </span>
           </section>
            <section>
                <ul>
                    <li @click="setFilter('')">Todos</li>
                    <li @click="setFilter('finalizado')">Finalizados</li>
                    <li @click="setFilter('pendente')">Pendentes</li>
                    <li @click="setFilter('cancelado')">Cancelados</li> 
                </ul>
            </section>
        </div>
        <span class="sumary">
            <ul>
                <li>Finalize os pedidos somente apos o pagamento</li>
                <li>Pedidos cancelados não podem ser aceitos Novamente.</li>
                
            </ul>
        </span>
        <section v-if="products.length < 1" style="padding:20px 0;">
            <span>Nenhum pedido encontrado...</span>
        </section>
        <article :class="getStatusClass(msg.status)" v-for="(msg, index) in finalizedProducts" :key="index" class="item">
            <div :class="msg.status == 'finally' ? 'status-finally' : ''" class="container">
                <section :class="msg.table <= 0 ? 'delivery-order' : 'establishment-order'">
                    <span><b>{{ msg.table > 0 ? 'MESA ' + msg.table : 'DELIVERY /' }} PEDIDO #{{ msg.orderId }}</b> {{ formatDate(msg.created_at) }}</span>
                </section>
                <section class="body-item">
                    <div class="itemOrder" v-for="(item, i) in parseItems(msg.items)" :key="i">
                        <span class="orderQtd">{{ item.quantity }} </span>
                        <span> - {{ item.name }}</span>
                        <span class="orderQtdUn">{{ formatCurrency(item.price) }}</span>
                        <span v-if="i < parseItems(msg.items).length - 1">, </span>
                    </div>
                </section>
                <section class="obs" v-if="msg.table == 0">
                    <img src="/assets/painel/imgs/location.svg" width="12" alt=""> <span>{{ msg.address }}</span>
                </section>
                <section class="obs" v-if="msg.table > 0">Pedido no estabelecimento</section>
            </div>

            <div class="btns">
                <h3>{{ formatCurrency(msg.total) }} - {{ msg.payment }}</h3>
                <span v-if="msg.status != 'finalizado'">{{ msg.status }}</span>
                <img @click="editOrder(msg.id, 'cancelado')" v-if="msg.status != 'aceito' && msg.status != 'finalizado'"
                    src="/assets/painel/imgs/cancel-icon.svg" width="30">
                <img v-if="msg.status != 'aceito' && msg.status != 'finalizado'" @click="editOrder(msg.id, 'aceito')"
                    src="/assets/painel/imgs/accept-icon.svg" width="30">
                <section v-if="msg.status == 'aceito'" @click="editOrder(msg.id, 'finalizado')" class="finally">{{
                    msg.status === 'finalizado' ? 'Finalizado' : 'Finalizar' }}</section>
            </div>
        </article>

        <article>
            <div class="orderTables">
                <img src="/assets/painel/imgs/table-icon.svg" width="50">
                <span>
                    Mesas
                </span>
            </div>
            
            <section class="tables">
                <div v-for="table in tableNumbers" :key="table">
                    <span>{{ table }}</span>
                </div>
            </section>
        </article>

    </div>
</template>
<script setup>
import { fetchOrderData } from '~/services/getOrders';
import { ref, onMounted,computed } from 'vue';
import { useWebSocketStore } from '~/services/useWebSocketStore';
import { updateOrder } from '~/services/orderUpdate';
import formatDate from '~/services/dateFormater';
const ws_msg = computed(() => useWebSocketStore().messages);
const table_n = process.client ? JSON.parse(localStorage.getItem('establishmentLocal')) : null;

const products = ref([]);

const selectedStatus = ref('');
const finalizedProducts = computed(() => {
    if (!selectedStatus.value) {
        return products.value; 
    }
    return products.value.filter(product => product.status === selectedStatus.value);
});
const setFilter = (status) => {
    selectedStatus.value = status; 
};
const tableNumbers = computed(() => {
    const tables = new Set(
        products.value
            .filter(product => product.status !== 'finalizado')
            .map(product => product.table)
            .filter(table => table !== 0) 
    ); 
    return Array.from(tables).sort((a, b) => a - b);
});

const editOrder = async (id, status) => {
    try {
        await updateOrder(id, status);
        products.value = await fetchOrderData();
    } catch (err) {
        console.log("Ocorreu um erro..." + err);
    }
}
const parseItems = (items) => {
    try {
        return JSON.parse(items.replace(/'/g, '"'));
    } catch (error) {
        console.error("Erro ao converter items:", error);
        return [];
    }
};
const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
};
const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
        case 'aceito':
            return 'status-accept';
        case 'cancelado':
            return 'status-cancel';
        case 'pendente':
            return 'status-pending';
        case 'finalizado':
            return 'status-finally';
        default:
            return 'status-default';
    }
};
onMounted(async () => {
    products.value = await fetchOrderData();
});

watch(ws_msg, async () => {
    products.value = await fetchOrderData();
}, { deep: true });
</script>
<style scoped>
.orderRecents {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding-left: 20px;
    gap: 20px;
    color: white;
    margin-top: 30px;
    font-size: clamp(14px, 2vw, 34px);
    border-radius: 4px;
    background-color: #133d67;
}
.orderRecents section:nth-child(1){
    display: flex;
    align-items: center;
    gap: 12px;
}
.orderRecents ul{
    list-style: none;
    display: flex;
    gap: 30px;
    margin: 0 20px;
    font-size: clamp(10px, 1vw, 14px);
}
.orderRecents ul li{
    cursor: pointer;
    
    transition: .1s linear all;
}
.orderRecents ul li:hover{
    letter-spacing: 1px;
    font-weight: bold;
}
.orderTables {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 60px;
    padding-left: 20px;
    gap: 20px;
    color: white;
    margin-top: 30px;
    font-size: clamp(14px, 2vw, 34px);
    border-radius: 4px;
    background-color: #133d67;
}

.status-accept {
    text-transform: capitalize;
    border-left: 3px solid rgb(10, 190, 10);
    letter-spacing: 1px;
}
.sumary ul{
    display: flex;
    flex-direction: column;
    padding: 20px 20px;
    font-size: clamp(14px, .5vw, 34px);
    gap: 10px;
    color: orangered;
}
.status-cancel {
    text-transform: capitalize;
    border-left: 3px solid red;
    letter-spacing: 1px;
}

.status-pending {
    text-transform: capitalize;
    border-left: 3px solid orange;
    letter-spacing: 1px;
}

.status-finally {
    background-color: rgb(235, 235, 235)
}

.finally {
    width: 90px;
    height: 30px;
    display: flex;
    align-items: center;
    padding: 6px;
    justify-content: center;
    font-weight: bold;
    letter-spacing: 1px;
    border-radius: 3px;
    text-transform: uppercase;
    font-size: 12px;
    color: white;
    background-color: #009c8d;
}

.item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    margin: 5px 0;
    gap: 15px;
}

.body-item {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin: 5px 0;
    font-size: clamp(14px, 1vw, 24px);
    font-weight: bold;
    color: #133d67;
}

.orderQtd {
    color: #009c8d;
}

.orderQtdUn {
    color: white;
    font-size: 12px;
    padding: 3px 5px;
    margin: 0 5px;
    background: #009c8d;
}

.establishment-order {
    display: flex;
    color: #444;
    margin: 10px 0;
    font-size: clamp(14px, 0.5vw, 24px);
}
.delivery-order {
    display: flex;
    color: #444;
    margin: 10px 0;
    font-size: clamp(14px, 0.5vw, 24px);
}
.establishment-order span, .delivery-order span {
    display: flex;
    border-radius: 3px;
    font-size: clamp(14px, 1vw, 24px);
    letter-spacing: 1px;
    padding: 3px 10px;
    gap: 50px;
}
.establishment-order span{
    background-color: #ccc;
}
.delivery-order span{
    background-color: #133d67;
    color: white;
}
.obs {
    font-size: clamp(14px, .5vw, 24px);
    color: #444;
    padding: 5px 0;
}

.btns {
    display: flex;
    justify-content:space-between;
    align-items: center;
    gap: 20px;
    max-width:60%;
    min-width:20%;

}

.btns span {
    border-radius: 3px;
    font-size: 12px;
    background: #ccc;
    padding: 2px 3px;
}

.btns h3 {
    color: #444;
    font-size: clamp(14px, 1vw, 24px);
}

.tables {
    display: flex;
    padding: 40px 0;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
}

.tables div {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    width: 42px;
    height: 42px;
    font-size: clamp(14px, 1vw, 24px);
    background-color: #ccc;
    font-weight: bold;
}

.tables div{
    background-color: #009c8d;
    color: white;
}

@media (max-width:868px) {
    .item {
        display: flex;
        align-items: center;
        gap: 50px;
        flex-direction: column;

    }

}
</style>