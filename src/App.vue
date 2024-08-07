<template>
    <div>
        <ExampleCompVue></ExampleCompVue>
    </div>

</template>

<script>
import ExampleCompVue from './components/ExampleComp.vue';

export default {
    name: 'App',
    
    components: {
        ExampleCompVue,
    },

};
</script>

<style>
@import url('./assets/GlobalStyle.css');
</style>
