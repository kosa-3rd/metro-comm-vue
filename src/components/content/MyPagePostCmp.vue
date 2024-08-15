<!-- 
 담당자: 김호영, 양건모
 시작 일자: 2024.08. 15
 설명 : 나의 글 목록 컴포넌트
 ---------------------
 2024.08.14 김호영 | 페이지 디자인
 2024.08.15 양건모 | 기능 구현
 
 -->

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
                <h2 class="text-2xl font-semibold">{{ nickName }}</h2>
                <p class="text-gray-500">{{ userEmail }}</p>
            </div>
            <button class="text-gray-500 font-semibold" @click="logout">로그아웃</button>
        </div>

        <!-- 게시글 목록 -->
        <ul class="divide-y divide-gray-200 mt-4 px-4">
            <transition-group name="zoom" tag="div">
                <li v-for="(post, index) in posts" :key="index" class="p-4 border rounded-lg shadow-sm mb-4">
                    <div class="flex justify-between items-start">
                        <div class="flex-grow">
                            <div class="flex justify-between items-center">
                                <p class="font-bold text-sm">{{ post.station }}</p>
                                <div class="flex space-x-2 text-xs text-gray-500">
                                    <button @click="openModal(post)" class="hover:underline">수정</button>
                                    <span>|</span>
                                    <button @click="openDelete(post)" class="hover:underline">삭제</button>
                                </div>
                            </div>
                            <p class="mt-1 text-sm">{{ post.content }}</p>
                            <div class="flex justify-between items-center text-xs text-gray-500 mt-4">
                                <div>
                                    <p>{{ post.nickname }} | {{ post.createdAt }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <infinite-loading @infinite="infiniteHandler">
                    <template #spinner>
                        <div class="posts-end">
                            <h3>글을 불러오는 중입니다</h3>
                        </div>
                    </template>
                    <template #no-more>
                        <div class="posts-end">
                            <h3>마지막 글입니다</h3>
                        </div>
                    </template>
                    <template #no-results>
                        <div class="posts-end">
                            <h3>작성된 글이 없습니다.</h3>
                        </div>
                    </template>
                </infinite-loading>
            </transition-group>
        </ul>

        <!-- 글 수정 Modal -->
        <div
            v-if="isModalOpen"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50"
            @click.self="closeModal"
        >
            <div class="bg-white w-full max-w-[800px] p-6 rounded-t-lg shadow-lg animate-slide-up relative" @click.stop>
                <div class="flex justify-center items-center mb-10">
                    <h2 class="text-xl font-bold">게시글 작성</h2>
                    <button @click="closeModal" class="absolute right-7 top-2 close-icon">
                        <span class="material-icons">close</span>
                    </button>
                </div>

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
                <div class="text-right text-sm text-gray-500">{{ newPostContent.length }}/100</div>

                <!-- 수정하기 버튼 -->
                <div class="relative h-24">
                    <button
                        @click="confirmSubmit"
                        class="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white w-60 py-2 px-4 rounded-lg"
                    >
                        수정
                    </button>
                </div>
            </div>
        </div>

        <!-- 수정 확인 Modal -->
        <div
            v-if="isConfirmOpen"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            @click.self="closeConfirm"
        >
            <div class="bg-white w-full max-w-[350px] p-6 rounded-lg shadow-lg relative" @click.stop>
                <h2 class="text-lg font-bold mb-4">게시글 확인</h2>
                <p class="mb-6">게시글을 수정하시겠습니까?</p>
                <div class="flex justify-center mt-6">
                    <button @click="submitPost(post)" class="bg-blue-500 text-white py-2 px-6 rounded-lg mr-4">
                        수정하기
                    </button>
                    <button @click="closeConfirm" class="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg">취소</button>
                </div>
            </div>
        </div>

        <!--삭제 확인 Modal-->
        <div
            v-if="isDeleteOpen"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            @click.self="closeConfirm"
        >
            <div class="bg-white w-full max-w-[350px] p-6 rounded-lg shadow-lg relative" @click.stop>
                <h2 class="text-lg font-bold mb-4">게시글 삭제</h2>
                <p class="mb-6">게시글을 삭제하시겠습니까?</p>
                <div class="flex justify-center mt-6">
                    <button @click="DeletePost(post)" class="bg-blue-500 text-white py-2 px-6 rounded-lg mr-4">
                        삭제
                    </button>
                    <button @click="closeDelete" class="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg">취소</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useUserStore } from '@/store/user-store';
import { useRouter } from 'vue-router';
import axios from 'axios';
import InfiniteLoading from 'infinite-loading-vue3-ts';

export default {
    components: {
        InfiniteLoading,
    },
    setup() {
        const userStore = useUserStore();
        const router = useRouter();
        const isAuthenticated = computed(() => userStore.authenticated);
        const getAuth = computed(() => userStore.getAuth);
        const nickName = computed(() => userStore.user?.nickname || 'Guest');
        const userEmail = computed(() => userStore.user?.email || 'No Email response');

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

        const toggleMenu = () => {
            isExpanded.value = !isExpanded.value;
        };

        return {
            isAuthenticated,
            getAuth,
            nickName,
            userEmail,
            isExpanded,
            goPrev,
            logout,
            toggleMenu,
        };
    },
    data() {
        return {
            requData: {
                title: '전송',
                content: '',
            },
            posts: [],
            page: 0,
            isModalOpen: false,
            isConfirmOpen: false,
            isDeleteOpen: false,
            newPostContent: '',
            post: '',
        };
    },
    methods: {
        closeConfirm() {
            this.isConfirmOpen = false;
        },
        confirmSubmit() {
            if (!this.newPostContent.trim()) {
                alert('내용을 입력해 주세요.');
            } else {
                this.isConfirmOpen = true;
            }
        },
        async submitPost(post) {
            try {
                const response = await axios.put(
                    '/api/comments/update/' + post.id,
                    {
                        title: '전송',
                        content: this.newPostContent,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `${this.getAuth}`, // Bearer 추가
                        },
                    },
                );
                console.log(response.data);

                this.post.content = this.newPostContent;

                this.newPostContent = '';
                this.post = '';
                this.closeConfirm();
                this.closeModal();
            } catch (e) {
                console.log(this.getAuth.value);
                console.log(e);
            }
        },
        async DeletePost(post) {
            try {
                const response = await axios.delete('/api/comments/delete/' + post.id, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${this.getAuth}`, // Bearer 추가
                    },
                    data: {
                        title: '전송',
                    },
                });
                console.log(response.data);

                this.post.content = this.newPostContent;

                this.posts = this.posts.filter((p) => p.id !== post.id);
                this.newPostContent = '';
                this.post = '';
                this.closeDelete();
            } catch (e) {
                console.log(this.getAuth.value);
                console.log(e);
            }
        },
        openModal(post) {
            this.isModalOpen = true;
            this.newPostContent = post.content;
            this.post = post;
        },
        closeModal() {
            this.isModalOpen = false;
        },
        openDelete(post) {
            this.isDeleteOpen = true;
            this.post = post;
        },
        closeDelete() {
            this.isDeleteOpen = false;
        },
        checkLength() {
            if (this.newPostContent.length > 100) {
                this.newPostContent = this.newPostContent.slice(0, 100);
            }
        },
        async infiniteHandler($state) {
            try {
                const currentPage = this.page;
                const response = await axios.get('/api/comments/list/' + currentPage, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${this.getAuth}`,
                    },
                });

                if (response.data.posts.totalPages > this.page) {
                    const newPosts = response.data.posts.content.map((post) => ({
                        ...post,
                        createdAt: this.formatDate(new Date(post.createdAt)),
                    }));
                    this.posts = [...this.posts, ...newPosts];
                    this.page += 1;
                    $state.loaded();
                } else {
                    $state.complete();
                }
            } catch (error) {
                console.error(error);
                alert('err');
                $state.complete();
            }
        },
        formatDate(date) {
            const options = {
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            };
            return new Intl.DateTimeFormat('ko-KR', options).format(date).replace('. ', '-').replace('. ', ' ');
        },
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

.posts-end {
    width: 100%;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    border-radius: 5px;
    background-color: #f3f3f3;
    margin: auto;
    text-align: center;
}

.posts-end h3 {
    font-size: 1.1rem;
    color: #696969;
    @apply font-semibold;
}
</style>
