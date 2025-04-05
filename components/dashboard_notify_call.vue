<template>
    <div>
        <img src="/assets/painel/imgs/notify-icon.svg" width="22">
        <span> <b>{{"MESA "+table_number }}</b> Está chamando atendimento...</span>
        <section class="info">
            <span>{{ timestamp }}</span>
            <img @click="removeItem(id)" src="/assets/painel/imgs/close-icon.svg" width="22">
        </section>
    </div>
</template>
<script setup>
import { useWebSocketStore } from '~/services/useWebSocketStore';
const store = useWebSocketStore();
const props = defineProps({
  table_number: {
    type: Number,
    required: true
  },
  timestamp: {
    type:String,
    required: true
  },
  id:{
    type:String,
    required: true
  }
});
const removeItem = (msg) =>  {
    store.removeMessage(msg)
}
</script>
<style scoped>
div {
    display: flex;
    background-color: #ee721b;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
    flex-direction: row;
    padding-left: 20px;
    padding-right: 20px;
    justify-content: space-between;
    color: white;
    align-items: center;
    border-radius: 4px;
    margin: 20px 0;
    height: 50px;
}

.info {
    display: flex;
    justify-content: space-between;
    gap: 50px;
    align-items: center;
}

.info img {
    cursor: pointer;
}

@media (max-width:868px) {
    div {
        display: flex;

        grid-template-columns: 10% 80% 10%;
        padding-left: 10px;
        flex-direction: column !important;
        padding-right: 10px;
        height: auto;
        gap: 50px;
    }

    .info {
        flex-direction: column;

    }

    div img:nth-child(1) {
        width: 20%;
        margin-top: 40px;
    }

    div img:nth-child(2) {
        margin-bottom: 20px;
    }
}
</style>