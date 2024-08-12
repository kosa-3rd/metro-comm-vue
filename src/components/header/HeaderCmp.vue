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
    }
};
</script>