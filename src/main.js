import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import router from './router/index';
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCodeBranch, faTrain, faUserLock } from '@fortawesome/free-solid-svg-icons'; // Solid 아이콘 추가
import { faUser } from '@fortawesome/free-regular-svg-icons'; // Regular 아이콘 추가
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(router);
app.use(pinia);

// 필요한 아이콘들을 라이브러리에 추가
library.add(faCodeBranch, faTrain, faUser, faUserLock);

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');