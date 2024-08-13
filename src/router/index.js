import { createWebHistory, createRouter } from 'vue-router';
import contentRoute from './content-route';
import myPageRoute from './my-page-route'

// NavMapCmp 컴포넌트 추가.
import NavMapCmp from '@/components/nav/NavMapCmp.vue';

// 기존 라우트에 추가.
const routes = [
  ...contentRoute,
  ...myPageRoute,
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