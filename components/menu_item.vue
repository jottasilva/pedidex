<template>
  <article class="menu">
    <div v-for="(produts) in filteredProducts" :key="produts.id">
      <div class="menu-title">
        <h1>{{ produts.name }}</h1>
      </div>

      <div v-if="error">{{ error }}</div>
      <div v-else-if="isLoading">Carregando...</div>
      <div v-else>
        <div v-for="(produto) in produts.products" :key="produto.id" class="menu-itens">
          <section>
            <h3>{{ produto.name }}</h3>
            <span>{{ produto.description }}</span>
          </section>
          <section class="btns">
            <section class="price">
              <span>R$</span>
              <h3>{{ formatPrice(produto.quantity > 0 ? produto.price * produto.quantity : produto.price) }}</h3>
            </section>
            <div @click="updateQuantity(produto.id, 'decrement')" class="bt-decrement">-</div>
            <span class="bt-qtd">{{ produto.quantity }}</span>
            <div @click="updateQuantity(produto.id, 'increment')" class="bt-increment">+</div>
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
import { useCartStore } from '~/services/cartStore';
import { useEstablishmentStore } from '~/services/establishmentStore';
import { useSearchStore } from '~/services/searchService';
const searchStore = useSearchStore();
const searchQuery = ref("");
const store = useEstablishmentStore();
const cartStore = useCartStore();
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
        quantity: 0,
        client_name: "CLIENTE TESTE",
        establishment_name:store.getEstablishment()?.name
      })) || []
    }));

  } catch (err) {
    error.value = 'Erro ao buscar itens do cardápio...';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};
// FIND ID ARRAY
const findOriginalIndexes = (categoryIndex, productIndex) => {
  const category = menu.value[categoryIndex];
  const product = filteredProducts.value[categoryIndex].products[productIndex];
  
  const originalCategoryIndex = menu.value.findIndex(cat => cat.id === category.id);
  const originalProductIndex = menu.value[originalCategoryIndex].products.findIndex(prod => prod.id === product.id);

  return { originalCategoryIndex, originalProductIndex };
};
// Filtro de busca
const filteredProducts = computed(() => {
  if (!searchStore.searchQuery) return menu.value; // Retorna o menu completo se não houver consulta
  
  return menu.value.map(category => ({
    ...category,
    products: category.products.filter(product =>
      product.description.toLowerCase().includes(searchStore.searchQuery.toLowerCase())
    )
  })).filter(category => category.products.length > 0); // Remove categorias vazias
});

// SAVE TO STORE FUNCTION
const saveCart = () => {
  const selectedItems = menu.value.flatMap(category => 
    category.products.filter(product => product.quantity > 0)
  );
  cartStore.addToCart(selectedItems); 
};
// INCREMENT AND DECREMENT FUNCTION
const updateQuantity = (productId, action) => {
  // Encontrar a categoria e o produto no menu original
  const category = menu.value.find(cat => cat.products.some(prod => prod.id === productId));

  if (!category) {
    console.error(`Erro: Categoria não encontrada para o produto ${productId}`, { menu: menu.value });
    return;
  }

  const product = category.products.find(prod => prod.id === productId);

  if (!product) {
    console.error(`Erro: Produto ${productId} não encontrado na categoria`, { category });
    return;
  }

  // Alterar a quantidade do produto
  if (action === 'increment') {
    product.quantity++;
  } else if (action === 'decrement' && product.quantity > 0) {
    product.quantity--;
  }

  menu.value = [...menu.value]; // Atualiza o estado para reatividade
  saveCart(); // Salvar no carrinho
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
    loadSection();
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