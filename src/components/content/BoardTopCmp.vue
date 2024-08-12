<template>
  <h3>BoardTop</h3>
  <BoardTopStationBtnCmp></BoardTopStationBtnCmp>
</template>

<script>
import BoardTopStationBtnCmp from './BoardTopStationBtnCmp.vue';

export default {
  components: { BoardTopStationBtnCmp },
  methods: {
      updateLineId(stationId) {
          console.log('Station ID received in BoardTopCmp.vue:', stationId);  // stationId 로그 출력
          this.$emit('lineSelected', stationId);  // 부모 컴포넌트로 stationId 전달
      }
  },
};
</script>

<style scoped></style>