import { createApp } from 'vue';
import App from './App.vue';
import router from "./router/index.js";
import store from "./store/index.js";
import vuetify from "./plugins/vuetify.js";

createApp(App)
    .use(router)
    .use(store)
    .use(vuetify)
    .mount('#app')
