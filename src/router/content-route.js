import BoardCmp from '@/components/content/BoardCmp.vue';
import MyPageCmp from '@/components/content/MyPageCmp.vue';
import LoginCmp from '@/components/content/LoginCmp.vue';
import RegisterCmp from '@/components/content/RegisterCmp.vue';
import WelcomeCmp from '@/components/content/WelcomeCmp.vue';
// import MyPageChangeUserCmp from '@/components/content/MyPageChangeUserCmp.vue';
// import MypagePostCmp from '@/components/content/MyPagePostCmp.vue';
// import MyPageWithdrawCmp from '@/components/content/MyPageWithdrawCmp.vue';

export default [
    {
        path: '/',
        component: WelcomeCmp,
    },
    {
        path: '/:subwayId(\\d+)?', //(\\d+) => 숫자 형태만 올 수있는 정규식
        component: BoardCmp,
        props: true,
    },
    {
        path: '/my',
        component: MyPageCmp,
        // children: [
        //     {
        //         path: 'posts', // URL 경로를 '/my/posts'로 설정
        //         component: MypagePostCmp,
        //     },
        //     {
        //         path: 'info', // URL 경로를 '/my/info'로 설정
        //         component: MyPageChangeUserCmp,
        //     },
        //     {
        //         path: 'withdraw', // URL 경로를 '/my/withdraw'로 설정
        //         component: MyPageWithdrawCmp,
        //     },
        // ],
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
