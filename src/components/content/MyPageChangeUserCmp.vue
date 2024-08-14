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
            <h2 class="text-2xl font-semibold">{{ nickName }}</h2>
            <p class="text-gray-500">{{ userEmail }}</p>
        </div>
        <button class="text-gray-500 font-semibold" @click="logout">로그아웃</button>
    </div>

    <!-- nickname 수정 섹션 -->
    <div class="px-4 py-4">
        <label for="nickname">닉네임 수정</label>
        <input type="text" id="nickname" v-model="newNickname" class="input-box data-input mb-4" placeholder="닉네임 (2~12자 한글, 대소문자, 숫자)" @input="validateNickname(newNickname)">
        <p v-if="showError.nickname" class="text-red-500 text-sm mt-1 mb-4">{{ nicknameErrorMsg }}</p>
        <button @click="handleButtonClick($event, changeNickname)" class="mt-4 bg-blue-500 text-white p-2 rounded clickable text-sm">닉네임 변경</button>
    </div>

    <!-- 비밀번호 변경 섹션 -->
    <div class="px-4 py-4">
        <h2 class="text-xl font-semibold mb-10">비밀번호 변경</h2>

        <!-- 현재 비밀번호 입력란 -->
        <label for="current-password">현재 비밀번호 입력</label>
        <input type="password" id="current-password" v-model="currentPassword" class="input-box data-input mb-4" @input="clearError('current')">
        <p v-if="showError.current" class="text-red-500 text-sm mt-1 mb-4">비밀번호를 입력해 주세요.</p>

        <!-- 구분 선 추가 -->
        <div class="divider"></div>

        <!-- 새 비밀번호 입력란 -->
        <label for="new-password" class="mt-4">새 비밀번호</label>
        <input type="password" id="new-password" v-model="newPassword" placeholder="비밀번호 (8~20자 대소문자, 숫자)" class="input-box data-input mb-4" @input="validatePassword(newPassword)">
        <p v-if="showError.new" class="text-red-500 text-sm mt-1 mb-4">{{ passwordErrorMsg }}</p>

        <!-- 새 비밀번호 확인 입력란 -->
        <label for="confirm-password" class="mt-4">새 비밀번호 확인</label>
        <input type="password" id="confirm-password" v-model="confirmPassword" class="input-box data-input mb-4" @input="clearError('confirm')">
        <p v-if="showError.confirm" class="text-red-500 text-sm mt-1 mb-4">새 비밀번호 확인란을 입력해 주세요.</p>

        <!-- 비밀번호 변경 버튼 -->
        <button @click="handleButtonClick($event, changePassword)" class="mt-4 bg-blue-500 text-white p-2 rounded clickable text-sm">비밀번호 변경</button>
    </div>
</template>

<script>
import { ref, computed } from 'vue'; // Vue의 ref와 computed API 가져오기
import { useUserStore } from '@/store/user-store'; // 사용자 정보 관리를 위한 store 가져오기
import { useRouter } from 'vue-router'; // Vue Router 가져오기
import axios from 'axios'; // Axios를 통해 비밀번호 변경 API 호출

export default {
    setup() {
        // store 및 router 객체 가져오기
        const userStore = useUserStore();
        const router = useRouter();

        // 사용자 이름과 이메일을 computed로 가져오기
        const nickName = computed(() => userStore.user?.nickname || 'Guest');
        const userEmail = computed(() => userStore.user?.email || 'No Email response');
        const authToken = computed(() => userStore.getAuth); // 인증 토큰 가져오기

        // form에서 사용할 ref 상태 정의
        const newNickname = ref('');
        const currentPassword = ref('');
        const newPassword = ref('');
        const confirmPassword = ref('');
        const passwordErrorMsg = ref('');
        const nicknameErrorMsg = ref(''); // 닉네임 에러 메시지 상태
        const showError = ref({
            current: false,
            new: false,
            confirm: false,
            nickname: false,  // 추가된 필드
        }); // 각 필드의 에러 상태를 관리하는 객체

        // 닉네임 유효성 검사 함수
        const validateNickname = (nickname) => {
            if (!nickname) {
                showError.value.nickname = true;
                nicknameErrorMsg.value = '변경하실 닉네임을 입력해 주세요.';
                return false;
            }

            const isValid = /^[a-zA-Z가-힣0-9]{2,12}$/.test(nickname);

            if (isValid) {
                showError.value.nickname = false;
                nicknameErrorMsg.value = '';
            } else {
                showError.value.nickname = true;
                nicknameErrorMsg.value = '닉네임 형식이 올바르지 않습니다.';
            }

            return isValid;
        };

        // 닉네임 변경 함수
        const changeNickname = async () => {
            if (!validateNickname(newNickname.value)) {
                return;
            }

            try {
                // 닉네임 변경 API 호출
                const response = await axios.post('/api/users/api입력해주시오 닉변', {
                    newNickname: newNickname.value,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: authToken.value,
                    },
                });

                if (response.data.success) {
                    alert('닉네임이 성공적으로 변경되었습니다.');

                    // Pinia 스토어의 닉네임을 업데이트
                    userStore.user.nickname = newNickname.value;
                } else {
                    alert('닉네임 변경에 실패했습니다.');
                }
            } catch (error) {
                console.error('닉네임 변경 실패:', error);
                alert('닉네임 변경 중 오류가 발생했습니다.');
            }
        };

        // 비밀번호 유효성 검사 함수
        const validatePassword = (password) => {
            if (!password) {
                showError.value.new = true;
                passwordErrorMsg.value = '새 비밀번호를 입력해 주세요.';
                return false;
            }

            const isValid = /^[a-zA-Z0-9]{8,20}$/.test(password);

            if (isValid) {
                showError.value.new = false;
                passwordErrorMsg.value = '';
            } else {
                showError.value.new = true;
                passwordErrorMsg.value = '형식이 올바르지 않습니다';
            }

            return isValid;
        };

        // 비밀번호 변경 함수
        const changePassword = async () => {
            // 각 필드의 유효성 검사
            if (!currentPassword.value) {
                showError.value.current = true;
            }
            if (!validatePassword(newPassword.value)) {
                showError.value.new = true;
            }
            if (!confirmPassword.value) {
                showError.value.confirm = true;
            }

            // 유효성 검사 실패 시 함수 종료
            if (!currentPassword.value || !newPassword.value || !confirmPassword.value) {
                return;
            }

            try {
                const response = await axios.get('/api/users/validate/password', {
                    params: {
                        userEmail: currentPassword.value, // 여기서 userEmail은 실제로는 비밀번호
                    },
                    headers: {
                        Authorization: authToken.value,
                    },
                });

                if (!response.data) { // 서버 응답이 false일 때
                    alert('현재 비밀번호가 일치하지 않습니다.');
                    return;
                }
            } catch (error) {
                console.error('현재 비밀번호 확인 실패:', error);
                alert('비밀번호 확인 중 오류가 발생했습니다.');
                return;
            }

            // 비밀번호 변경 API 호출
            const reqData = {
                password: newPassword.value,
            };

            try {
                await axios.patch('/api/users/password', reqData, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: authToken.value,
                    },
                });
                alert('비밀번호가 성공적으로 변경되었습니다.');
                router.push('/'); // 비밀번호 변경 후 홈으로 이동
            } catch (error) {
                console.error('비밀번호 변경 실패:', error);
                alert('비밀번호 변경에 실패했습니다.');
            }
        };

        // 로그아웃 함수
        const logout = async function () {
            const result = await userStore.logout();

            if (result) {
                router.push('/'); // 로그아웃 후 홈으로 이동
            }
        };

        // 에러 메시지 초기화 함수
        const clearError = (field) => {
            showError.value[field] = false; // 입력이 발생하면 해당 필드의 에러 상태 초기화
        };

        return {
            nickName,
            userEmail,
            newNickname,
            currentPassword,
            newPassword,
            confirmPassword,
            showError,
            passwordErrorMsg,
            nicknameErrorMsg, // 추가된 변수
            validatePassword,
            validateNickname, // 추가된 함수
            changePassword,
            changeNickname, // 닉네임 변경 함수 추가
            logout,
            clearError,
        };
    },
    methods: {
        // 이전 페이지로 돌아가는 함수
        goPrev() {
            this.$router.go(-1); // 이전 페이지로 돌아가는 동작
        },
        // 버튼 클릭 시 동작 처리 함수
        handleButtonClick(event, action) {
            const button = event.currentTarget;
            button.style.backgroundColor = '#224f96'; // 클릭 시 버튼 색상 변경
            setTimeout(() => {
                button.style.backgroundColor = ''; // 일정 시간 후 원래 색상으로 복구
            }, 200); // 0.2초 후 원래 색상으로 복구

            action(); // 버튼의 원래 동작 수행
        },
    },
};
</script>

<style scoped>
/* 상단 컴포넌트 스타일링 */
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
    border: 1.4px solid rgba(0, 0, 0, 0.117); 
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem; /* 모서리 */
    width: 100%; /* 전체 너비 차지 */
    transition: border-color 0.3s; /* 호버 시 부드러운 전환 */
}

/* placeholder 스타일링 */
.data-input::placeholder {
    color: #0000004e;
    font-size: 0.775rem; 
    opacity: 1; /* 투명도 */
}

/* 입력 박스 포커스 시 테두리 색상 변경 */
.input-box:focus {
    outline: none; /* 기본 아웃라인 제거 */
    border-color: #3b82f6; /* 포커스 시 파란색 테두리 */
}

.input-box:hover {
  border-color: #3b82f6; /* 호버 시 약간 더 진한 파란색 테두리 */
}

/* 구분 선 스타일링 */
.divider {
    border-bottom: 1px solid #e5e5e5; 
    margin-bottom: 1.5rem; 
    margin-top: 0.5rem;
}

/* 버튼 클릭 및 호버 효과 추가 */
.clickable {
    transition: background-color 0.2s ease-in-out; /* 트랜지션 추가 */
}

/* hover 시 버튼 색상 어둡게 */
.clickable:hover {
    background-color: #224f96;
}

/* 클릭 시 버튼 색상 어둡게 */
.clickable:active {
    background-color: #224f96;
}

/* 텍스트 크기와 간격 조정 */
.text-sm {
    font-size: 0.9rem; 
}

/* 요소 간의 간격 조정 */
.mb-4 {
    margin-bottom: 0.7rem; /* 하단 간격 */
}

.mt-4 {
    margin-top: 1rem; /* 상단 간격 */
}

.mt-1 {
    margin-top: -0.5rem; /* err 메세지 상단 마진 */
}

</style>