<template>
    <!-- 메뉴 버튼 -->
    <div>
        <transition-group name="menu" tag="div" class="grid grid-cols-5 gap-2 p-2" :class="gridClass">
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
            ],
            isExpanded: false,
            visibleCount: 8,
            gridClass: 'grid-cols-5' // 기본 그리드 클래스
        };
    },
    computed: {
        visibleMenus() {
            return this.isExpanded ? this.menus : this.menus.slice(0, this.visibleCount);
        }
    },
    methods: {
        toggleMenu() {
            this.isExpanded = !this.isExpanded;
        },
        updateGridClass() {
            this.gridClass = window.innerWidth <= 768 ? 'grid-cols-4' : 'grid-cols-5';
        }
    },
    mounted() {
        this.updateGridClass();
        window.addEventListener('resize', this.updateGridClass);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.updateGridClass);
    }
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

/* 메뉴 애니메이션 */
.menu-enter-active, .menu-leave-active {
    transition: all 0.2s ease;
}

.menu-enter, .menu-leave-to /* .menu-leave-active in <2.1.8 */ {
    opacity: 0;
    transform: translateY(-10px);
}

@media (max-width: 768px) {
    .grid-cols-4 {
        grid-template-columns: repeat(4, 2fr);
    }

    .shared-btn {
    font-size: 12px; /* 작은 화면에서 글자 크기 조정 */
    padding: 6px 10px; /* 작은 화면에서 패딩 조정 */
    min-width: 70px; /* 작은 화면에서 버튼 너비 조정 */
}
}

@media (max-width: 390px) {
    .grid-cols-3 {
        grid-template-columns: repeat(3, 2fr); /* 매우 작은 화면에서 3열로 변경 */
    }

    .station-btn {
        font-size: 10px; /* 매우 작은 화면에서 글자 크기 조정 */
        padding: 4px 8px; /* 매우 작은 화면에서 패딩 조정 */
        min-width: 60px; /* 매우 작은 화면에서 버튼 너비 조정 */
    }

    .toggle-btn {
        font-size: 10px; /* 매우 작은 화면에서 글자 크기 조정 */
        padding: 4px 8px; /* 매우 작은 화면에서 패딩 조정 */
        min-width: 60px; /* 매우 작은 화면에서 버튼 너비 조정 */
    }
}
</style>