<template>
    <!-- 게시판 제목 -->
    <h2 class="text-2xl font-bold pl-4">1호선 게시판</h2>
    <div class="border rounded-lg p-4 mt-2 ml-4 mr-4 mb-20">

        <!-- 실시간 인기글 -->
        <p class="text-sm text-gray-600 pt-1">1호선 실시간 인기 글</p>
        <div class="border rounded-lg p-4 mt-2 bg-gray-200">
            <div class="flex justify-between items-start">
                <div class="flex-grow">
                    <p class="font-bold">제목</p>
                    <p class="mt-1">지하철 염북동 빌런 출몰했다.</p>
                    <div class="flex justify-between items-center text-xs text-gray-500 mt-4">
                        <p>08/04 22:00 | username</p>
                        <div class="flex items-center text-red-500">
                            <button class="material-icons mr-1 text-xs">thumb_up</button> 340
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 게시글 목록 -->
        <ul class="divide-y divide-gray-200 mt-4">
            <li v-for="(post, index) in posts" :key="index" class="p-4">
                <div class="flex justify-between items-start">
                    <div class="flex-grow">
                        <p class="font-bold text-sm">제목</p>
                        <p class="mt-1 text-sm">{{ post.title }}</p>
                        <div class="flex justify-between items-center text-xs text-gray-500 mt-4">
                            <p>{{ post.date }} | {{ post.author }}</p>
                            <div class="flex items-center text-red-500">
                                <button class="material-icons mr-1 text-xs">thumb_up</button> {{ post.likes }}
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>

    </div>

    <!-- 글 쓰기 Button -->
    <button
        @click="openModal"
        class="fixed bottom-28 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white py-2 px-4 rounded-full shadow-lg font-bold z-50"
    >
        <span class="material-icons mr-2 write-icon">edit</span> 
        <span class="text-sm align-middle">글 쓰기</span>
    </button>

    <!-- 글 쓰기 Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50" @click.self="closeModal">
        <div class="bg-white w-full max-w-[800px] p-6 rounded-t-lg shadow-lg animate-slide-up relative" @click.stop>
            <div class="flex justify-center items-center mb-10">
                <h2 class="text-xl font-bold">게시글 작성</h2>
                <button 
                    @click="closeModal"
                    class="absolute right-7 top-2 close-icon"
                >
                    <span class="material-icons">close</span>
                </button>
            </div>

            <!-- 드롭다운 메뉴 -->
            <select v-model="selectedCategory" class="w-[180px] p-2 border rounded-lg mb-4">
                <option value="" disabled>호선을 선택하세요</option>
                <option value="line1">1호선</option>
                <option value="line2">2호선</option>
                <option value="line3">3호선</option>
                <option value="line3">4호선</option>
                <option value="line3">5호선</option>
                <option value="line3">6호선</option>
                <option value="line3">7호선</option>
                <option value="line3">8호선</option>
            </select>

            <!-- 게시글 작성 텍스트 에리어 -->
            <textarea
                v-model="newPostContent"
                class="w-full border rounded-lg p-2"
                rows="5"
                placeholder="게시글을 작성해 주세요"
                @input="checkLength"
                maxlength="100"
            ></textarea>
            <div class="text-right text-sm text-gray-500">{{ newPostContent.length }}/100</div>

            <!-- 작성하기 버튼 -->
            <div class="relative h-24">
                <button @click="submitPost" class="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white w-60 py-2 px-4 rounded-lg">
                    작성하기
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            posts: [
                {
                    title: '1호선 연착입니다~~~~~~!!!!!!!!',
                    author: 'username',
                    date: '08/04 22:00',
                    likes: 340
                },
                {
                    title: '최대 몇 글자까지 작성 가능케할지 고민입니다. 글자 수를 적게 지정 해놓는 게 좋을 듯 싶은데',
                    author: 'username',
                    date: '08/04 22:00',
                    likes: 340
                },
                {
                    title: '최대 몇 글자까지 작성 가능케할지 고민입니다. 글자 수를 적게 지정 해놓는 게 좋을 듯 싶은데',
                    author: 'username',
                    date: '08/04 22:00',
                    likes: 340
                },
                // 다른 게시글 데이터 추가
            ],
            isModalOpen: false, // 모달 상태 변수
            selectedCategory: '', // 선택한 카테고리
            newPostContent: '' // 새 게시글 내용
        };
    },
    methods: {
        openModal() {
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
        },
        submitPost() {
            if (this.newPostContent.trim() && this.selectedCategory) {
                this.posts.unshift({
                    title: `${this.selectedCategory} - ${this.newPostContent}`,
                    author: 'username',
                    date: new Date().toLocaleString(),
                    likes: 0
                });
                this.newPostContent = '';
                this.selectedCategory = '';
                this.closeModal();
            } else {
                alert("호선과 내용을 모두 입력해 주세요.");
            }
        },
        // 글자 수 제한
        checkLength() {
            if (this.newPostContent.length > 100) {
                this.newPostContent = this.newPostContent.slice(0, 100);
            }
        }
    }
};
</script>

<style scoped>
.material-icons {
    font-size: 1rem;
}
.write-icon {
    font-size: 1.5rem;
    vertical-align: middle;
}
.close-icon {
    font-size: 2rem;
}
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

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
</style>
