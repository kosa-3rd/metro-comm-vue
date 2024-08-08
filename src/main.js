import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import router from './router/index';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrain } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// FontAwesome 아이콘을 라이브러리에 추가
library.add(faTrain);

const app = createApp(App);

// FontAwesome 컴포넌트를 글로벌로 등록
app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router);
app.mount('#app');