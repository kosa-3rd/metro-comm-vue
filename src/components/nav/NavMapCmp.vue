<!-- 
 담당자: 양건모
 시작 일자: 2024.08.09
 설명 : 지하철 노선도 컴포넌트, 스크롤 드래그 액션 + 핀치줌 적용
 ---------------------
 2024.08.09 김호영 | 모달 생성 삭제, 기초 디자인
 2024.08.11 양건모 | 기능 구현 완료
 
 -->

<template>
    <div class="modal" @click.self="closeModal">
        <!-- 바깥 영역 클릭 시 모달 닫기 -->
        <div class="modal-content">
            <!-- Pinch Zoom 적용 -->
            <div ref="zoomContainer">
                <img
                    id="metro-map"
                    :style="{ transform: transformStyle }"
                    src="../../assets/metro_map.jpg"
                    @drag="drag"
                    @dragstart="startDragging"
                    @dragend="stopDragging"
                />
            </div>
        </div>
    </div>
</template>

<script>
import PinchZoom from 'pinch-zoom-js';

export default {
    data() {
        return {
            lastMouseX: 0,
            lastMouseY: 0,
            translateX: 0,
            translateY: 0,
            currentScale: 1,
            minScale: 1,
        };
    },
    computed: {
        transformStyle() {
            return `translate(${this.translateX}px, ${this.translateY}px) scale(${this.currentScale})`;
        },
    },
    methods: {
        closeModal() {
            this.$router.back(); // 이전 페이지로 돌아가기
        },
        handleWheel(event) {
            // 마우스 휠로 이미지 확대/축소
            event.preventDefault(); // 기본 스크롤 동작 방지

            const scaleStep = 0.1; // 확대/축소 정도

            let scale = this.currentScale;
            scale += event.deltaY < 0 ? scaleStep : -scaleStep; // 휠 방향에 따른 확대/축소
            scale = Math.min(Math.max(0.5, scale), 3); // 최소/최대 스케일 제한
            scale = Math.max(this.minScale, scale); // 최소 스케일 제한

            this.currentScale = scale;
        },
        startDragging(event) {
            this.lastMouseX = event.clientX;
            this.lastMouseY = event.clientY;
        },
        drag(event) {
            const deltaX = event.clientX - this.lastMouseX;
            const deltaY = event.clientY - this.lastMouseY;

            this.translateX += deltaX;
            this.translateY += deltaY;

            this.lastMouseX = event.clientX;
            this.lastMouseY = event.clientY;
        },
        stopDragging(event) {
            const deltaX = event.clientX - this.lastMouseX;
            const deltaY = event.clientY - this.lastMouseY;

            this.translateX += deltaX;
            this.translateY += deltaY;

            this.lastMouseX = event.clientX;
            this.lastMouseY = event.clientY;
            // 이벤트 리스너 제거
            //document.removeEventListener('mousemove', this.drag);
            //document.removeEventListener('mouseup', this.stopDragging);
        },
    },
    mounted() {
        // Pinch Zoom 초기화
        const element = this.$refs.zoomContainer;
        new PinchZoom(element, {
            draggableUnzoomed: true, // 드래그 가능 설정
        });

        // 마우스 휠 이벤트 리스너 추가
        const zoomElement = this.$refs.zoomContainer.firstChild;
        zoomElement.addEventListener('wheel', this.handleWheel);
    },
    beforeUnmount() {
        // 컴포넌트가 파괴되기 전에 이벤트 리스너 제거
        const zoomElement = this.$refs.zoomContainer.firstChild;
        zoomElement.removeEventListener('wheel', this.handleWheel);

        document.removeEventListener('mousemove', this.drag);
        document.removeEventListener('mouseup', this.stopDragging);
    },
};
</script>

<style scoped>
.modal {
    @apply fixed inset-0 flex items-center justify-center bg-black bg-opacity-50;
    z-index: 1000; /* 다른 요소보다 앞에 나타나도록 높은 z-index 설정 */
    animation: fadeIn 0.2s ease-out; /* 천천히 열리는 애니메이션 */
}

.modal-content {
    position: relative;
    border-radius: 0.25rem;
    background-color: #ffffff;
    padding: 1.5rem;
    box-shadow: var(--tw-shadow);
    max-width: 900px;
    max-height: 700px;
    overflow-y: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0;
    border: 1px solid #4b4b4b;
    overflow: hidden;
}

@media (orientation: landscape) {
    .modal-content {
        width: 600px;
        height: 800px;
    }
}

@media (orientation: portrait) {
    .modal-content {
        width: 90%;
        height: 470px;
    }
}

.close {
    @apply absolute top-0 right-0 p-4 cursor-pointer;
    font-size: 1.5rem;
    color: black;
}

h3 {
    @apply text-center;
}

@keyframes fadeIn {
    from {
        opacity: 0; /* 투명한 상태에서 시작 */
    }
    to {
        opacity: 1; /* 완전히 불투명하게 끝남 */
    }
}
</style>
