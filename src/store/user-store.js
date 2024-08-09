import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUserStore = defineStore(
    'users',
    () => {
        const user = ref(null);

        const authenticated = computed(() => {
            return user.value != null;
        });

        const getUser = function () {
            return user.value;
        };

        const login = function (email) {
            user.value = email;
        };

        const logout = function () {
            sessionStorage.removeItem('users');
            user.value = null;
            return sessionStorage.getItem('users') == null;
        };

        return { user, authenticated, login, getUser, logout };
    },
    {
        persist: {
            enabled: true,
            storage: sessionStorage,
        },
    },
);
