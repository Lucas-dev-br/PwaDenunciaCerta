<script setup>
  import { computed, onMounted } from 'vue';
  import { useAppStore } from '@/store/app';
  const appStore = useAppStore();
  import { useRouter } from 'vue-router';
  const router = useRouter();

  import DenunciasList from '../components/DenunciasList.vue'

  // const tasks_count = computed(() => appStore.tasks.length);

// import MeuComponente from '@/components/MeuComponente.vue';
onMounted(() => {
  listDenuncias();
})

const denuncias = computed(() => appStore.tasks);
const denuncias_count = computed(() => appStore.tasks.length);

const goToComentario = () => {
    router.push({ name: 'adicionarComentario' });
  };

</script>

<template>
  <v-card color="green" class="mb-5">
    <v-card-title class="text-h5">
      Canal de comentarios
    </v-card-title>
    

    <v-card-text>Clique no botão abaixo para adicionar novos comentarios</v-card-text>

    <v-card-actions>
      <v-btn class="ms-2" variant="outlined" size="small" @click="goToComentario">
        Adicionar
      </v-btn>
    </v-card-actions> 
  </v-card>

  <!-- <meu-componente></meu-componente> -->
  <DenunciasList />

</template>


<style lang="scss" scoped></style>