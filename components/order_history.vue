<template>
    <ScrollPanel style="width: 100%; height: 100%">
        <article v-for="(ord, index) in products" :key="index" class="card">

            <section class="card-title">
                <span>PEDIDO # {{ ord.orderId }}  <b> -  {{ formatDate(ord.created_at) }}   -   {{ formatCurrency(ord.total) }} </b> Pagamento : {{ ord.payment }}</span>
            </section>
            <section class="items">
                <h3 v-for="(item, i) in parseItems(ord.items)" :key="i">
                    {{ item.quantity }} - {{ item.name }} ({{ formatCurrency(item.price) }})

                </h3>
            </section>
            <section class="description">
                <span>
  {{ ord.table == 0 ?  ord.address : 'Pedido no Estabelecimento ' }}
  <b v-if="ord.table > 0">MESA {{ ord.table }}</b>
</span>
            </section>
        </article>



    </ScrollPanel>
</template>

<script setup>
import { ref } from 'vue';
import formatDate from '~/services/dateFormater';
import { fetchOrderData } from '~/services/getOrders';
const products = ref([]);
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
onMounted(async () => {
    products.value = await fetchOrderData();

});


</script>

<style scoped>
.card {
    width: 96%;
    background-color: rgb(241, 241, 241);
    padding: 20px;
    margin-bottom: 30px;
    border-radius: 5px;
}

.card h3 {
    display: flex;
    color: #133d67;
    gap: 20px;
}
.items{
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}
.description {
    width: 100%;
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    gap: 1px;
    font-weight: 500;
    font-size: clamp(12px, 1vw, 12px);
    padding: 10px 0;
}

.description span {
    font-size: clamp(12px, 1vw, 14px);
    color: #505050;
}

.card-title {

    padding: 10px 0;
    color: #009c8d;
    font-size: clamp(14px, 1vw, 10px);
}
</style>