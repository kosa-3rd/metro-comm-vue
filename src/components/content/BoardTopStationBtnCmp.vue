<template>
    <h3>BoardTopStationButton</h3>
    <div class="grid grid-cols-5 gap-1 p-2 bg-gray-200">
        <button v-for="menu in visibleMenus" :key="menu" class="station-btn">
            {{ menu }}
        </button>
    </div>
    <div class="flex justify-end pr-2">
        <button @click="toggleMenu" class="toggle-btn">
            {{ isExpanded ? '접기' : '펼치기' }}
        </button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            menus: [
                '버튼1',
                '버튼2',
                '버튼3',
                '버튼4',
                '버튼5',
                '버튼6',
                '버튼7',
                '버튼8',
                '버튼9',
                '버튼10',
                '버튼11',
                '버튼12',
                '버튼13',
                '버튼14',
                '버튼15',
                '버튼16',
                '버튼17',
                '버튼18',
                '버튼19',
                '버튼20',
                '버튼21',
            ],
        }
    }
};
</script>

<style scoped></style>
