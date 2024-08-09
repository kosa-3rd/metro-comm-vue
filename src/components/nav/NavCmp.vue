<template>
  <nav class="nav bg-white border-t border-gray-300 flex justify-around items-center">
    <router-link 
      to="/navmap" 
      class="nav-item flex flex-col items-center flex-1 clickable"
      @click="setActive('route')"
      exact
      :class="{ active: isRouteActive }"
    >
      <font-awesome-icon :icon="['fas', 'code-branch']" class="nav-icon" />
      <p class="normal-text font-bold">노선도</p>
    </router-link>
    <router-link 
      to="/" 
      class="nav-item flex flex-col items-center flex-1 clickable"
      @click="setActive('home')"
      exact
      :class="{ active: isHomeActive }"
    >
      <font-awesome-icon :icon="['fas', 'train']" class="nav-icon" />
      <p class="normal-text font-bold">HOME</p>
    </router-link>
    <router-link 
      to="/mypage" 
      class="nav-item flex flex-col items-center flex-1 clickable"
      @click="setActive('mypage')"
      exact
      :class="{ active: isMyPageActive }"
    >
      <font-awesome-icon :icon="['far', 'user']" class="nav-icon" />
      <p class="normal-text font-bold">마이페이지</p>
    </router-link>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      activeItem: ''  // 현재 활성화된 아이템을 저장
    };
  },
  computed: {
    isRouteActive() {
      return this.activeItem === 'route';
    },
    isHomeActive() {
      return this.activeItem === 'home';
    },
    isMyPageActive() {
      return this.activeItem === 'mypage';
    }
  },
  methods: {
    setActive(item) {
      this.activeItem = item;
    }
  }
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
  color: rgb(51, 51, 198); /* 선택된 아이콘을 파란색으로 설정 */
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