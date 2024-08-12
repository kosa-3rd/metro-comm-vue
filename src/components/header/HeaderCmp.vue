<template>
    <div>
        <!-- LogoCmp 컴포넌트에 현재 선택된 노선 정보 전달 -->
        <logo-cmp :lineName="lineName" :lineColor="lineColor" :borderColor="borderColor"></logo-cmp>
        
        <!-- LineButtonsCmp에서 노선 변경 시 부모에게 이벤트 전파 -->
        <line-buttons-cmp @lineNameUpdated="updateLineName"></line-buttons-cmp>
    </div>
</template>

<script>
import LogoCmp from './LogoCmp.vue';
import LineButtonsCmp from './LineButtonsCmp.vue';

export default {
    props: {
        lineName: {
            type: String,
            required: true,
        },
        lineColor: {
            type: String,
            required: true,
        },
        borderColor: {
            type: String,
            required: true,
        }
    },
    components: {
        LogoCmp,
        LineButtonsCmp,
    },
    methods: {
        updateLineName(newLineName, newLineColor) {
            this.$emit('lineNameUpdated', newLineName, newLineColor);
        }
    },

    updateLineName(newLineName, newLineColor) {
    console.log('Emitting lineNameUpdated event:', newLineName, newLineColor); // 이벤트 전파 로그
    this.$emit('lineNameUpdated', newLineName, newLineColor);
}
};
</script>

<style scoped></style>