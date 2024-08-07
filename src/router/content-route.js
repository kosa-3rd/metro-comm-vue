import BoardCmp from '@/components/content/BoardCmp.vue';
import MyPageCmp from '@/components/content/MyPageCmp.vue';
import LoginCmp from '@/components/content/LoginCmp.vue';
import RegisterCmp from '@/components/content/RegisterCmp.vue';

export default [
    {
        path: '/',
        component: BoardCmp,
    },
    {
        path: '/my',
        component: MyPageCmp,
    },
    {
        path: '/login',
        component: LoginCmp,
    },
    {
        path: '/register',
        component: RegisterCmp,
    },
];
