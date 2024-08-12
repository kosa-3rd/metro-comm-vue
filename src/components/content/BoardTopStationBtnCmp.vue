<template>
    <div>
        <transition-group name="zoom" tag="div" class="grid grid-cols-4 gap-2 p-2">
            <button 
                v-for="menu in visibleMenus" 
                :key="menu.id" 
                class="station-btn shared-btn"
                :style="{ backgroundColor: menu.color }" 
                @click="handleStationClick(menu.id, $event)" 
            >
                {{ menu.name }}
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
import axios from 'axios';

export default {
    props: {
        stationId: {
            type: Number,
            required: true,  // stationId는 필수 prop
        },
    },
    data() {
        return {
            menus: [],  // 역 목록을 저장
            isExpanded: false,  // 메뉴 확장 여부
            ignoreClick: false,  // 첫 번째 클릭 이벤트 무시
        };
    },
    created() {
        this.fetchStations()
    },
    mounted() {
        // 메뉴 외부 클릭 시 자동으로 메뉴를 접기 위해 document 클릭 이벤트 리스너 추가
        document.addEventListener('click', this.handleOutsideClick);
    },
    beforeUnmount() {  // beforeDestroy 대신 beforeUnmount 사용
        // 컴포넌트가 파괴되기 전에 이벤트 리스너 제거
        document.removeEventListener('click', this.handleOutsideClick);
    },
    watch: {
        '$route': 'fetchStations',
        stationId: {
            immediate: true,  // stationId 변경 시 즉시 반응
            handler(newVal) {
                console.log("New stationId received in BoardTopStationBtnCmp.vue:", newVal);  // stationId가 올바르게 전달되는지 확인
                if (newVal) {
                    this.fetchStations(newVal);  // 역 목록 가져오기
                } else {
                    console.error("Received invalid stationId:", newVal);
                }
            }
        }
    },
    computed: {
        visibleMenus() {
            return this.isExpanded ? this.menus : this.menus.slice(0, 8);  // 메뉴 확장 여부에 따른 표시
        }
    },
    methods: {
        async fetchStations() {
            try {
                console.log("Fetching stations for stationId:", this.$route.params.subwayId);  // API 호출 전 log 추가
                const response = await axios.get(`/api/station/list?subwayId=${this.$route.params.subwayId}`);
                this.menus = response.data.map(subwayId => ({
                    id: subwayId.id,
                    name: subwayId.name + '역',
                    color: subwayId.color,  // 색상 정보 추가
                }));
                console.log("기모영Stations fetched:", this.menus);  // 역 데이터가 올바르게 받아졌는지 확인
            } catch (error) {
                console.error("기모영Failed to fetch stations:", error);
            }
        },
        toggleMenu() {
            this.isExpanded = !this.isExpanded;  // 메뉴 확장/축소
            this.ignoreClick = true;  // 메뉴를 펼칠 때 첫 번째 클릭 이벤트 무시
        },
        handleStationClick(stationId, event) {
            event.stopPropagation();  // 이벤트 버블링 중지
            this.$emit('stationSelected', stationId);  // 역 선택 시 부모 컴포넌트로 전달
        },
        handleOutsideClick(event) {
            // 클릭한 요소가 메뉴 내부나 버튼이 아닐 때 메뉴를 접음
            if (this.ignoreClick) {
                this.ignoreClick = false;
                return;
            }

            // 클릭한 요소가 메뉴 버튼인 경우는 예외 처리
            if (this.$el.contains(event.target) && event.target.classList.contains('station-btn')) {
                return;
            }

            if (!this.$el.contains(event.target)) {
                this.isExpanded = false;
            }
        }
    }
};
</script>

<style scoped>

.station-btn {
    background-color: rgb(96, 111, 184);
    color: white;
    padding: 8px 12px;
    margin: 5px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    white-space: nowrap;
    min-width: 80px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
}

.station-btn span {
    display: inline-block;
    max-width: 100%;
    font-size: 14px;
    line-height: 1;
    word-wrap: break-word;
    word-break: break-all;
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
    white-space: nowrap;
    min-width: 80px;
    text-align: center;
    text-decoration: underline;
}

.toggle-btn:hover {
    background-color: transparent;
    color: #424242;
    text-decoration: underline;
}
.zoom-enter-active {
    transition: all 0.7s ease;
}


.station-placeholder {
    visibility: hidden; /* 화면에 보이지 않게 처리 */
    height: 40px; /* 버튼의 높이와 동일하게 설정 */
    margin: 5px;
}

.zoom-enter-from, .zoom-leave-to {
    transform: scale(0.8);
    opacity: 0;
}


@media (max-width: 500px) {
    .grid-cols-4 {
        grid-template-columns: repeat(4, 1fr);
    }

    .shared-btn {
        font-size: 11px;
        padding: 6px 10px;
        min-width: 70px;
    }
}

@media (max-width: 390px) {
    .grid-cols-4 {
        grid-template-columns: repeat(4, 1fr);
    }
}
</style>