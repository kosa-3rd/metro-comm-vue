<template>
    <div id="arrival-wrapper">
        <div
            v-for="subway in sortedArrivals"
            :key="subway.subwayId"
            class="subway"
            :style="getSubwayStyle(subway.subwayId)"
        >
            <h2 id="subway-name">{{ subway.subwayName }}</h2>
            <div class="train-container">
                <div v-for="train in subway.trainArrivals" :key="train.trainTo" class="train">
                    <div class="train-info">
                        <span class="train-to">{{ train.trainTo }}</span>
                        <span class="arv-msg">{{ train.arvMsg }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const subwayColors = {
    1001: '#0052A4',
    1002: '#00A84D',
    1003: '#EF7C1C',
    1004: '#00A5DE',
    1005: '#996CAC',
    1006: '#CD7C2F',
    1007: '#747F00',
    1008: '#E6186C',
    1009: '#BB8336',
    1032: '#9A6292',
    1063: '#77C4A3',
    1065: '#0090D2',
    1067: '#0C8E72',
    1075: '#F5A200',
    1077: '#D4003B',
    1081: '#003DA5',
    1092: '#B0CE18',
    1093: '#81A914',
};

const lightenColor = (color, percent) => {
    // 색상 코드가 '#RRGGBB' 형식인지 확인
    let r = parseInt(color.slice(1, 3), 16);
    let g = parseInt(color.slice(3, 5), 16);
    let b = parseInt(color.slice(5, 7), 16);

    r = Math.min(255, Math.floor(r + (255 - r) * percent)).toString(16);
    g = Math.min(255, Math.floor(g + (255 - g) * percent)).toString(16);
    b = Math.min(255, Math.floor(b + (255 - b) * percent)).toString(16);

    r = r.length === 1 ? '0' + r : r;
    g = g.length === 1 ? '0' + g : g;
    b = b.length === 1 ? '0' + b : b;

    return `#${r}${g}${b}`;
};

export default {
    setup() {
        const arrivals = ref([]);
        let intervalId = null;
        const route = useRoute();

        const fetchData = async () => {
            try {
                const response = await axios.get('/api/station/arrival/' + route.query.station);
                arrivals.value = response.data;
            } catch (error) {
                console.error('API 요청 실패:', error);
            }
        };

        const shouldFetchData = computed(() => {
            return route.query.station !== undefined;
        });

        const sortedArrivals = computed(() => {
            const targetSubwayId = route.params.subwayId;

            if (!targetSubwayId) {
                return arrivals.value;
            }

            const mockData = [
                {
                    subwayId: 1001,
                    subwayName: '1호선',
                    trainArrivals: [
                        { trainTo: '▶ 종로3가', arvMsg: '10분 후 도착' },
                        { trainTo: '▶ 서울역', arvMsg: '15분 후 도착' },
                        { trainTo: '▶ 왕십리', arvMsg: '25분 후 도착' },
                    ],
                },
                {
                    subwayId: 1002,
                    subwayName: '2호선',
                    trainArrivals: [
                        { trainTo: '▶ 강남', arvMsg: '5분 후 도착' },
                        { trainTo: '▶ 홍대입구', arvMsg: '12분 후 도착' },
                    ],
                },
                {
                    subwayId: 1003,
                    subwayName: '3호선',
                    trainArrivals: [
                        { trainTo: '▶ 대화', arvMsg: '8분 후 도착' },
                        { trainTo: '▶ 경복궁', arvMsg: '18분 후 도착착착착착착착착차가착ㅊ갗' },
                        { trainTo: '▶ 대화', arvMsg: '8분 후 도착' },
                        { trainTo: '▶ 경복궁', arvMsg: '18분 후 도착착착착착착착착차가착ㅊ갗' },
                        { trainTo: '▶ 대화', arvMsg: '8분 후 도착' },
                        { trainTo: '▶ 경복궁', arvMsg: '18분 후 도착착착착착착착착차가착ㅊ갗' },
                    ],
                },
                // 필요한 만큼 더 추가
            ];

            const matchedSubway = arrivals.value.find((subway) => subway.subwayId == targetSubwayId);

            const otherSubways = arrivals.value.filter((subway) => subway.subwayId != targetSubwayId);

            return matchedSubway ? [...mockData, matchedSubway, ...otherSubways] : arrivals.value;
        });

        const getSubwayStyle = (subwayId) => {
            const color = subwayColors[subwayId] || '#ddd'; // 기본 색상
            const lightenedColor = lightenColor(color, 0.95); // 색상을 50% 밝게 조정

            return {
                borderColor: color,
                color: color,
                '--train-info-bg': lightenedColor, // CSS 변수를 사용하여 배경색 설정
            };
        };

        const startPolling = () => {
            if (shouldFetchData.value) {
                fetchData();
                intervalId = setInterval(fetchData, 5000);
            }
        };

        onMounted(() => {
            startPolling();
        });

        onUnmounted(() => {
            clearInterval(intervalId);
        });

        watch(
            () => route.query.station,
            (newVal) => {
                if (newVal !== undefined) {
                    startPolling(); // 쿼리 파라미터에 'station'이 있을 때 폴링 시작
                } else {
                    clearInterval(intervalId); // 쿼리 파라미터에 'station'이 없으면 폴링 중지
                }
            },
            { immediate: true },
        );

        return {
            sortedArrivals,
            getSubwayStyle,
        };
    },
};
</script>

<style scoped>
.subway {
    margin-bottom: 20px;
    padding: 10px;
    border: 1.2px solid;
    border-radius: 5px;
}

.train-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); /* 컬럼을 자동으로 조정하여 격자 형태로 배치 */
    gap: 10px;
    margin: auto;
}

.train-info {
    display: flex;
    flex-direction: column; /* 세로로 배치 */
    padding: 10px;
    border: 1px solid #eee;
    border-radius: 5px;
    background-color: var(--train-info-bg, #f9f9f9); /* 기본 배경 색상 설정 */
}

.train-info span {
    margin-bottom: 5px; /* 정보 사이에 여백 추가 */
    white-space: nowrap; /* 텍스트가 개행되지 않도록 설정 */
    overflow: hidden; /* 넘치는 부분 숨기기 */
    text-overflow: ellipsis; /* 넘치는 부분을 '...'으로 표시 */
}

.train-info span:last-child {
    color: #555;
}

#arrival-wrapper {
    margin: auto;
    margin-top: 1.5rem;
    width: 95%;
}

#subway-name {
    margin-bottom: 10px;
    font-size: 1.3rem;
    font-weight: bolder;
    text-align: center;
}

.toggle-button {
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    font-size: 1rem;
    color: #007bff;
    border: 1px solid #007bff;
    border-radius: 5px;
    background-color: transparent;
    cursor: pointer;
}

.toggle-button:hover {
    background-color: #007bff;
    color: #fff;
}
</style>
