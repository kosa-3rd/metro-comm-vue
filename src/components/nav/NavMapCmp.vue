<template>
    <div class="modal">
      <div class="modal-content">
        <span class="close" @click="$emit('close')">&times;</span>
        <h3>NavMap</h3>
      </div>
    </div>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style scoped>
  .modal {
    @apply fixed inset-0 flex items-center justify-center bg-black bg-opacity-50;
  }
  
  .modal-content {
    @apply bg-white p-6 rounded shadow-lg;
  }
  
  .close {
    @apply absolute top-0 right-0 p-4 cursor-pointer;
  }
  </style>