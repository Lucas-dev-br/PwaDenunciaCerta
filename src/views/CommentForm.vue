          <script setup>
          import { ref } from 'vue';
          import { useRouter } from 'vue-router';
          import { useAppStore } from '@/store/app';
          
          const router = useRouter();
          const appStore = useAppStore();
          
          const loading = ref(false);
          const formValid = ref(true);
          
          const campoObrigatorio = value => !!value || "Campo obrigatório";
          
          const cancelar = () => {
            router.push({ name: 'Home' });
          };
          
          const salvar = async () => {
            try {
              loading.value = true;
              await appStore.saveComment();
              router.push({ name: 'Home' });
            } catch (error) {
              console.error(error);
              alert('Não foi possível salvar o seu comentário');
            } finally {
              loading.value = false;
            }
          };
          </script>
          
          <style lang="scss" scoped>
          /* Adicione seus estilos, se necessário */
          </style>
          
<template>
    <v-form v-model="formValid" ref="form">
      <v-card>
        <v-card-title>
          Adicionar um Comentário
        </v-card-title>
  
        <v-divider></v-divider>
  
        <v-card-text>
          <v-text-field
            v-model="appStore.commentForm.title"
            label="Título"
            name="title"
            id="title"
            :rules="[campoObrigatorio]"
          ></v-text-field>
  
          <v-textarea
            v-model="appStore.commentForm.description"
            label="Descrição"
            name="description"
            id="description"
          ></v-textarea>
        </v-card-text>
  
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="elevated" color="primary" elevation="2" :loading="loading" :disabled="!formValid" @click="salvar">
            Salvar
          </v-btn>
          <v-btn variant="text" @click="cancelar" :disabled="loading">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </template>
  