import { createWebHistory, createRouter } from 'vue-router';
import contentRoute from './content-route';

// NavMapCmp 컴포넌트를 추가로 가져옵니다.
import NavMapCmp from '@/components/nav/NavMapCmp.vue';

// 기존 라우트에 추가합니다.
const routes = [
  ...contentRoute,
  {
    path: '/navmap',
    name: 'NavMap',
    component: NavMapCmp
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;