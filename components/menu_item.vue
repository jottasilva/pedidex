<template>
  <article class="menu">
    <div v-for="(produts, categoryIndex) in menu" :key="produts.id">
      <div class="menu-title">
        <h1>{{ produts.name }}</h1>
      </div>

      <div v-if="error">{{ error }}</div>
      <div v-else-if="isLoading">Carregando...</div>
      <div v-else>
        <div v-for="(produto, productIndex) in produts.products" :key="produto.id" class="menu-itens">
          <section>
            <h3>{{ produto.name }}</h3>
            <span>{{ produto.description }}</span>
          </section>
          <section class="btns">
            <section class="price"><span>R$</span>
              <h3>{{ formatPrice(produto.quantity > 0 ? produto.price * produto.quantity : produto.price) }}</h3>

            </section>
            <div @click="updateQuantity(categoryIndex, productIndex, 'decrement')" class="bt-decrement">-</div>
            <span class="bt-qtd">{{ produto.quantity }}</span>
            <div @click="updateQuantity(categoryIndex, productIndex, 'increment')" class="bt-increment">+</div>
          </section>
        </div>
      </div>
    </div>

  </article>
</template>
<script setup>
import { fetchMenu } from '~/services/getMenu';
import { ref, onMounted, watch } from 'vue';
import { fetchSection } from '~/services/getSection';
const props = defineProps({
  uuid: {
    type: String,
    default: null,
  }
});
const menu = ref([]);
const sections = ref([]);
const error = ref('');
const isLoading = ref(true);
// Carregar Sessões
const loadSection = async (id) => {
  try {
    const data = await fetchSection(id);
    sections.value = data;
  } catch (err) {
    console.log("ERRO AO CARREGAR CATEGORIA:", err.message || err);
  }
};
// Carregar itens do cardápio
const loadProducts = async (id) => {
  try {
    isLoading.value = true;
    const data = await fetchMenu(id);

    if (!Array.isArray(data)) {
      throw new Error("Formato de dados inválido");
    }
    menu.value = data.map(category => ({
      ...category,
      products: category.products?.map(product => ({
        ...product,
        quantity: 0
      })) || []
    }));

  } catch (err) {
    error.value = 'Erro ao buscar itens do cardápio...';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};
// INCREMENT AND DECREMENT FUNCTION
const updateQuantity = (categoryIndex, productIndex, action) => {
  console.log("updateQuantity chamada!", { categoryIndex, productIndex, action });
  const category = menu.value?.[categoryIndex];
  const product = category?.products?.[productIndex];
  if (!product) {
    console.error(`Erro: Produto ou categoria inválida!`, { categoryIndex, productIndex, menu: menu.value });
    return;
  }
  if (action === 'increment') {
    product.quantity++;
  } else if (action === 'decrement' && product.quantity > 0) {
    product.quantity--;
  } else {
    console.warn(`Ação inválida ou quantidade já é 0!`, { action, quantity: product.quantity });
  }

  menu.value = [...menu.value];
};
onMounted(() => {
  if (props.uuid) {
    loadProducts(props.uuid);
    loadSection();
  }


});

watch(() => props.uuid, (newUuid) => {
  if (newUuid) {
    loadProducts(newUuid);
  }
});

const formatPrice = (value) => {
  const num = Number(value);
  return isNaN(num) ? '0,00' : num.toFixed(2).replace('.', ',');
};

</script>

<style lang="scss" scoped>
* {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.menu {
  display: flex;
  flex-direction: column;
  color: #444;
  margin-top: 30px;
  font-family: "Noto Sans", serif;
}

.menu-title {
  font-size: 1.6rem;
  width: 100%;
  background:#dfdfdf;
  padding-left: 20px;
  border-radius: 3px;
  letter-spacing: 1px;
  padding-bottom:1px;
  margin-bottom: 22px;
}

.menu-itens {
  display: grid;
  grid-template-columns: 8fr 1fr;
  grid-auto-columns: auto;
  gap: 50px;
  margin-top: 10px;
  margin-bottom: 10px;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
}
.menu-itens h3:nth-child(1){
  width: 50vw;
  flex: 1;
}
.menu-itens span {
  color: #777;
}

.menu-itens> :nth-child(2n) {
  justify-self: end;
}

.btns {
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  justify-content: space-around;
}

.bt-decrement,
.bt-increment {
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  padding: 10px;
  font-weight: bold;
  color: white;
  width: 28px;
  height: 28px;
}

.bt-qtd {
  font-weight: bold;
  font-size: 1.5rem;
}

.price {
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: center;
  width: 6vw;
}

.bt-decrement {
  background-color: var(--bgRed);
}

.bt-increment {
  background-color: var(--bgGreen);
}

@media (max-width: 660px) {
  .menu-itens {
    display: flex;
    width: 100%;
    align-items: flex-start;
    flex-direction: column;
  }

  .btns {
    width: 60vw;
    align-items: center;
  }

  .price {
    flex: 1 1;
    padding: 20px;
    font-size: 1.5rem;
  }
}
</style>