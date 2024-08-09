<template>
    <nav class="nav bg-white border-t border-gray-300 flex justify-around items-center">
        <router-link
            to="/navmap"
            class="nav-item flex flex-col items-center flex-1 clickable"
            exact
            active-class="active"
        >
            <font-awesome-icon :icon="['fas', 'code-branch']" class="nav-icon" />
            <p class="normal-text font-bold">노선도</p>
        </router-link>

        <router-link to="/" class="nav-item flex flex-col items-center flex-1 clickable" exact active-class="active">
            <font-awesome-icon :icon="['fas', 'train']" class="nav-icon" />
            <p class="normal-text font-bold">HOME</p>
        </router-link>

        <router-link
            v-if="isAuthenticated"
            to="/my"
            class="nav-item flex flex-col items-center flex-1 clickable"
            exact
            active-class="active"
        >
            <font-awesome-icon :icon="['far', 'user']" class="nav-icon" />
            <p class="normal-text font-bold">마이페이지</p>
        </router-link>

        <router-link
            v-else
            to="/login"
            class="nav-item flex flex-col items-center flex-1 clickable"
            exact
            active-class="active"
        >
            <font-awesome-icon :icon="['fas', 'user-lock']" class="nav-icon" />
            <p class="normal-text font-bold">로그인</p>
        </router-link>
    </nav>
</template>

<script>
import { useUserStore } from '@/store/user-store';
import { computed } from 'vue';

export default {
    setup() {
        const userStore = useUserStore();
        const isAuthenticated = computed(() => userStore.authenticated);

        return {
            isAuthenticated,
        };
    },
};
</script>

<style scoped>
.nav {
    @apply fixed h-16 bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-white z-10 border-t border-gray-300;
}

.nav-item {
    @apply flex flex-col items-center flex-1 cursor-pointer;
    padding: 0.5rem; /* 아이템 간격을 유지하며 크기를 줄이기 위해 패딩 조정 */
}

.nav-item p {
    @apply mt-1 text-xs font-bold text-gray-600; /* 기본 텍스트 색상을 회색으로 설정 */
}

.nav-icon {
    @apply h-6 md:h-8 text-gray-600; /* 기본 아이콘 색상을 회색으로 설정 */
}

.clickable {
    @apply transition duration-200 ease-in-out;
}

.clickable:active {
    @apply bg-gray-200;
}

/* 커스텀 active 클래스 */
.active .nav-icon {
    color: rgb(79, 79, 218); /* 선택된 아이콘을 파란색으로 설정 */
}

.active p {
    color: rgb(79, 79, 218); /* 선택된 텍스트를 파란색으로 설정 */
}

@media (orientation: landscape) {
    .nav {
        width: 800px;
    }
}

@media (orientation: portrait) {
    .nav {
        width: 100%;
    }
}
</style>
