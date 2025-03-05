import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useSearchStore = defineStore('search', () => {
    
  const searchQuery = ref('');
  const filteredQuery = computed(() => searchQuery.value.toLowerCase());
  const setSearchQuery = (query) => {
    searchQuery.value = query;
  };

  return { searchQuery, filteredQuery, setSearchQuery };
});