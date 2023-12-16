/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import VueDatePicker from '@vuepic/vue-datepicker';

// Composables
import { createApp } from 'vue'


const app = createApp(App)

registerPlugins(app)

app.component('VueDatePicker', VueDatePicker);

app.mount('#app')
