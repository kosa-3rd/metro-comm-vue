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
    mounted() {
        this.initializeFromLocalStorage();
    },
    methods: {
        initializeFromLocalStorage() {
            // 로컬 스토리지에서 값 불러오기
            const savedLineName = localStorage.getItem('lineName');
            const savedLineColor = localStorage.getItem('lineColor');
            const savedBorderColor = localStorage.getItem('borderColor');

            // 로컬 스토리지에 저장된 값이 있으면 상태를 업데이트
            if (savedLineName && savedLineColor && savedBorderColor) {
                this.lineName = savedLineName;
                this.lineColor = savedLineColor;
                this.borderColor = savedBorderColor;
            }
        },
        updateLineName(newLineName, newLineColor) {
            this.lineName = newLineName;
            this.lineColor = newLineColor;
            this.borderColor = this.computeBorderColor(newLineColor);
        },
        computeBorderColor(lineColor) {
            return lineColor.replace('bg-', 'border-');
        },
    },
};
</script>

<style>
@import url('./assets/GlobalStyle.css');
</style>