<template>
    <div>
        <div class="line-buttons-container">
            <div class="line-buttons flex justify-between items-center overflow-x-auto whitespace-nowrap">
                <div
                    v-for="station in stations"
                    :key="station.name"
                    class="station-btn w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-xs mx-2 text-white font-bold"
                    :class="station.color"
                    @click="updateLineName(station.name, station.color)"
                >
                    {{ station.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            stations: [
                { name: '1호선', color: 'bg-lineColors-1호선' },
                { name: '2호선', color: 'bg-lineColors-2호선' },
                { name: '3호선', color: 'bg-lineColors-3호선' },
                { name: '4호선', color: 'bg-lineColors-4호선' },
                { name: '5호선', color: 'bg-lineColors-5호선' },
                { name: '6호선', color: 'bg-lineColors-6호선' },
                { name: '7호선', color: 'bg-lineColors-7호선' },
                { name: '8호선', color: 'bg-lineColors-8호선' },
            ]
        };
    },
    methods: {
        updateLineName(stationName, stationColor) {
            this.$emit('lineNameUpdated', stationName, stationColor);
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
    align-items: center; /* 수직 가운데 정렬 */
    height: 5rem; /* line-buttons 높이 */
}

/* 스크롤 바 숨기기 */
.line-buttons::-webkit-scrollbar {
    display: none;
}

.station-btn {
    flex: 0 0 auto;
    margin-right: 0.5rem;
    border-radius: 100%; /* full rounded */
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 1.2rem; /* text-3xl */
    color: white; /* text-white */
    font-weight: bold; /* font-bold */
    font-family: 'Roboto', sans-serif; /* 폰트 적용 */
}

.bg-black {
  background-color: black;
}

.text-white {
  color: white;
}
</style>