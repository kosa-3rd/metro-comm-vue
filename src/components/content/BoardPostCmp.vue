<!-- 
 담당자: 박상현
 시작 일자: 2024.08
 설명 : 역/노선별 게시판 컴포넌트
 ---------------------
 2024.08.13 양건모, 박상현 | 글 작성 기능 추가
 
 -->

<template>
  <div>
    <!-- 게시판 제목 -->
    <!-- <h2 class="text-2xl font-bold pl-4">1호선 게시판</h2> -->
    <div class="border rounded-lg p-4 mt-4 ml-4 mr-4 mb-20">
      <!-- 게시글 목록 -->
      <ul class="divide-y divide-gray-200 mt-4">
        <li v-for="(post, index) in posts" :key="index" class="p-4">
          <div class="flex justify-between items-start">
            <div class="flex-grow">
              <p class="font-bold text-sm">{{ post.station }}</p>
              <p class="mt-1 text-sm">{{ post.content }}</p>
              <div
                class="flex justify-between items-center text-xs text-gray-500 mt-4"
              >
                <p>{{ post.createdAt }} | {{ post.nickname }}</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <infinite-loading @infinite="infiniteHandler"> </infinite-loading>
    </div>

    <!-- 글 쓰기 Button -->
    <button
      v-if="isAuthenticated && !isHomePage"
      @click="openModal"
      class="fixed bottom-28 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white py-2 px-4 rounded-full shadow-lg font-bold z-50 hover:bg-gray-600"
    >
      <span class="material-icons mr-2 write-icon">edit</span>
      <span class="text-sm align-middle">글 쓰기</span>
    </button>

    <!-- 글 쓰기 Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50"
      @click.self="closeModal"
    >
      <div
        class="bg-white w-full max-w-[800px] p-6 rounded-t-lg shadow-lg animate-slide-up relative"
        @click.stop
      >
        <div class="flex justify-center items-center mb-10">
          <h2 class="text-xl font-bold">게시글 작성</h2>
          <button @click="closeModal" class="absolute right-7 top-2 close-icon">
            <span class="material-icons">close</span>
          </button>
        </div>

        <!-- 드롭다운 메뉴 -->
        <select
          v-model="selectedCategory"
          class="w-[180px] p-2 border rounded-lg mb-4"
          v-bind="stations"
        >
          <option value="" disabled>역을 선택하세요</option>
          <option
            v-for="station in stations"
            :key="station.id"
            :value="station.name"
          >
            {{ station.name }}
          </option>
        </select>

        <!-- 게시글 작성 텍스트 에리어 -->
        <textarea
          v-model="newPostContent"
          class="w-full border rounded-lg p-2"
          rows="5"
          placeholder="게시글을 작성해 주세요"
          @input="checkLength"
          maxlength="100"
          v-bind="content"
        ></textarea>
        <div class="text-right text-sm text-gray-500">
          {{ newPostContent.length }}/100
        </div>

        <!-- 작성하기 버튼 -->
        <div class="relative h-24">
          <button
            @click="confirmSubmit"
            class="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white w-60 py-2 px-4 rounded-lg"
          >
            작성하기
          </button>
        </div>
      </div>
    </div>

    <!-- 확인 Modal -->
    <div
      v-if="isConfirmOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="closeConfirm"
    >
      <div
        class="bg-white w-full max-w-[350px] p-6 rounded-lg shadow-lg relative"
        @click.stop
      >
        <h2 class="text-lg font-bold mb-4">게시글 확인</h2>
        <p class="mb-6">게시글 작성을 완료하시겠습니까?</p>
        <div class="flex justify-center mt-6">
          <button
            @click="submitPost"
            class="bg-blue-500 text-white py-2 px-6 rounded-lg mr-4"
          >
            작성하기
          </button>
          <button
            @click="closeConfirm"
            class="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "@/store/user-store";
import { computed } from "vue";
import axios from "axios";
import InfiniteLoading from "infinite-loading-vue3-ts";
import { useRoute } from "vue-router";

export default {
  components: {
    InfiniteLoading,
  },
  setup() {
    const userStore = useUserStore();
    const route = useRoute();
    const isAuthenticated = computed(() => userStore.authenticated);
    const getAuth = computed(() => userStore.getAuth);
    const getNickname = computed(() => userStore.getNickname);
    const isHomePage = computed(() => route.path === "/");
    return {
      isAuthenticated,
      getAuth,
      getNickname,
      isHomePage,
    };
  },
  data() {
    return {
      reqData: {
        title: "전송",
        content: "",
        station: "",
      },
      stations: [],
      posts: [],
      isModalOpen: false,
      isConfirmOpen: false,
      selectedCategory: "",
      newPostContent: "",
      page: 0,
    };
  },
  methods: {
    async getStations() {
      try {
        const result = await axios.get(
          `/api/station/list?subwayId=${this.$route.params.subwayId}`
        );
        this.stations = result.data;
      } catch (err) {
        console.log(err);
      }
    },
    openModal() {
      this.isModalOpen = true;
      this.getStations();
    },
    closeModal() {
      this.isModalOpen = false;
    },
    confirmSubmit() {
      if (!this.newPostContent.trim() || !this.selectedCategory) {
        alert("역과 내용을 모두 입력해 주세요.");
      } else {
        this.isConfirmOpen = true;
      }
    },
    closeConfirm() {
      this.isConfirmOpen = false;
    },
    async submitPost() {
      try {
        const response = await axios.post(
          "/api/comments",
          {
            title: "전송",
            content: this.newPostContent,
            station: this.selectedCategory,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${this.getAuth}`, // Bearer 추가
            },
          }
        );
        console.log(response.data);

        const now = new Date();
        const kstOffset = 9 * 60 * 60 * 1000; // KST는 UTC+9
        const kstTime = new Date(now.getTime() + kstOffset);

        // KST 시간 포맷 'YYYY-MM-DDTHH:MM:SS.SSSSSS'
        const formattedDate =
          kstTime.toISOString().slice(0, 23) +
          kstTime.getMilliseconds().toString().padStart(3, "0");

        this.posts.unshift({
          content: `${this.newPostContent}`,
          nickname: this.getNickname, // 사용자 닉네임으로 수정
          createdAt: formattedDate,
          station: this.selectedCategory, // 선택된 역을 표시
        });

        this.newPostContent = "";
        this.selectedCategory = "";
        this.closeConfirm();
        this.closeModal();
      } catch (e) {
        console.log(this.getAuth.value);
        console.log(e);
      }
    },
    checkLength() {
      if (this.newPostContent.length > 100) {
        this.newPostContent = this.newPostContent.slice(0, 100);
      }
    },
    async infiniteHandler($state) {
      try {
        const station = this.$route.query.station;
        const subwayId = Number(this.$route.params.subwayId);
        const currentPage = this.page;
        const endpoint =
          "/api/comments" +
          (station
            ? `/station/${station}/${currentPage}`
            : `/subway/${subwayId}/${currentPage}`);

        const response = await axios.get(endpoint);

        if (response.data.posts.totalPages > this.page) {
          this.posts = [...this.posts, ...response.data.posts.content];
          this.page += 1;
          $state.loaded();
        } else {
          $state.complete();
        }
      } catch (error) {
        console.error(error);
        alert("err");
        $state.complete();
      }
    },
  },
};
</script>

<style scoped>
.write-icon {
  font-size: 1.5rem;
  vertical-align: middle;
}
.close-icon {
  font-size: 2rem;
}
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

/* 슬라이드 업 애니메이션 */
@keyframes slide-up {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slide-up 0.3s ease-out;
}

li p {
  word-break: break-all; /* 단어를 문자 단위로 자름 */
  overflow-wrap: break-word; /* 긴 단어가 있을 때 줄을 바꿈 */
  white-space: pre-wrap; /* 공백을 유지하면서 줄을 바꿈 */
  text-overflow: ellipsis; /* 텍스트가 넘칠 경우 '...'으로 표시 */
  overflow: hidden; /* 넘치는 텍스트를 숨김 */
}
</style>
