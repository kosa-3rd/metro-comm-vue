import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import router from './router/index';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrain } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';  // regular 아이콘 세트에서 user 아이콘 추가
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faTrain, faUser);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router);
app.mount('#app');