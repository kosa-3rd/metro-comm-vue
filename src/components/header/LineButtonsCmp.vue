<template>
    <div>
        <div class="line-buttons-container">
            <div class="line-buttons flex justify-between items-center overflow-x-auto whitespace-nowrap">
                <div
                    v-for="station in ['2호선', '3호선', '4호선', '5호선', '6호선', '7호선', '8호선', '9호선', '10호선', '11호선', '12호선']"
                    :key="station"
                    class="station-btn w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-xs mx-2 text-white font-bold"
                    :class="getStationColor(station)"
                >
                    {{ station }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        getStationColor(station) {
            const colors = {
                '2호선': 'bg-lineColors-2호선',
                '3호선': 'bg-lineColors-3호선',
                '4호선': 'bg-lineColors-4호선',
                '5호선': 'bg-lineColors-5호선',
                '6호선': 'bg-lineColors-6호선',
                '7호선': 'bg-lineColors-7호선',
                '8호선': 'bg-lineColors-8호선',
            };
            return colors[station] || 'bg-gray-500';
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

/*스크롤 바 숨기기*/
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
</style>