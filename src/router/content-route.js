import BoardCmp from '@/components/content/BoardCmp.vue';
import MyPageCmp from '@/components/content/MyPageCmp.vue';
import LoginCmp from '@/components/content/LoginCmp.vue';
import RegisterCmp from '@/components/content/RegisterCmp.vue';

export default [
    {
        path: '/:station(\\d+)?', //(\\d+) => 숫자 형태만 올 수있는 정규식
        component: BoardCmp,
        props: true,
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
