<template>
    <div>
      <div id="upper-compo">
            <div id="upper-compo-left" class="w-6">
                <button @click="goPrev">
                    <img src="../../assets/left_arrow.png" style="width: 1.5rem; height: 1.5rem" />
                </button>
            </div>
            <div id="upper-compo-center">
                <h3 id="sign-info" class="text-xl font-semibold text-center mb-4">마이페이지</h3>
            </div>
            <div id="upper-compo-right" class="w-6"></div>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
        goPrev() {
          this.$router.push('/');
        },
    },
  };
  </script>
  
  <style scoped>
#upper-compo {
    justify-content: space-between;
    margin: 0 2rem 0 2rem;
    @apply flex mb-4 pb-0;
}

#upper-compo * {
    /* background: red; */
}</style>
  