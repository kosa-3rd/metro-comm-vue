/*
 담당자: 양건모 
 시작 일자: 2024.08.07
 설명 : 기본 라우터
 ---------------------
 2024.08.07 양건모 | 기능 구현
 2024.08.08 김호영 | nav 라우터 기능 구현 
 2024.08.14 양건모 | navigation-guard 적용을 통해 접근 제한
 
 */

import { createWebHistory, createRouter } from 'vue-router';
import contentRoute from './content-route';
import myPageRoute from './my-page-route';
import { useUserStore } from '@/store/user-store';

// NavMapCmp 컴포넌트 추가.
import NavMapCmp from '@/components/nav/NavMapCmp.vue';

// 기존 라우트에 추가.
const routes = [
    ...contentRoute,
    ...myPageRoute,
    {
        path: '/navmap',
        name: 'NavMap',
        component: NavMapCmp,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const userStore = useUserStore();

    if (to.path.startsWith('/my') && !userStore.authenticated) {
        next('/login');
    } else if ((to.path === '/login' || to.path === '/register') && userStore.authenticated) {
        alert('잘못된 접근입니다');
        next('/'); // 메인 페이지 또는 다른 경로로 리디렉션
    } else {
        next();
    }
});

export default router;
