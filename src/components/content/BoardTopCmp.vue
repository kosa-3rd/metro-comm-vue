<template>
    <div>
        <board-top-station-btn-cmp 
            :lineName="lineName" 
            @lineNameUpdated="updateLineName" 
            @stationSelected="updateLineId"
        ></board-top-station-btn-cmp>
        <board-top-train-arrival-cmp></board-top-train-arrival-cmp>
    </div>
</template>

<script>
import BoardTopStationBtnCmp from './BoardTopStationBtnCmp.vue';
import BoardTopTrainArrivalCmp from './BoardTopTrainArrivalCmp.vue';

export default {
    components: { BoardTopStationBtnCmp, BoardTopTrainArrivalCmp },
    data() {
        return {
            lineName: '',  // 노선 이름을 저장
        };
    },
    methods: {
        updateLineName(newLineName) {
            this.lineName = newLineName;  // lineName 업데이트
        },
        updateLineId(stationId) {
            console.log('Station ID received in BoardTopCmp.vue:', stationId); // stationId 로그 출력
            this.$emit('lineSelected', stationId); // 부모 컴포넌트로 stationId 전달
        },
    },
};
</script>

<style scoped></style>