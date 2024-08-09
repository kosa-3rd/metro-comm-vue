<template>
    <!-- 게시판 제목 -->
    <h2 class="text-2xl font-bold pl-4">1호선 게시판</h2>
    <div class="border rounded-lg p-4 mt-2 ml-4 mr-4">

    <!-- 실시간 인기글 -->
        <p class="text-sm text-black-600 pt-1">1호선 실시간 인기 글</p>
        <div class="border rounded-lg p-4 mt-2 bg-gray-100">
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
        class="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white py-2 px-3 rounded-full shadow-lg font-bold"
    >
    <span class="material-icons mr-2 write-icon">edit</span> 
    <span class="text-sm align-middle">글 쓰기</span>
    </button>
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
                // 다른 게시글 데이터 추가
            ]
        };
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
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
</style>
