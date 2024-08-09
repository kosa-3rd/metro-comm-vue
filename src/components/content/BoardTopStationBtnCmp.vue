<template>
    <!-- 메뉴 버튼 -->
    <div>
        <transition-group name="slide" tag="div" class="grid grid-cols-4 gap-2 p-2">
            <button v-for="(menu, index) in visibleMenus" :key="index" class="station-btn shared-btn">
                {{ menu }}
            </button>
        </transition-group>
    </div>
    <div class="flex justify-end pr-2">
        <button @click="toggleMenu" class="toggle-btn shared-btn">
            {{ isExpanded ? '접기' : '펼치기' }}
        </button>
    </div>
</template>

<script>
export default {
    
    data() {
        return {
            menus: [
                '서울역',
                '금정역',
                '동대문',
                '로그인',
                '로그인',
                '서울역',
                '금정역',
                '동대문',
                '로그인',
                '로그인',
                '버튼1',
                '버튼이름은',
                '오육칠팔구',
                '213',
                '123213',
                'exn'
            ],
            isExpanded: false, // 기본 상태는 메뉴가 접힌 상태
        };
    },
    computed: {
        visibleMenus() {
            return this.isExpanded ? this.menus : this.menus.slice(0, 8);
        }
    },
    methods: {
        toggleMenu() {
            this.isExpanded = !this.isExpanded;
        },
    },

    
};
</script>

<style scoped>
.station-btn {
    background-color: rgb(79, 79, 194);
    color: white;
    padding: 8px 12px;
    margin: 5px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    white-space: nowrap; /* 줄바꿈 방지 */
    min-width: 80px; /* 버튼의 최소 너비 설정 */
    text-align: center; /* 텍스트 중앙 정렬 */
}

.station-btn:hover {
    background-color: #004080;
}

.toggle-btn {
    background-color: transparent;
    color: #424242;
    padding: 8px 12px;
    margin: 5px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    white-space: nowrap; /* 줄바꿈 방지 */
    min-width: 80px; /* 버튼의 최소 너비 설정 */
    text-align: center; /* 텍스트 중앙 정렬 */
    text-decoration: underline; /* 밑줄 추가 */
}

.toggle-btn:hover {
    background-color: transparent;
    color: #424242;
    text-decoration: underline; /* 호버 시에도 밑줄 유지 */
}

/* 슬라이드 인/아웃 애니메이션 */
 .slide-leave-active {
    transition: all 0.2s ease;
    position: relative; /* 애니메이션이 원활하게 작동되도록 position 설정 */
}

.slide-leave {
    transform: translateY(0); /* 시작 위치 */
    opacity: 1; /* 시작 상태는 불투명 */
}

.slide-leave-to {
    transform: translateY(-5px); /* 접기 시 위로 슬라이드 아웃 */
    opacity: 0; /* 사라질 때 투명해짐 */
}

@media (max-width: 500px) {
    .grid-cols-4 {
        grid-template-columns: repeat(4, 1fr);
    }

    .shared-btn {
        font-size: 12px; /* 작은 화면에서 글자 크기 조정 */
        padding: 6px 10px; /* 작은 화면에서 패딩 조정 */
        min-width: 70px; /* 작은 화면에서 버튼 너비 조정 */
    }
}

@media (max-width: 390px) {
    .grid-cols-4 {
        grid-template-columns: repeat(4, 1fr); /* 매우 작은 화면에서도 4열로 유지 */
    }
}
</style>