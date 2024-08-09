<template>
    <div>
        <br />
        <button @click="logAuth">버튼</button>
        <router-view></router-view>
    </div>
</template>

<script>
export default {};
</script>

<script setup>
import { useUserStore } from '@/store/user-store';

const userStore = useUserStore();
const authenticated = userStore.authenticated;

const logAuth = function () {
    console.log(authenticated);
};
</script>

<style scoped></style>
