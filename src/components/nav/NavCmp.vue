<template>
  <nav class="nav bg-white border-t border-gray-300 flex justify-around items-center">
    <div @click="openModal" class="nav-item flex flex-col items-center flex-1"> <!-- 각 아이템을 flex-1로 비율 맞추기 -->
      <img :src="require('@/assets/route.png')" alt="노선도" class="nav-icon">
      <p class="normal-text font-bold">노선도</p>
    </div>
    <router-link to="/" class="nav-item flex flex-col items-center flex-1"> <!-- 홈으로 이동 -->
      <img :src="require('@/assets/home.png')" alt="HOME" class="nav-icon">
      <p class="normal-text font-bold">HOME</p>
    </router-link>
    <router-link to="/mypage" class="nav-item flex flex-col items-center flex-1"> <!-- 마이페이지로 이동 -->
      <img :src="require('@/assets/mypage.png')" alt="마이페이지" class="nav-icon">
      <p class="normal-text font-bold">마이페이지</p>
    </router-link>
    <nav-modal v-if="isModalOpen" @close="closeModal"></nav-modal> <!-- 모달 컴포넌트 -->
  </nav>
</template>

<script>
import NavModal from './NavMapCmp.vue';

export default {
  components: {
    NavModal
  },
  data() {
    return {
      isModalOpen: false
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    }
  }
};
</script>

<style scoped>
.nav {
  @apply fixed h-20 bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-white z-10 border-t border-gray-300;
}

.nav-item {
  @apply flex flex-col items-center flex-1 cursor-pointer;
}

.nav-item p {
  @apply mt-2 text-sm font-bold;
}

.nav-icon {
  @apply h-8 md:h-10;
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