<template>
    <div>
        <transition-group name="slide" tag="div" class="grid grid-cols-4 gap-2 p-2">
            <button 
                v-for="menu in visibleMenus" 
                :key="menu.id" 
                class="station-btn shared-btn"
                @click="handleStationClick(menu.id)"
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
        };
    },
    watch: {
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
        async fetchStations(stationId) {
            try {
                console.log("Fetching stations for stationId:", stationId);  // API 호출 전 log 추가
                const response = await axios.get(`api/station/list?subwayId=${stationId}`);
                this.menus = response.data.map(station => ({
                    id: station.id,
                    name: station.name,
                }));
                console.log("Stations fetched:", this.menus);  // 역 데이터가 올바르게 받아졌는지 확인
            } catch (error) {
                console.error("Failed to fetch stations:", error);
            }
        },
        toggleMenu() {
            this.isExpanded = !this.isExpanded;  // 메뉴 확장/축소
        },
        handleStationClick(stationId) {
            this.$emit('stationSelected', stationId);  // 역 선택 시 부모 컴포넌트로 전달
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

.slide-enter-active, .slide-leave-active {
    transition: all 0.2s ease;
    position: relative;
}

.slide-leave {
    transform: translateY(0);
    opacity: 1;
}

.slide-leave-to {
    transform: translateY(-5px);
    opacity: 0;
}

@media (max-width: 500px) {
    .grid-cols-4 {
        grid-template-columns: repeat(4, 1fr);
    }

    .shared-btn {
        font-size: 12px;
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