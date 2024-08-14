<template>
    <div>
        <board-top-station-btn-cmp></board-top-station-btn-cmp>
        <board-top-train-arrival-cmp :key="componentKey"></board-top-train-arrival-cmp>
    </div>
</template>

<script>
import BoardTopStationBtnCmp from './BoardTopStationBtnCmp.vue';
import BoardTopTrainArrivalCmp from './BoardTopTrainArrivalCmp.vue';

export default {
    components: { BoardTopStationBtnCmp, BoardTopTrainArrivalCmp },
    methods: {
        updateLineId(stationId) {
            console.log('Station ID received in BoardTopCmp.vue:', stationId); // stationId 로그 출력
            this.$emit('lineSelected', stationId); // 부모 컴포넌트로 stationId 전달
        },
    },
    watch: {
        '$route.query.station': 'resetPosts',
        '$route.params.subwayId': 'resetPosts',
    },
};
</script>

<style scoped></style>
