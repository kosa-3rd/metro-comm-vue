<template>
    <footer class="bg-custom-white text-black py-8-custom">
      <div class="container mx-auto flex flex-wrap justify-between items-stretch space-y-4-custom">
        <div class="w-full md:w-1/3 mb-4 md:mb-0 text-left md:text-center"> <!-- 반응형 텍스트 정렬 -->
          <h3 class="text-base text-custom cursor-pointer text-faded hover-effect" @click="toggleContent('projectContent')">
            MeCo
          </h3>
          <div class="overflow-hidden transition-all duration-500" ref="projectContent" :style="{ maxHeight: projectContentHeight }">
            <p class="text-sm mt-2 text-faded">Metro Community Service</p>
          </div>
        </div>
  
        <div class="w-full md:w-1/3 mb-4 md:mb-0 text-left md:text-center text-faded"> <!-- 반응형 텍스트 정렬 -->
          <h3 class="text-base text-custom cursor-pointer hover-effect" @click="toggleContent('teamContent')">
            프로젝트 팀원 소개
          </h3>
          <div class="overflow-hidden transition-all duration-500" ref="teamContent" :style="{ maxHeight: teamContentHeight }">
            <p class="text-sm mt-2 text-faded">양건모, 이강주, 박상현, 김호영</p>
          </div>
        </div>
  
        <div class="w-full md:w-1/3 mb-4 md:mb-0 text-left md:text-center text-faded"> <!-- 반응형 텍스트 정렬 -->
          <h3 class="text-base text-custom cursor-pointer hover-effect" @click="toggleContent('techContent')">
            사용 기술
          </h3>
          <div class="overflow-hidden transition-all duration-500 text-left" ref="techContent" :style="{ maxHeight: techContentHeight }">
            <p class="text-sm mt-2 text-faded">
              ㆍ Front-end: Vue 3.x
              <br>ㆍ Backend: SpringBoot 3.x
              <br>ㆍ DBMS: MySQL
              <br>ㆍ Persistence: Mybatis
              <br>ㆍ API: <a href="https://data.seoul.go.kr/together/guide/useGuide.do" class="text-blue-500 hover:underline">서울 열린데이터광장</a> : <br>운행 정보 및 실시간 도착정보 제공
            </p>
          </div>
        </div>
      </div>
  
      <div class="container mx-auto flex flex-wrap justify-between items-center mt-4 space-y-4-custom">
        <div class="w-full md:w-1/2 text-left md:text-center mb-4 md:mb-0">
          <p class="text-xs text-custom text-faded">© 2023 MeCo (Metro Community Service)</p>
          <p class="text-xs text-custom text-faded">3차 Project [Vue] · 2024.08.05[월] ~ 2024.08.16[금]</p>
        </div>
  
        <div class="w-full md:w-1/2 flex justify-center md:justify-end space-x-4 py-3">
          <a href="https://career.sw.or.kr/"><img src="@/assets/KOSA.png" alt="KOSA" class="h-12"></a>
          <a href="https://github.com/orgs/kosa-3rd/teams/temp/repositories"><img src="@/assets/github.png" alt="GitHub" class="h-12"></a>
          <a href="https://www.notion.so/KOSA-3-f2f02cd195a94d88add76f49e823f184"><img src="@/assets/notion.png" alt="notion" class="h-12"></a>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    data() {
      return {
        projectContentHeight: '0px',
        teamContentHeight: '0px',
        techContentHeight: '0px'
      };
    },
    methods: {
      toggleContent(refName) {
        const contentRef = this.$refs[refName];
        const currentHeight = this[`${refName}Height`];
  
        this[`${refName}Height`] = currentHeight === '0px' ? `${contentRef.scrollHeight}px` : '0px';
      }
    }
  };
  </script>
  
  <style scoped>
  .bg-custom-white {
    background-color: rgb(249, 249, 249); /* 적용된 색상 */
  }
  
  .text-custom {
    color: rgb(51, 51, 51); /* 글씨 색상 */
    font-weight: 700; /* 글씨 두께 */
  }
  
  .py-8-custom {
    padding-top: 1rem;
    padding-bottom: 5rem;
    padding-left: 0.8rem;
    padding-right: 0.8rem;
  }
  
  .text-faded {
    opacity: 0.8; /* 글씨를 연하게 */
  }
  
  .justify-center {
    justify-content: space-evenly;
  }
  
  .transition-all {
    transition: all 0.5s ease-in-out;
  }
  
  .hover-effect {
    position: relative;
    transition: color 0.3s ease-in-out;
  }
  
  .hover-effect:hover {
    color: rgb(51, 51, 51); /* 마우스 오버 시 색상을 더 진하게 */
  }
  
  .hover-effect::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px; /* 텍스트 아래에 위치 */
    width: 100%;
    height: 2px;
    background-color: rgb(51, 51, 51); /* border 색상 */
    transform: scaleX(0);
    transition: transform 0.3s ease-in-out;
  }
  
  .hover-effect:hover::after {
    transform: scaleX(1);
  }
  </style>