// Utilities
import { defineStore } from 'pinia'
import { request } from '@/plugins/axios';

export const useAppStore = defineStore('app', {
  state: () => ({
    user: {
      customVariable: null,
    }
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

   
  },
})
