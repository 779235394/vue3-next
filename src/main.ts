import {createApp} from 'vue';
import App from './App.vue';
import {store} from './store';
// import 'element-plus/lib/theme-chalk/index.css';
import 'element-plus/packages/theme-chalk/src/index.scss';
import ElementPlus from 'element-plus';

const app = createApp(App);
app.use(ElementPlus);
app.use(store);
app.mount('#app');
// createApp(App).mount('#app')
