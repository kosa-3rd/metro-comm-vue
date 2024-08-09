<template>
    <div>
        <h3>Board</h3>
        <board-top-cmp></board-top-cmp>
        <board-post-cmp></board-post-cmp>
        <div class="">
            <br><br><br><br><br><br><br><br><br><br><br>컨텐츠 들어갈 내용 home 버튼 누르면 뜸<br><br><br><br><br><br>
            <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
   
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
