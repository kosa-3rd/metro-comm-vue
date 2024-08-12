<template>
    <div class="header flex items-center">
        <!-- 인라인 스타일로 배경색과 테두리 색상 적용 -->
        <div :style="{ backgroundColor: computedLineColor }" class="flex-grow"></div>
        <div :style="{ borderColor: computedBorderColor, backgroundColor: 'white' }" class="logo border-8">
            <span :class="['h-text', textColor]">{{ lineName }}</span>
            <span class="text-sm">METRO COMMUNITY</span>
        </div>
        <div :style="{ backgroundColor: computedLineColor }" class="flex-grow"></div>
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
        computedLineColor() {
            // 기본 검정색 처리
            return this.lineName === 'MeCo' ? '#000000' : this.lineColor;
        },
        computedBorderColor() {
            // 기본 검정색 테두리 처리
            return this.lineName === 'MeCo' ? '#000000' : this.borderColor;
        },
        textColor() {
            return 'text-black'; // 기본 텍스트 색상 유지
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