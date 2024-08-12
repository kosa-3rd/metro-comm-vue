<template>
    <div>
        <div class="line-buttons-container">
            <div class="line-buttons flex justify-between items-center overflow-x-auto whitespace-nowrap">
                <div
                    v-for="station in stations"
                    :key="station.id"
                    class="station-btn w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-xs mx-2 text-white font-bold"
                    :style="{ backgroundColor: station.color }" 
                    @click="handleLineClick(station.id, station.name, station.color)"
                >
                    {{ station.name }}
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
                    color: line.color,  // 색상 코드를 그대로 사용
                }));
            } catch (error) {
                console.error("Failed to fetch subway lines:", error);
            }
        },
        handleLineClick(stationId, lineName, lineColor) {
            console.log('Station ID emitted from LineButtonsCmp.vue:', stationId);  // 로그 추가
            this.$emit('lineNameUpdated', lineName, lineColor);
            this.$emit('stationIdSelected', stationId); // stationId를 부모 컴포넌트로 전달
            this.$router.push({ 
                path: `/${stationId}` 
            });
        },
    },
};
</script>

<style scoped>
.line-buttons-container {
    width: 100%;
    overflow-x: auto;
}

.line-buttons {
    display: flex;
    white-space: nowrap;
    align-items: center;
    height: 5rem;
}

.line-buttons::-webkit-scrollbar {
    display: none;
}

.station-btn {
    flex: 0 0 auto;
    margin-right: 0.5rem;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 1.2rem;
    color: white;
    font-weight: bold;
    font-family: 'Roboto', sans-serif;
}

.text-white {
    color: white;
}
</style>