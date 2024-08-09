<template>
    <div class="header flex items-center">
        <div :class="['flex-grow', lineColor, transitionClass]"></div>
        <!-- transitionClass 추가 -->
        <div :class="['logo', borderColor, transitionClass]">
            <!-- transitionClass 추가 -->
            <span :class="['h-text', textColor]">{{ lineName }}</span>
            <span class="text-sm">METRO COMMUNITY</span>
        </div>
        <div :class="['flex-grow', lineColor, transitionClass]"></div>
        <!-- transitionClass 추가 -->
    </div>
</template>

<script>
export default {
    props: {
        lineName: {
            type: String,
            required: true,
        },
        lineColor: {
            type: String,
            required: true,
        },
        borderColor: {
            type: String,
            required: true,
        },
    },
    computed: {
        textColor() {
            return this.lineName === 'MeCo' ? 'text-black' : 'text-black';
        },
        transitionClass() {
            return 'transition-colors duration-500 ease-in-out';
        },
    },
};
</script>

<style scoped>
.header {
    @apply flex items-center;
}

/* 로고 안 */
.header .logo {
    @apply flex flex-col items-center justify-center rounded-custom-large border-8 bg-white px-20 py-2;
    transition: background-color 0.5s ease-in-out, border-color 0.5s ease-in-out; /* 로고에 색상 변경 애니메이션 추가 */
}

/* 로고 바 */
.header .flex-grow {
    @apply h-7;
    transition: background-color 0.5s ease-in-out; /* 로고 바에 색상 변경 애니메이션 추가 */
}

.h-text {
    @apply text-3xl font-bold;
}

.text-black {
    color: black;
}
</style>
