<template>
    <!-- 메뉴 버튼 -->
    <div>
        <transition-group name="slide" tag="div" class="grid grid-cols-4 gap-2 p-2">
            <button 
    v-for="menu in visibleMenus" 
    :key="menu.id" 
    class="station-btn shared-btn"
    @click="handleStationClick(menu.id)"
>
    {{ menu.name }}
</button>
        </transition-group>
    </div>
    <div class="flex justify-end pr-2">
        <button @click="toggleMenu" class="toggle-btn shared-btn">
            {{ isExpanded ? '접기' : '펼치기' }}
        </button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        lineId: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            menus: [],
            isExpanded: false,
        };
    },
    watch: {
        lineId: {
            immediate: true,
            handler(newVal) {
                this.fetchStations(newVal);
            }
        }
    },
    computed: {
        visibleMenus() {
            return this.isExpanded ? this.menus : this.menus.slice(0, 8);
        }
    },
    methods: {
        async fetchStations(lineId) {
            try {
                const response = await axios.get(`api/station/list?subwayId=${lineId}`);
                this.menus = response.data.map(station => ({
                    id: station.id,
                    name: station.name,
                }));
            } catch (error) {
                console.error("Failed to fetch stations:", error);
            }
        },
        toggleMenu() {
            this.isExpanded = !this.isExpanded;
        },
        handleStationClick(stationId) {
            this.$emit('stationSelected', stationId);
        }
    },
};
</script>

<style scoped>
.station-btn {
    background-color: rgb(96, 111, 184);
    color: white;
    padding: 8px 12px;
    margin: 5px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    white-space: nowrap;
    min-width: 80px;
    text-align: center;
}

.station-btn:hover {
    background-color: #004080;
}

.toggle-btn {
    background-color: transparent;
    color: #424242;
    padding: 8px 12px;
    margin: 5px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    white-space: nowrap;
    min-width: 80px;
    text-align: center;
    text-decoration: underline;
}

.toggle-btn:hover {
    background-color: transparent;
    color: #424242;
    text-decoration: underline;
}

.slide-enter-active, .slide-leave-active {
    transition: all 0.2s ease;
    position: relative;
}

.slide-leave {
    transform: translateY(0);
    opacity: 1;
}

.slide-leave-to {
    transform: translateY(-5px);
    opacity: 0;
}

@media (max-width: 500px) {
    .grid-cols-4 {
        grid-template-columns: repeat(4, 1fr);
    }

    .shared-btn {
        font-size: 12px;
        padding: 6px 10px;
        min-width: 70px;
    }
}

@media (max-width: 390px) {
    .grid-cols-4 {
        grid-template-columns: repeat(4, 1fr);
    }
}
</style>