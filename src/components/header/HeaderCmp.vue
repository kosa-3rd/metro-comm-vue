<template>
    <div>
        <logo-cmp :lineName="lineName" :lineColor="lineColor" :borderColor="borderColor"></logo-cmp>
        <line-buttons-cmp @lineNameUpdated="updateLineName" @lineIdUpdated="updateLineId"></line-buttons-cmp>
    </div>
</template>

<script>
import LogoCmp from './LogoCmp.vue';
import LineButtonsCmp from './LineButtonsCmp.vue';

export default {
    props: {
        lineName: String,
        lineColor: String,
        borderColor: String
    },
    components: {
        LogoCmp,
        LineButtonsCmp
    },
    methods: {
        updateLineName(newLineName, newLineColor) {
            this.$emit('lineNameUpdated', newLineName, newLineColor);
        },
        updateLineId(lineId) {
            this.$emit('lineIdUpdated', lineId);  // Line ID를 상위로 전달
        }
    },
    beforeRouteUpdate (to, from, next) {
        // 라우터가 변경될 때 컴포넌트를 다시 로드하도록 함
        this.$forceUpdate();
        next();
    }
};
</script>