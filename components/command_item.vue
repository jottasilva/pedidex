<template>
    <div>
        <section class="grid">
            <article v-for="(item, index) in products" :key="item.id" class="item" :class="{ 'riscado': item.quantity=== 0 }">
                <section class="info">
                    <h3 class="title">{{ item.name }}</h3>
                </section>
                <section class="btns">
                    <h3 class="price">R$ {{ formatPrice(item.price) }}</h3>
                    <span class="btn" @click="updateQuantity(index, -1)">-</span>
                    <span class="quantity">{{ item.quantity }}</span>
                    <span class="btn" @click="updateQuantity(index, 1)">+</span>
                </section>
            </article>
            <span v-if="products.length <= 0">
                <h1>Sua comanda esta vazia.</h1>
            </span>
        </section>
        <section>
            <Toolbar class="footer">
                <template #center>
                    <h3>{{"Nº DO PEDIDO " +  cartStore.getOrderNumber() }}</h3>
                </template>

                <template #start>
                    <h3>MESA 02</h3>
                </template>
                <template #end>
                    <div class="amount">
                        <h3>TOTAL </h3>
                        <h3>R$ {{ formatPrice(getTotalCart()) }}</h3>
                    </div>
                </template>
            </Toolbar>
        </section>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCartStore } from "~/services/cartStore";

const cartStore = useCartStore();

const formatPrice = (value) => {
  const num = Number(value);
  return isNaN(num) ? "0,00" : num.toFixed(2).replace(".", ",");
};

const updateQuantity = (index, amount) => {
  let item = cartStore.cartItems[index];

  if (!item) return;

  const newQuantity = item.quantity + amount;

  if (newQuantity <= 0) {
    cartStore.cartItems = cartStore.cartItems.filter((_, i) => i !== index);
  } else {
    cartStore.cartItems[index].quantity = newQuantity;
  }

  cartStore.saveToLocalStorage();
};

onMounted(() => {
  cartStore.initializeCart();
});

const products = computed(() => cartStore.cartItems);
const getTotalCart = computed(() => cartStore.getTotal);
</script>


<style lang="scss" scoped>
.grid {
    display: flex;
    flex-direction: column;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
.riscado {
    text-decoration: line-through;
    opacity: 0.6;
}
.item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    border-bottom: 0.1px solid #dddddd;
    padding: 10px 0;
}
.amount{
    display: flex;
    flex-direction: row;
}
.info {
    display: flex;
    flex-direction: row;
}

.price {
    font-size: 1.2rem;
    color: #444;
    min-width: 120px;
    flex-wrap: nowrap;
    padding-right: 5px;
}

.btns {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 5px 10px;
    border-radius: 8px;
}

.btn {
    cursor: pointer;
    padding: 3px 8px;
    font-family: Impact, 'Arial Narrow Bold', sans-serif;
    color: white;
    font-size: 18px;
    border-radius: 2px;
    user-select: none;
    transition: all .4s linear;
}

.btn:nth-child(4) {
    background: var(--bgGreen);
}

.btn:nth-child(2) {
    background: rgb(172, 12, 12);
}

.footer {
    margin: 50px 0;
    background: var(--bgGreen);
    border: none;
    color: white;
    font-size: clamp(1em, 1em + 1vw, 1em);
    font-family: "Noto sans";
}

.btn:hover {
    background: #bdbcbc;
}

.quantity {
    font-weight: bold;
}

@media(max-width:1000px) {
    .item {
        flex-direction: column;
    }

    .info {
        font-size: clamp(1em, 1em + 1vw, 2.5em);
        width: 100%;
        margin-bottom: 20px;
        color: var(--bgGreen);
    }

    .price {
        font-size: clamp(1em, 1em + 1vw, 2.5em);
    }
    .amount{
        flex-direction: column;
    }
    .amount h3:first-of-type {
        font-size:1em;
    }

    .amount h3:last-of-type {
        flex-wrap: nowrap;
        font-size: 2rem;
    }
}
</style>