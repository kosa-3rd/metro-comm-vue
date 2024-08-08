<template>
  <div class="header flex items-center">
      <div :class="['flex-grow', lineColor]"></div>
      <div :class="['logo', borderColor]">
          <span :class="['h-text', textColor]">{{ lineName }}</span>
          <span class="text-sm">METRO COMMUNITY</span>
      </div>
      <div :class="['flex-grow', lineColor]"></div>
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
      }
  },
  computed: {
      textColor() {
          return this.lineName === 'MeCo' ? 'text-black' : 'text-black';
      }
  }
};
</script>

<style scoped>
.header {
  @apply flex items-center;
}

/* 로고 안 */
.header .logo {
  @apply flex flex-col items-center justify-center rounded-custom-large border-8 bg-white px-20 py-2;
}

/* 로고 바 */
.header .flex-grow { 
  @apply h-7;
}

.h-text {
  @apply text-3xl font-bold;
}

.text-black {
  color: black;
}

/* 각 호선 색상 클래스 
.border-lineColors-1호선 { border-color: #0052A4; }
.border-lineColors-2호선 { border-color: #00A84D; }
.border-lineColors-3호선 { border-color: #EF7C1C; }
.border-lineColors-4호선 { border-color: #00A5DE; }
.border-lineColors-5호선 { border-color: #996CAC; }
.border-lineColors-6호선 { border-color: #CD7C2F; }
.border-lineColors-7호선 { border-color: #747F00; }
.border-lineColors-8호선 { border-color: #E6186C; }
.border-lineColors-9호선 { border-color: #757575; }

.bg-lineColors-1호선 { background-color: #0052A4; }
.bg-lineColors-2호선 { background-color: #00A84D; }
.bg-lineColors-3호선 { background-color: #EF7C1C; }
.bg-lineColors-4호선 { background-color: #00A5DE; }
.bg-lineColors-5호선 { background-color: #996CAC; }
.bg-lineColors-6호선 { background-color: #CD7C2F; }
.bg-lineColors-7호선 { background-color: #747F00; }
.bg-lineColors-8호선 { background-color: #E6186C; }
.bg-lineColors-9호선 { background-color: #757575; }
*/
</style>