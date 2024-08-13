import MyPageChangeUserCmp from '@/components/content/MyPageChangeUserCmp.vue';
import MypagePostCmp from '@/components/content/MyPagePostCmp.vue';
import MyPageWithdrawCmp from '@/components/content/MyPageWithdrawCmp.vue';

export default [
    {
        path: '/my/posts', // URL 경로를 '/my/posts'로 설정
        component: MypagePostCmp,
    },
    {
        path: '/my/info', // URL 경로를 '/my/info'로 설정
        component: MyPageChangeUserCmp,
    },
    {
        path: '/my/withdraw', // URL 경로를 '/my/withdraw'로 설정
        component: MyPageWithdrawCmp,
    },
];
