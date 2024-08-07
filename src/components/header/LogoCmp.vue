<template>
    <div class="header flex items-center">
      <div class="flex-grow"></div>
      <div class="logo">
        <span class="h-text font-bold text-3xl">{{ lineName }}</span>
        <span class="text-sm">METRO COMMUNITY</span>
      </div>
      <div class="flex-grow"></div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        lineName: '1호선',
      };
    },
  };
  </script>
  
  <style scoped>
  .header {
    @apply flex items-center;
  }
  
  .header .logo {
    @apply flex flex-col items-center justify-center rounded-custom-large border-8 border-customBlue bg-customBlue bg-white px-20 py-2 text-black;
  }
  
  .header .flex-grow {
    @apply h-7 bg-customBlue;
  }
  
  .h-text {
    @apply text-3xl font-bold;
  }
  </style>