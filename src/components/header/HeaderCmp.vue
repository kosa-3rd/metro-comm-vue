<template>
    <div>
        <logo-cmp :lineName="lineName" :lineColor="lineColor" :borderColor="borderColor"></logo-cmp>
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
};
</script>

<style scoped></style>