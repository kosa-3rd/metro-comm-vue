<template>
    <div>
        <header-cmp></header-cmp>
        <board-top-station-btn-cmp></board-top-station-btn-cmp>
        <content-cmp></content-cmp>
        <nav-cmp></nav-cmp>
        <footer-cmp></footer-cmp>
    </div>
</template>

<script>
import HeaderCmp from './components/header/HeaderCmp.vue';
import BoardTopStationBtnCmp from './components/content/BoardTopStationBtnCmp.vue';
import ContentCmp from './components/content/ContentCmp.vue';
import NavCmp from './components/nav/NavCmp.vue';
import FooterCmp from './components/footer/FooterCmp.vue';

export default {
    name: 'App',
    components: {
        HeaderCmp,
        BoardTopStationBtnCmp,
        ContentCmp,
        NavCmp,
        FooterCmp,
    },
};
</script>

<style>
@import url('./assets/GlobalStyle.css');
</style>
