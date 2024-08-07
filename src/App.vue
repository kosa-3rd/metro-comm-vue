<template>
    <div>
        <header-cmp></header-cmp>
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

};
</script>

<style>
@import url('./assets/GlobalStyle.css');
</style>
