import {createApp} from 'vue';
import App from './App.vue';
import {store} from './store';
import 'element-plus/lib/theme-chalk/index.css';
import ElementPlus from 'element-plus';
import router from './router';

const app = createApp(App);
app.use(ElementPlus);
app.use(store);
app.use(router);
app.mount('#app');
// createApp(App).mount('#app')
