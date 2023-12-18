<template>
    <v-card>
      <v-card-title class="text-h5">Lista de Comentarios</v-card-title>
      <v-card-text>
        <ul>
          <li v-for="task in tasks" :key="task.id">{{ task.title }}</li>
        </ul>
      </v-card-text>
    </v-card>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useAppStore } from '@/store/app';
  
  const appStore = useAppStore();

const comentarios = ref([]);

onMounted(async () => {
  try {
    const response = await appStore.listDenuncias();
    // Atualize o array de comentários com a resposta da API
    comentarios.value = response.data;
  } catch (error) {
    console.error('Erro ao obter comentários:', error);
  }
});
  </script>
  
  <style scoped>
  /* Estilos específicos do componente, se necessário */
  </style>
  