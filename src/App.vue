<template>
    <div>
        <header-cmp
            :lineName="lineName"
            :lineColor="lineColor"
            :borderColor="borderColor"
            @lineNameUpdated="updateLineName"
        />
        <board-top-station-btn-cmp></board-top-station-btn-cmp>
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
            lineName: 'MeCo',
            lineColor: 'bg-black',
            borderColor: 'border-black',
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
        },
    },

    updateLineName(newLineName, newLineColor) {
    console.log('Updating lineName:', newLineName, newLineColor); // 업데이트 확인용 로그
    this.lineName = newLineName;
    this.lineColor = newLineColor;
    this.borderColor = this.computeBorderColor(newLineColor);
    console.log('Computed borderColor:', this.borderColor); // 테두리 색상 로그
}
};
</script>

<style>
@import url('./assets/GlobalStyle.css');
</style>