<template>
    <div>
        <header-cmp :lineName="lineName" :lineColor="lineColor" :borderColor="borderColor" @lineNameUpdated="updateLineName" />
        <content-cmp></content-cmp>
        <nav-cmp></nav-cmp>
        <footer-cmp></footer-cmp>
    </div>
</template>

<script>
import HeaderCmp from './components/header/HeaderCmp.vue';
import ContentCmp from './components/content/ContentCmp.vue';
import NavCmp from './components/nav/NavCmp.vue';
import FooterCmp from './components/footer/FooterCmp.vue';

export default {
    name: 'App',
    components: {
        HeaderCmp,
        ContentCmp,
        NavCmp,
        FooterCmp,
    },
    data() {
        return {
            lineName: 'MECO',
            lineColor: 'bg-black',
            borderColor: 'border-black'
        };
    },
    methods: {
        updateLineName(newLineName, newLineColor) {
            this.lineName = newLineName;
            this.lineColor = newLineColor;
            this.borderColor = this.computeBorderColor(newLineColor);
        },
        computeBorderColor(lineColor) {
            return lineColor.replace('bg-', 'border-');
        }
    },
};
</script>

<style>
@import url('./assets/GlobalStyle.css');
</style>