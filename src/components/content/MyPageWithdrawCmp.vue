<template>
  <div>
    <!-- 헤더 부분 (뒤로가기 및 페이지 제목) -->
    <div id="upper-compo">
      <div id="upper-compo-left" class="w-6 mb-4 mt-4">
        <button @click="goPrev">
          <img src="../../assets/left_arrow.png" style="width: 1.5rem; height: 1.5rem" />
        </button>
      </div>
      <div id="upper-compo-center">
        <h3 id="sign-info" class="text-xl font-semibold text-center mb-4 mt-4">회원 탈퇴</h3>
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

    <!-- 회원탈퇴 양식 -->
    <div class="px-4 py-4">
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label class="form-label">회원 탈퇴 이유에 대해 설명해주시오. <span class="text-red-500">*필수</span></label>
          <div v-for="(reason, index) in reasons" :key="index" class="reason-option">
            <input type="radio" :id="'reason' + index" v-model="selectedReason" :value="reason" />
            <label :for="'reason' + index">{{ reason }}</label>
          </div>
        </div>

        <div class="mb-4">
          <label for="otherReason" class="form-label">기타 입력사항</label>
          <textarea id="otherReason" v-model="otherReason" maxlength="200" placeholder="기타 이유를 입력하세요" class="input-box"></textarea>
        </div>

        <div class="mb-4">
          <label for="password" class="form-label">비밀번호 확인</label>
          <input type="password" id="password" v-model="password" required class="input-box" />
        </div>

        <div class="mb-4">
          <label for="confirmPassword" class="form-label">비밀번호 재확인</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" required class="input-box" />
        </div>

        <button type="submit" class="bg-blue-500 text-white p-2 rounded clickable">탈퇴하기</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useUserStore } from '@/store/user-store';
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';

export default {
  setup() {
    const userStore = useUserStore();
    const router = useRouter();
    const nickName = computed(() => userStore.user?.nickname || 'Guest');
    const userEmail = computed(() => userStore.user?.email || 'No Email response');
    const authToken = computed(() => userStore.getAuth); // 인증 토큰 가져오기

    const selectedReason = ref('');
    const otherReason = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const reasons = ['해당 서비스가 마음에 들지 않아서.', '디자인이 별로여서.', '해당 서비스가 도움이 되지 않아서.', '더 나은 서비스가 존재해서.', '이유 없음.'];

    const goPrev = () => {
      router.go(-1);
    };

    const logout = async () => {
      const result = await userStore.logout();
      if (result) {
        router.push('/');
      }
    };

    const submitForm = async () => {
      if (password.value !== confirmPassword.value) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }
      if (!selectedReason.value) {
        alert('탈퇴 사유를 선택해주세요.');
        return;
      }

      // 현재 비밀번호 확인 API 호출
      try {
        const response = await axios.get('/api/users/validate/password', {
          params: {
            userEmail: password.value, // 여기서 userEmail은 실제로는 비밀번호
          },
          headers: {
            Authorization: authToken.value,
          },
        });

        if (!response.data) { // 서버 응답이 false일 때
          alert('현재 비밀번호가 일치하지 않습니다.');
          return;
        }

        // 비밀번호 확인이 성공하면, 서버로 탈퇴 요청을 보냄
        await withdraw();
      } catch (error) {
        console.error('현재 비밀번호 확인 실패:', error);
        alert('비밀번호 확인 중 오류가 발생했습니다.');
        return;
      }
    };

    const withdraw = async () => {
      try {
        //탈퇴 API 호출 로직
        const response = await axios.delete('/api/users', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken.value, // 사용자 인증 토큰
      },
      data: {
        email: userEmail.value,
      },
    });

        if (response.data) {
          alert('성공적으로 탈퇴되었습니다.');
          logout();
        } else {
          alert('탈퇴에 실패했습니다.');
        }
      } catch (error) {
        console.error('탈퇴 실패:', error);
        alert('탈퇴 중 오류가 발생했습니다.');
      }
    };

    return {
      selectedReason,
      otherReason,
      password,
      confirmPassword,
      reasons,
      nickName,
      userEmail,
      goPrev,
      logout,
      submitForm,
    };
  },
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
  border-bottom: 1px solid #e5e5e5;
  border-top: 1px solid #e5e5e5;
}

/* 라벨 밑에 간격 추가 */
.form-label {
  display: block;
  margin-bottom: 0.5rem; /* 라벨 밑에 간격 추가 */
  font-weight: 500; /* 텍스트를 볼드체로 변경 */
}

/* 입력 박스 스타일링 */
.input-box {
  border: 1.4px solid rgba(0, 0, 0, 0.1); /* 살짝 더 두껍고 더 명확한 색상 */
  padding: 0.5rem 0.75rem; /* padding을 더 넓게 해서 여유로운 느낌 */
  border-radius: 0.375rem;
  width: 100%; /* 전체 너비 차지 */
  font-size: 1rem; /* 텍스트 크기 약간 키움 */
  transition: border-color 0.3s ease, box-shadow 0.3s ease; /* 부드러운 전환 */
}

.input-box:focus {
  outline: none; /* 기본 아웃라인 제거 */
  border-color: #2563eb; /* 포커스 시 더 진한 파란색 테두리 */
  box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.3); /* 포커스 시 파란색 그림자 */
}

.input-box:hover {
  border-color: #3b82f6; /* 호버 시 약간 더 진한 파란색 테두리 */
}

/* 비활성화된 입력 박스 스타일링 */
.input-box:disabled {
  background-color: #f3f4f6; /* 비활성화 시 배경색 회색 */
  border-color: rgba(0, 0, 0, 0.1); /* 테두리 연하게 */
  cursor: not-allowed; /* 비활성화 시 커서 모양 변경 */
  opacity: 0.6; /* 약간 투명하게 */
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

.reason-option label {
  margin-left: 1rem;
    font-size: 0.9rem;
    color: #000000b0;
}

.py-4 {
    padding-top: 1rem;
    padding-bottom: 4rem;
}
</style>