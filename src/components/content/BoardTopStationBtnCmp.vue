<!-- 
 담당자: 김호영
 시작 일자: 2024.08.
 설명 : 역 버튼 컴포넌트
 ---------------------
 2024.08.12 양건모 | 역 버튼 클릭시 queryString 추가
 2024.08.15 양건모 | Board 컴포넌트에 :key 속성을 추가함에 따라 선택한 역 표시 로직 변경
 
 -->

<template>
    <div>
        <div id="buttonArea">
            <transition-group name="zoom" tag="div" class="grid grid-cols-3 gap-2 p-2">
                <template v-if="menus && menus.length > 0">
                    <button
                        v-for="menu in visibleMenus"
                        :key="menu.id"
                        :class="[
                            'station-btn',
                            'clickable',
                            {
                                active: activeStationId === menu.id || menu.id === activeButtonId,
                            },
                        ]"
                        @click="handleStationClick(menu.id, menu.name, $event)"
                    >
                        {{ menu.name }}
                    </button>
                </template>
            </transition-group>
        </div>
        <div class="flex justify-end pr-2">
            <button @click="toggleMenu" class="toggle-btn text-gray-500 font-thin text-xs">
                {{ isExpanded ? '접기 ' : '펼치기' }}
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        stationId: {
            type: Number,
            required: true, // stationId는 필수 prop
        },
    },
    data() {
        return {
            menus: [], // 역 목록을 저장
            isExpanded: false, // 메뉴 확장 여부
            ignoreClick: false, // 첫 번째 클릭 이벤트 무시
            activeStationId: null, // 클릭된 버튼의 ID를 저장하는 상태 추가
        };
    },
    created() {
        this.fetchStations();
    },
    mounted() {
        // 메뉴 외부 클릭 시 자동으로 메뉴를 접기 위해 document 클릭 이벤트 리스너 추가
        document.addEventListener('click', this.handleOutsideClick);
    },
    beforeUnmount() {
        // beforeDestroy 대신 beforeUnmount 사용
        // 컴포넌트가 파괴되기 전에 이벤트 리스너 제거
        document.removeEventListener('click', this.handleOutsideClick);
    },
    watch: {
        $route: 'fetchStations',
        stationId: {
            immediate: true, // stationId 변경 시 즉시 반응
            handler(newVal) {
                console.log('New stationId received in BoardTopStationBtnCmp.vue:', newVal); // stationId가 올바르게 전달되는지 확인
                if (newVal) {
                    this.fetchStations(newVal); // 역 목록 가져오기
                }
            },
        },
    },
    computed: {
        visibleMenus() {
            return this.isExpanded ? this.menus : this.menus.slice(0, 6); // 메뉴 확장 여부에 따른 표시
        },
        activeButtonId() {
            // URL 쿼리 파라미터에서 'station' 값을 가져와서, 해당 값과 일치하는 버튼의 ID를 반환
            return this.$route.query.station
                ? this.menus.find((menu) => menu.name === this.$route.query.station)?.id
                : null;
        },
    },
    methods: {
        async fetchStations() {
            try {
                const response = await axios.get(`/api/station/list?subwayId=${this.$route.params.subwayId}`);
                this.menus = response.data.map((subwayId) => ({
                    id: subwayId.id,
                    name: subwayId.name,
                }));
            } catch (error) {
                console.error('Failed to fetch stations:', error);
            }
        },
        toggleMenu() {
            this.isExpanded = !this.isExpanded; // 메뉴 확장/축소
            this.ignoreClick = true; // 메뉴를 펼칠 때 첫 번째 클릭 이벤트 무시
        },
        handleStationClick(stationId, stationName, event) {
            event.stopPropagation(); // 이벤트 버블링 중지
            this.activeStationId = stationId; // 클릭된 버튼의 ID를 활성화 상태로 설정
            this.$emit('stationSelected', stationId); // 역 선택 시 부모 컴포넌트로 전달
            this.$router.push({
                path: this.$route.params.subwayId,
                query: {
                    station: stationName,
                },
            });
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
        },
    },
};
</script>

<style scoped>
#buttonArea {
    max-height: 250px;
    overflow: scroll;
}

#buttonArea::-webkit-scrollbar {
    display: none;
}

.station-btn {
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    padding: 1px 2px;
    margin: 2px;
    border-radius: 5px;
    border: 1.5px solid rgba(0, 0, 0, 0.1); /* 테두리 색 및 두께 */
    cursor: pointer;
    font-size: 12px;
    min-width: 80px;
    text-align: center;
    overflow: hidden;
}

.station-btn.active {
    font-weight: bolder; /* 클릭된 버튼의 텍스트를 더 두껍게 처리 */
    color: #114eb0; /* 클릭된 상태에서의 텍스트 색상 */
    border-color: #3b82f6; /* 클릭된 상태에서의 테두리 색상 */
}

.station-btn span {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; /* 표시할 줄 수 */
    overflow: hidden; /* 영역을 넘는 텍스트 숨김 처리 */
    font-size: 12px;
    line-height: 1; /* 줄 간격 설정 */
    max-height: 2em; /* 2줄 표시할 수 있는 높이 설정 */
    word-wrap: break-word; /* 긴 단어는 다음 줄로 넘김 */
    word-break: break-all; /* 단어를 강제로 나눔 */
}

.station-btn:hover {
    border-color: #3b82f6; /* 테두리 색을 원하는 색상으로 변경 */
    color: #114eb0; /* 글자 색을 원하는 색상으로 변경 */
}

.station-btn:active {
    font-weight: bolder; /* 클릭 시 텍스트를 더 두껍게 처리 */
    color: #114eb0; /* 클릭 시에도 글자 색상 유지 */
    border-color: #3b82f6; /* 클릭 시 테두리 색상 유지 */
}

.toggle-btn {
    /* 접기 펼치기 버튼 */
    background-color: transparent;
    color: #424242;
    padding: 8px 12px;
    margin: 5px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: 300; /* 글씨체를 얇게 설정 */
    white-space: nowrap;
    min-width: 80px;
    text-align: center;
    text-decoration: underline;
}

.select-route-text {
    font-size: 16px;
    font-weight: bold;
    color: #424242;
    text-align: center;
}

.clickable {
    @apply transition duration-200 ease-in-out;
}

.clickable:active {
    @apply bg-gray-300;
}
</style>
