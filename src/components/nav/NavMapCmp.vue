<template>
  <div class="modal" @click.self="closeModal"> <!-- 바깥 영역 클릭 시 모달 닫기 -->
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h3>NavMap</h3>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeModal() {
      this.$router.back(); // 이전 페이지로 돌아가기
    }
  }
};
</script>

<style scoped>
.modal {
  @apply fixed inset-0 flex items-center justify-center bg-black bg-opacity-50;
  z-index: 1000; /* 다른 요소보다 앞에 나타나도록 높은 z-index 설정 */
  animation: fadeIn 0.2s ease-out; /* 천천히 열리는 애니메이션 */
}

.modal-content {
  position: relative;
  border-radius: 0.25rem;
  background-color: #ffffff;
  padding: 1.5rem;
  box-shadow: var(--tw-shadow);
  width: 90%;
  height: 700px;
  max-width: 900px;
  max-height: 700px;
  overflow-y: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.close {
  @apply absolute top-0 right-0 p-4 cursor-pointer;
  color: black;
}

h3 {
  @apply text-center;
}

@keyframes fadeIn {
  from {
    opacity: 0; /* 투명한 상태에서 시작 */
  }
  to {
    opacity: 1; /* 완전히 불투명하게 끝남 */
  }
}
</style>
