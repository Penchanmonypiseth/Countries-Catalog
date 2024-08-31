import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/global.css';
import { Request } from './shared/services/Request';
const app = createApp(App);
app.config.globalProperties.$RequestService = new Request();
app.mount('#app');
