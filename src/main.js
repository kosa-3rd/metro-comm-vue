import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import router from './router/index';
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCodeBranch, faTrain } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons'; // Regular 아이콘 추가
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
library.add(faCodeBranch, faTrain, faUser); // 아이콘을 라이브러리에 추가
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);

app.mount('#app');
