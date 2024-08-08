<template>
    <div>
        <div class="header  flex items-center">
            <!-- 왼쪽 주황색 긴 바 -->
            <div class="flex-grow"></div>
            
            <!-- 상단 헤더 -->
            <div class="logo">
                <span class="h-text font-bold text-3xl">{{ lineName }}</span>
                <span class="text-sm">METRO COMMUNITY</span>
            </div>
            
            <!-- 오른쪽 주황색 긴 바 -->
            <div class="flex-grow"></div>
        </div>

        

        <!-- 전철 전광판 구역 -->
        <div class="train-arrival">
            <span> train-arrival area</span> <br />
            <span class="small-tex"> small-tex </span>
            <span class="normal-text"> .normal-text </span> <br />
            <sapn class="h-large-text"> h-large-text </sapn> <br />
            <span class="h-mid-text"> .h-mid-text </span>
        </div>

        <!-- 메뉴 버튼 -->
        <div class="grid grid-cols-5 gap-1 p-2 bg-gray-200">
            <button v-for="menu in visibleMenus" :key="menu" class="station-btn">
                {{ menu }}
            </button>
        </div>
        <div class="flex justify-end pr-2">
            <button @click="toggleMenu" class="toggle-btn">
                {{ isExpanded ? '접기' : '펼치기' }}
            </button>
        </div>

        <!-- 게시판 제목 -->
        <h2 class="h-mid-text font-bold p-4 border-b">1호선 게시판</h2>

        <!-- 게시글 목록 -->
        <ul class="divide-y divide-gray-200">
            <li v-for="(post, index) in posts" :key="index" class="p-4">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="normal-text">{{ post.title }}</p>
                        <p class="small-text text-gray-500">{{ post.author }} | {{ post.date }}</p>
                    </div>
                    <span class="text-red-500 text-sm">{{ post.likes }}</span>
                </div>
            </li>
        </ul>

        <!-- 글 쓰기 Button -->
        <button
            class="write-btn fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white py-2 px-4 rounded-full shadow-lg font-bold"
        >
            글 쓰기
        </button>

        <!-- 하단 네비게이션 -->
        <div class="nav">
            <button v-for="nav in ['노선도', 'HOME', '게시판']" :key="nav" class="text-blue-600 text-sm">
                {{ nav }}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            lineName: '1호선',
            menus: [
                '버튼1',
                '버튼2',
                '버튼3',
                '버튼4',
                '버튼5',
                '버튼6',
                '버튼7',
                '버튼8',
                '버튼9',
                '버튼10',
                '버튼11',
                '버튼12',
                '버튼13',
                '버튼14',
                '버튼15',
                '버튼16',
                '버튼17',
                '버튼18',
                '버튼19',
                '버튼20',
                '버튼21',
            ],
            isExpanded: false,
            posts: [
                { title: '지하철 열차등 발견 좌물', author: 'username', date: '08/04 22:00', likes: '340' },
                { title: '제목', author: 'username', date: '08/04 22:00', likes: '340' },
                { title: '제목', author: 'username', date: '08/04 22:00', likes: '340' },
                {
                    title: '제목 최신글 공지 및 공지사항 게시글 제목이 긴 경우 처리 예시',
                    author: 'username',
                    date: '08/04 22:00',
                    likes: '340',
                },
                { title: '제목', author: 'username', date: '08/04 22:00', likes: '340' },
                { title: '제목', author: 'username', date: '08/04 22:00', likes: '340' },
                { title: '제목', author: 'username', date: '08/04 22:00', likes: '340' },
                { title: '제목', author: 'username', date: '08/04 22:00', likes: '340' },
            ],
        };
    },
    computed: {
        visibleMenus() {
            return this.isExpanded ? this.menus : this.menus.slice(0, 10);
        }
    },
    methods: {
        toggleMenu() {
            this.isExpanded = !this.isExpanded;
        },
        getStationColor(station) {
            const colors = {
                '2호선': 'bg-green-500',
                '3호선': 'bg-orange-500',
                '4호선': 'bg-blue-500',
                '5호선': 'bg-purple-500',
                '6호선': 'bg-yellow-500',
            };
            return colors[station] || 'bg-gray-500';
        },
    },
};
</script>

<style scoped>
.header {
    @apply flex items-center
}

.header .logo {
    @apply flex flex-col items-center justify-center rounded-3xl border-8 border-orange-500 bg-white px-20 py-2 text-black;
}

.header .flex-grow {
    @apply h-7 bg-orange-500;
}

.h-text {
    @apply text-3xl font-bold;
}

.station-btn {
    @apply bg-white text-blue-600 py-1 px-2 rounded text-xs min-h-16;
}

.toggle-btn {
    @apply bg-blue-500 text-white py-2 px-4 rounded mt-2;
}


.write-btn {
    @apply bg-gray-500 text-white py-2 px-4 rounded-full shadow-lg font-bold;
}
</style>