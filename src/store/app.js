// Utilities
import { defineStore } from 'pinia'
import { request } from '@/plugins/axios';

export const useAppStore = defineStore('app', {
  state: () => ({
    user: {
      customVariable: null,
    },
    comments: [], 
    commentForm: { 
      title: '',
      description: '',
    },
  }),

 


  actions: {

    async loginUser(user) {

      try {
        const { data } = await request.post('login', user);
        this.authenticated = data.customVariable === true;
        return this.authenticated;
      } catch (error) {
        return false;
      }

    },
    async registerUser(user) {

      try {
        const { data } = await request.post('registrar', user);
        this.authenticated = data.customVariable === true;
        return this.authenticated;
      } catch (error) {
        return false;
      }

    },

    async listDenuncias() {
      try {
        // Lista as tasks do servidor
        const { data } = await request.get('/comentarios');
        // Salva a lista de tasks no array de tasks
        this.comments = data;
      } catch (error) {
        // Se não retornar nada do servidor, zerar a lista de task
        this.comments = [];
      }
    },

    createNewComment() {
      this.commentForm = {
        title: '',
        description: '',
      }
    },

    async saveComment() {
      const { data } = await request.post('/comentarios/enviar', this.commentForm);
      // Adiciona a task no Array de tasks
      this.comments.push(data);
    },

  },
})
