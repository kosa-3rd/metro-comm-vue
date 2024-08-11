<template>
    <div>
        <board-top-cmp></board-top-cmp>
        <board-post-cmp></board-post-cmp>
        <div class=""></div>
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

<style scoped></style>
