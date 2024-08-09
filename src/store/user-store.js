import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUserStore = defineStore('users', () => {
    const user = ref(null);
    const authenticated = computed(() => {
        return user.value != null;
    });
    const login = function (email) {
        user.value = email;
    };

    return { user, authenticated, login };
});
