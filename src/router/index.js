import { createWebHistory, createRouter } from 'vue-router';
import contentRoute from './content-route';

// NavMapCmp 컴포넌트 추가.
import NavMapCmp from '@/components/nav/NavMapCmp.vue';

// 기존 라우트에 추가.
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