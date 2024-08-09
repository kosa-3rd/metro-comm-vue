<template>
    <div>
        <h3>Board</h3>
        <board-top-cmp></board-top-cmp>
        <board-post-cmp></board-post-cmp>
        <div class="">
        </div>
    </div>
</template>

<script>
import BoardPostCmp from './BoardPostCmp.vue';
import BoardTopCmp from './BoardTopCmp.vue';
export default {
    components: {
        BoardTopCmp,
        BoardPostCmp,
    },
};
</script>

<style scoped>
</style>
