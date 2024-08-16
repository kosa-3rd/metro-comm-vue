<!-- 
 담당자: 양건모
 시작 일자: 2024.08.14
 설명 : 열차 도착 정보 컴포넌트
 ---------------------
 2024.08.15 양건모 | 기능 구현
 2024.08.15 양건모 | Interval 요청 중복 버그 수정
 
 -->

<template>
    <div id="arrival-wrapper">
        <div
            v-for="(subway, index) in sortedArrivals"
            :key="subway.subwayId"
            class="subway"
            :style="getSubwayStyle(subway.subwayId)"
            v-show="index === 0 || showAllSubways"
        >
            <h2 id="subway-name">{{ subway.subwayName }}</h2>
            <div class="train-container">
                <div v-for="train in displayedTrainArrivals(subway.trainArrivals)" :key="train.trainTo" class="train">
                    <div class="train-info">
                        <span class="train-to">{{ train.trainTo }}</span>
                        <span class="arv-msg">{{ train.arvMsg }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="toggle-wrapper">
            <button v-if="sortedArrivals.length > 1" @click="toggleShowAllSubways" class="toggle-button">
                {{ showAllSubways ? '현재 노선만 보기' : '모든 노선 보기' }}
            </button>
        </div>
    </div>
</template>

<script>
import { ref, computed, onUnmounted } from 'vue';
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
        const route = useRoute();
        const showMore = ref(false);
        const showAllSubways = ref(false);

        const fetchData = async () => {
            try {
                const response = await axios.get('/api/station/arrival/' + route.query.station);
                arrivals.value = response.data;
            } catch (error) {
                console.error('API 요청 실패:', error);
            }
        };

        const firstFetch = function () {
            if (route.query.station != undefined) {
                fetchData();
                return setInterval(fetchData, 5000);
            } else {
                return null;
            }
        };

        const intervalId = firstFetch();
        const sortedArrivals = computed(() => {
            const targetSubwayId = route.params.subwayId;

            if (!targetSubwayId) {
                return arrivals.value;
            }

            const mockData = [
                // ... (mock data)
            ];

            const matchedSubway = arrivals.value.find((subway) => subway.subwayId == targetSubwayId);

            const otherSubways = arrivals.value.filter((subway) => subway.subwayId != targetSubwayId);

            return matchedSubway ? [...mockData, matchedSubway, ...otherSubways] : arrivals.value;
        });

        const getSubwayStyle = (subwayId) => {
            const color = subwayColors[subwayId] || '#ddd'; // 기본 색상
            const lightenedColor = lightenColor(color, 0.95); // 색상을 95% 밝게 조정

            return {
                borderColor: color,
                color: color,
                '--train-info-bg': lightenedColor, // CSS 변수를 사용하여 배경색 설정
            };
        };

        onUnmounted(() => {
            if (intervalId != null) {
                clearInterval(intervalId);
            }
        });

        const toggleShowMore = () => {
            showMore.value = !showMore.value;
        };

        const toggleShowAllSubways = () => {
            showAllSubways.value = !showAllSubways.value;
        };

        const displayedTrainArrivals = (trainArrivals) => {
            return showMore.value ? trainArrivals : trainArrivals.slice(0, 5); // 기본적으로 5개의 항목만 표시
        };

        return {
            sortedArrivals,
            getSubwayStyle,
            toggleShowMore,
            toggleShowAllSubways,
            displayedTrainArrivals,
            showMore,
            showAllSubways,
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
    margin-top: 0rem;
    margin-bottom: 1rem;
    width: 95%;
    position: relative;
}

#subway-name {
    margin-bottom: 10px;
    font-size: 1.3rem;
    font-weight: bolder;
    text-align: center;
}
.toggle-wrapper {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    width: 95%;
}

.toggle-button {
    display: block;
    background-color: transparent;
    color: #424242;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: 300; /* 글씨체를 얇게 설정 */
    white-space: nowrap;
    min-width: 80px;
    text-align: left;
    text-decoration: underline;
}
</style>
