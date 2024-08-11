<template>
    <div>
        <!-- 상단 컴포넌트 -->
        <div id="upper-compo">
            <div id="upper-compo-left" class="w-6 mb-4 mt-4">
                <button @click="goPrev">
                    <img src="../../assets/left_arrow.png" style="width: 1.5rem; height: 1.5rem" />
                </button>
            </div>
            <div id="upper-compo-center">
                <h3 id="sign-info" class="text-xl font-semibold text-center mb-4 mt-4">마이페이지</h3>
            </div>
            <div id="upper-compo-right" class="w-6"></div>
        </div>

        <!-- 사용자 정보 섹션 -->
        <div id="user-info" class="flex justify-between items-center px-4 py-4 border-bd">
            <div>
                <h2 class="text-2xl font-semibold">username</h2>
                <p class="text-gray-500">email@naver.com</p>
            </div>
            <button class="text-gray-500 font-semibold" @click="logout">로그아웃</button>
        </div>
        <my-page-main-cmp></my-page-main-cmp>
        <!-- 하단 광고 섹션 -->
        <div class="px-4 py-4">
            <img src="../../assets/ad.png" alt="에듀윌은 합격이다" class="w-2/3 h-auto mx-auto" />
        </div>
    </div>
</template>

<script>
import MyPageMainCmp from './MyPageMainCmp.vue';
import router from '@/router';

export default {
    components: { MyPageMainCmp },
    methods: {
        goPrev() {
            this.$router.push('/');
        },
        logout() {
            // 로그아웃 로직을 여기에 추가
            console.log('로그아웃');
        },
    },
};
</script>

<script setup>
import { useUserStore } from '@/store/user-store';

const userStore = useUserStore();

const logout = async function () {
    const result = await userStore.logout();

    if (result) {
        router.push('/');
    }
};
</script>

<style scoped>
#upper-compo {
    justify-content: space-between;
    margin: 0 2rem 0 2rem;
    @apply flex mb-4 mt-4 pb-0;
    border-bottom: 1px solid #e5e5e5; /* 선 추가 */
    border-top: 1px solid #e5e5e5;
}

#user-info {
    @apply flex justify-between items-center px-4 py-4 border-b pb-36;
}

.menu-list {
    @apply list-none p-0;
}

.menu-item {
    @apply border-b py-4 px-4 cursor-pointer;
}

.menu-item:hover {
    background-color: #f5f5f5;
}

#upper-compo * {
    /* background: red; */
}
</style>
