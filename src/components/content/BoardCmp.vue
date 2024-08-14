<template>
    <div>
        <board-top-cmp @lineSelected="handleLineSelected"></board-top-cmp>
        <!-- <BoardTopStationBtnCmp
      v-if="selectedStationId"
      :stationId="selectedStationId"
      @stationSelected="handleStationSelected"
    /> -->
        <board-post-cmp :key="componentKey"></board-post-cmp>
    </div>
</template>

<script>
import BoardPostCmp from './BoardPostCmp.vue';
import BoardTopCmp from './BoardTopCmp.vue';
// import BoardTopStationBtnCmp from "./BoardTopStationBtnCmp.vue";

export default {
    components: {
        BoardTopCmp,
        BoardPostCmp,
        // BoardTopStationBtnCmp,
    },
    data() {
        return {
            selectedStationId: null, // 선택된 역 ID를 저장
            componentKey: 1,
        };
    },
    methods: {
        handleLineSelected(stationId) {
            console.log('Station ID received in BoardCmp.vue:', stationId); // stationId 로그 출력
            this.selectedStationId = stationId; // 선택된 역 ID를 저장
        },
        handleStationSelected(stationId) {
            console.log('Selected Station ID:', stationId); // 역 선택 시 동작
        },
        resetPosts() {
            this.componentKey += 1;
        },
    },
    watch: {
        '$route.query.station': 'resetPosts',
        '$route.params.subwayId': 'resetPosts',
    },
};
</script>
