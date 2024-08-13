<template>
    <div id="upper-compo">
        <div id="upper-compo-left" class="w-6 mb-4 mt-4">
            <button @click="goPrev">
                <img src="../../assets/left_arrow.png" style="width: 1.5rem; height: 1.5rem" />
            </button>
        </div>
        <div id="upper-compo-center">
            <h3 id="sign-info" class="text-xl font-semibold text-center mb-4 mt-4">회원정보 수정</h3>
        </div>
        <div id="upper-compo-right" class="w-6"></div>
    </div>

    <!-- 사용자 정보 섹션 -->
    <div id="user-info" class="flex justify-between items-center px-4 py-4 border-bd">
        <div>
            <h2 class="text-2xl font-semibold">{{ userName }}</h2>
            <p class="text-gray-500">{{ userEmail }}</p>
        </div>
        <button class="text-gray-500 font-semibold" @click="logout">로그아웃</button>
    </div>

    <!-- username 수정 섹션 -->
    <div class="px-4 py-4">
        <label for="username">username 수정</label>
        <input type="text" id="username" v-model="newUsername" class="input-box">
        <button @click="handleButtonClick($event, checkUsername)" class="mt-4 bg-blue-500 text-white p-2 rounded clickable text-sm">중복확인</button>
    </div>

    <!-- 비밀번호 변경 섹션 -->
    <div class="px-4 py-4">
        <label for="current-password">현재 비밀번호 입력</label>
        <input type="password" id="current-password" v-model="currentPassword" class="input-box mb-4">

        <label for="new-password" class="mt-4">변경할 비밀번호</label>
        <input type="password" id="new-password" v-model="newPassword" class="input-box mb-4">

        <label for="confirm-password" class="mt-4">변경할 비밀번호 재확인</label>
        <input type="password" id="confirm-password" v-model="confirmPassword" class="input-box mb-4">

        <button @click="handleButtonClick($event, changePassword)" class="mt-4 bg-blue-500 text-white p-2 rounded clickable text-sm">비밀번호 변경</button>
    </div>
</template>

<script>
export default {
    methods: {
        goPrev() {
            this.$router.go(-1);  // 이전 페이지로 돌아가는 동작
        },
        handleButtonClick(event, action) {
            const button = event.currentTarget;
            button.style.backgroundColor = '#224f96'; // 클릭 시 색상 변경
            setTimeout(() => {
                button.style.backgroundColor = ''; // 원래 색상으로 복구
            }, 200); // 0.2초 후 원래 색상으로 복구

            // 버튼의 원래 동작 수행
            action();
        },
    },
};
</script>

<script setup>
import { ref, computed } from 'vue';
import { useUserStore } from '@/store/user-store';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const userName = computed(() => userStore.user?.username || 'Guest');
const userEmail = computed(() => userStore.user?.email || 'No Email response');

const newUsername = ref('');
const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

const checkUsername = async () => {
    // 여기에 중복확인 API 호출 로직 작성
    console.log(`Checking username: ${newUsername.value}`);
};

const changePassword = async () => {
    if (newPassword.value !== confirmPassword.value) {
        alert('새로 입력한 비밀번호가 서로 일치하지 않습니다.');
        return;
    }

    // 비밀번호 변경 API 호출 로직 작성
    console.log(`Changing password for ${userName.value}`);
};

const logout = async function () {
    const result = await userStore.logout();

    if (result) {
        router.push('/'); // router 객체를 사용하여 경로 변경
    }
};
</script>

<style scoped>
#upper-compo {
    justify-content: space-between;
    margin: 0 2rem 0 2rem;
    display: flex;
    margin-bottom: 1rem;
    margin-top: 1rem;
    padding-bottom: 0;
    border-bottom: 1px solid #e5e5e5; /* 선 추가 */
    border-top: 1px solid #e5e5e5;
}

/* 입력 박스 스타일링 */
.input-box {
    border: 1.4px solid rgba(0, 0, 0, 0.117); /* 살짝 두껍게 */
    padding: 0.5rem 0.75rem; /* padding 조정으로 얇고 세련된 느낌 */
    border-radius: 0.375rem; /* 약간 둥근 모서리 */
    width: 100%; /* 전체 너비 차지 */
    transition: border-color 0.3s; /* 호버 시 부드러운 전환 */
}

.input-box:focus {
    outline: none; /* 기본 아웃라인 제거 */
    border-color: #3b82f6; /* 포커스 시 파란색 테두리 */
}

/* 버튼 클릭 및 호버 효과 추가 */
.clickable {
    transition: background-color 0.2s ease-in-out; /* 트랜지션 추가 */
}

.clickable:hover {
    background-color: #224f96; /* hover 시 색상 조금 어둡게 */
}

.clickable:active {
    background-color: #224f96; /* 클릭 시 색상 어둡게 */
}

/* 텍스트 크기와 간격 조정 */
.text-sm {
    font-size: 0.9rem; /* 텍스트 크기를 작게 조정 */
}

.mb-4 {
    margin-bottom: 0.7rem; /* 요소 간의 간격을 벌림 */
}

.mt-4 {
    margin-top: 1rem; /* 상단 간격 추가 */
}
</style>