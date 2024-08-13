<template>
    <div>
        <div class="line-buttons-container">
            <div class="line-buttons flex justify-between items-center overflow-x-auto whitespace-nowrap">
                <div
                    v-for="station in stations"
                    :key="station.id"
                    :class="['station-btn', { 'active': activeStationId === station.id }]" 
                    class="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-xs mx-2 text-white font-bold"
                    :style="{ backgroundColor: station.color }"
                    @click="handleLineClick(station.id, station.name, station.color)"
                >
                <span>{{ station.name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            stations: [],
            activeStationId: null, // 클릭된 버튼의 ID를 저장하는 상태 추가
        };
    },
    mounted() {
        this.fetchStations();
    },
    methods: {
        async fetchStations() {
            try {
                const response = await axios.get('/api/subway/list');
                this.stations = response.data.map(line => ({
                    id: line.id,
                    name: line.name,
                    color: line.color,
                }));
            } catch (error) {
                console.error("Failed to fetch subway lines:", error);
            }
        },
        handleLineClick(stationId, lineName, lineColor) {
            this.activeStationId = stationId; // 클릭된 버튼의 ID를 활성화 상태로 설정

            console.log('Station ID emitted from LineButtonsCmp.vue:', stationId);

            // 부모 컴포넌트로 이벤트 전달
            this.$emit('lineNameUpdated', lineName, lineColor);
            this.$emit('stationIdSelected', stationId);

            // 로컬 스토리지에 저장
            localStorage.setItem('lineName', lineName);
            localStorage.setItem('lineColor', lineColor);
            localStorage.setItem('borderColor', this.computeBorderColor(lineColor));

            // 라우터 이동
            this.$router.push({ 
                path: `/${stationId}`
            });
        },
        computeBorderColor(lineColor) {
            return lineColor.replace('bg-', 'border-');
        },
    },
};
</script>

<style scoped>
.station-btn {
    flex-shrink: 0; /* 버튼이 줄어들지 않도록 설정 */
    border-radius: 50%; /* 동그란 버튼 모양 유지 */
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 0.8rem; /* 글씨 크기 조정 */
    color: white;
    font-weight: bold;
    font-family: 'Roboto', sans-serif;
    overflow: hidden; /* 넘치는 텍스트 숨김 */
    text-overflow: ellipsis; /* 넘치는 텍스트를 말줄임표로 처리 */
    white-space: nowrap; /* 텍스트 줄바꿈 방지 */
}

.station-btn span {
    display: block;
    overflow: hidden; /* 넘치는 텍스트 숨김 처리 */
    text-overflow: ellipsis; /* 넘치는 텍스트를 말줄임표로 처리 */
    white-space: nowrap; /* 텍스트 줄바꿈 방지 */
    width: 100%;
    text-align: center; /* 텍스트를 가운데 정렬 */
    font-size: 0.9rem; /* 글씨 크기 조정 */
}

.station-btn.active {
    filter: brightness(0.6); /* 클릭된 상태에서 색상을 진하게 처리 */
}

.line-buttons-container {
    width: 100%;
    overflow-x: auto; /* 가로 스크롤 허용 */
}

.line-buttons {
    display: flex;
    flex-wrap: nowrap; /* 한 줄에 배치하고 줄바꿈 방지 */
    padding: 3px;
}

.line-buttons::-webkit-scrollbar {
    display: none;
}

.station-btn:hover {
    filter: brightness(0.6); /* 마우스 호버 시 색상 진하게 */
}

.text-white {
    color: white;
}
</style>
