<template>
    <div>
        <board-top-cmp @lineSelected="handleLineSelected"></board-top-cmp>
        <board-top-station-btn-cmp 
            v-if="selectedLineId" 
            :lineId="selectedLineId" 
            @stationSelected="handleStationSelected"
        />
        <board-post-cmp></board-post-cmp>
    </div>
</template>

<script>
import BoardPostCmp from './BoardPostCmp.vue';
import BoardTopCmp from './BoardTopCmp.vue';
import BoardTopStationBtnCmp from './BoardTopStationBtnCmp.vue';

export default {
    components: {
        BoardTopCmp,
        BoardPostCmp,
        BoardTopStationBtnCmp,
    },
    data() {
        return {
            selectedLineId: null,
        };
    },
    methods: {
        handleLineSelected(lineId) {
            this.selectedLineId = lineId;
        },
        handleStationSelected(stationId) {
            // 여기에서 역 선택 시의 동작을 정의합니다.
            console.log('Selected Station ID:', stationId);
        }
    },
};
</script>

<style scoped></style>