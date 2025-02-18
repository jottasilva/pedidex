<template>
    <article class="menu">
      <div class="menu-title">
        <h1>Pizzas Salgadas</h1>
      </div>
      
      <div v-if="error">{{ error }}</div>
      <div v-else-if="isLoading">Carregando...</div>
      <div v-else>
        <div v-for="(produto, index) in menu" :key="produto.id" class="menu-itens">
          <section>
            <h3>{{ produto.name }}</h3>
            <span>{{ produto.description }}</span>
          </section>
          <section class="btns">
            <section class="price"><span>R$</span>
              <h3>{{ produto.price | formatPrice }}</h3>
            </section>
            <div @click="updateQuantity(index, 'decrement')" class="bt-decrement">-</div>
            <span class="bt-qtd">{{ produto.quantity }}</span>
            <div @click="updateQuantity(index, 'increment')" class="bt-increment">+</div>
          </section>
        </div>
      </div>
    </article>
  </template>
  
  <script setup>
  import { fetchMenu } from '~/services/getMenu';
  import { ref, onMounted, watch } from 'vue';
  const props = defineProps({
    uuid: {
      type: String,
      default: null,
    }
  });
  
  const menu = ref([]);
  const error = ref('');
  const isLoading = ref(true);

  // Carregar itens do cardápio
  const loadProducts = async (id) => {
    try {
      isLoading.value = true;
      const data = await fetchMenu(id);
      menu.value = data.map(item => ({ ...item, quantity: 0 }));
    } catch (err) {
      error.value = 'Erro ao buscar itens do cardápio...';
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };
  // Atualizar quantidade de produtos (função única para incrementar ou decrementar)
  const updateQuantity = (index, action) => {
    if (menu.value[index]) {
      if (action === 'increment') {
        menu.value[index].quantity++;
      } else if (action === 'decrement' && menu.value[index].quantity > 0) {
        menu.value[index].quantity--;
      }
    }
  };
  
  onMounted(() => {
    if (props.uuid) {
      loadProducts(props.uuid);
    }
  });
  // Recarregar os produtos caso o uuid seja alterado
  watch(() => props.uuid, (newUuid) => {
    if (newUuid) {
      loadProducts(newUuid);
    }
  });
  // Filtro para formatação de preço
  const formatPrice = (value) => {
    return value.toFixed(2).replace('.', ',');
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
    border-bottom: 2px var(--bgGreen) solid;
    padding-bottom: 6px;
  }
  
  .menu-itens {
    display: grid;
    grid-template-columns: 8fr 1fr;
    grid-auto-columns: auto;
    gap: 50px;
    margin-bottom:10px;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
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
      align-items: flex-end;
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
  