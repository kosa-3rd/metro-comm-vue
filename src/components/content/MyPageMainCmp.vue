<template>
  <div>
      <!-- 메뉴 항목들 -->
      <ul class="menu-list">
          <li class="menu-item border-b py-4 px-4 clickable">
            <router-link to="/my/posts" class="block w-full h-full">
              내가 작성한 글
            </router-link>
          </li>
          <li class="menu-item border-b py-4 px-4 clickable">
            <router-link to="/my/info" class="block w-full h-full">
              회원정보 수정
            </router-link>
          </li>
          <li class="menu-item border-b py-4 px-4 clickable">
            <router-link to="/my/withdraw" class="block w-full h-full">
              회원 탈퇴
            </router-link>
          </li>
      </ul>
  </div>
</template>

<style scoped>
.clickable {
    @apply transition duration-200 ease-in-out;
}

.clickable:active {
    @apply bg-gray-300;
}
</style>