<template>
    <div>
      <!-- 헤더 부분 -->
      <div id="upper-compo">
        <div id="upper-compo-left" class="w-6 mb-4 mt-4">
          <button @click="goPrev">
            <img src="../../assets/left_arrow.png" style="width: 1.5rem; height: 1.5rem" />
          </button>
        </div>
        <div id="upper-compo-center">
          <h3 id="sign-info" class="text-xl font-semibold text-center mb-4 mt-4">내가 작성한 글</h3>
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
  
      <!-- 게시글 목록 -->
      <ul class="divide-y divide-gray-200 mt-4 px-4">
        <transition-group name="zoom" tag="div">
          <li v-for="(post, index) in visiblePosts" :key="index" class="p-4 border rounded-lg shadow-sm mb-4">
            <div class="flex justify-between items-start">
              <div class="flex-grow">
                <div class="flex justify-between items-center">
                  <p class="font-bold text-sm">제목</p>
                  <div class="flex space-x-2 text-xs text-gray-500">
                    <button @click="editPost(post)" class="hover:underline">수정</button>
                    <span>|</span>
                    <button @click="deletePost(post.id)" class="hover:underline">삭제</button>
                  </div>
                </div>
                <p class="mt-1 text-sm">{{ post.title }}</p>
                <div class="flex justify-between items-center text-xs text-gray-500 mt-4">
                  <div>
                    <p>{{ post.author }} | {{ post.date }}</p>
                  </div>
                  <div class="flex items-center text-red-500">
                    <span class="material-icons mr-1 text-xs">thumb_up</span>
                    <span class="likes-count">{{ post.likes }}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </transition-group>
      </ul>
  
      <!-- 더보기/펼치기 버튼 -->
      <div class="flex justify-center mt-4">
        <button @click="toggleMenu" class="toggle-btn text-gray-500 font-thin text-xs">
          {{ isExpanded ? '접기' : '펼치기' }}
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { useUserStore } from '@/store/user-store';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const userStore = useUserStore();
      const router = useRouter();
  
      const userName = computed(() => userStore.user?.username || 'Guest');
      const userEmail = computed(() => userStore.user?.email || 'No Email response');
  
      const posts = ref([
        { id: 1, title: '제목 1', date: '08/04 22:00', author: 'username', likes: 340 },
        { id: 2, title: '제목 2', date: '08/04 22:00', author: 'username', likes: 340 },
        { id: 3, title: '제목 3', date: '08/04 22:00', author: 'username', likes: 340 },
        { id: 4, title: '제목 4', date: '08/04 22:00', author: 'username', likes: 340 },
        { id: 5, title: '제목 5', date: '08/04 22:00', author: 'username', likes: 340 },
        { id: 6, title: '제목 6', date: '08/04 22:00', author: 'username', likes: 340 },
        { id: 7, title: '제목 7', date: '08/04 22:00', author: 'username', likes: 340 },
        { id: 8, title: '제목 8', date: '08/04 22:00', author: 'username', likes: 340 },
        // 더 많은 게시글이 있을 수 있음
      ]);
  
      const isExpanded = ref(false); // 게시글 목록이 확장되었는지 여부
  
      const goPrev = () => {
        router.go(-1);
      };
  
      const logout = async () => {
        const result = await userStore.logout();
        if (result) {
          router.push('/');
        }
      };
  
      const editPost = (post) => {
        console.log(`Editing post with id: ${post.id}`);
      };
  
      const deletePost = (postId) => {
        console.log(`Deleting post with id: ${postId}`);
        posts.value = posts.value.filter(post => post.id !== postId);
      };
  
      const toggleMenu = () => {
        isExpanded.value = !isExpanded.value;
      };
  
      const visiblePosts = computed(() => {
        return isExpanded.value ? posts.value : posts.value.slice(0, 3); // 펼치기/접기 여부에 따라 게시글 표시 수 조정
      });
  
      return {
        userName,
        userEmail,
        posts,
        visiblePosts,
        isExpanded,
        goPrev,
        logout,
        editPost,
        deletePost,
        toggleMenu
      };
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
    border-bottom: 1px solid #e5e5e5;
    border-top: 1px solid #e5e5e5;
  }
  
  .material-icons {
    font-size: 16px;
  }
  
  /* 버튼 스타일 */
  .toggle-btn {
    background-color: transparent;
    color: #424242;
    padding: 8px 12px;
    margin: 5px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-size: 12px;
    font-weight: 300;
    white-space: nowrap;
    min-width: 80px;
    text-align: center;
    text-decoration: underline;
  }
  
  .clickable {
    transition: background-color 0.2s ease-in-out;
  }
  
  .clickable:active {
    background-color: #e0e0e0;
  }
  </style>