import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUserStore = defineStore(
    'users',
    () => {
        const user = ref({
            email: null,
            token: null,
        });

        const authenticated = computed(() => {
            return user.value.token != null;
        });

        const getUser = function () {
            return user.value.email;
        };

        const getAuth = function () {
            return user.value.password;
        };

        const login = function (info) {
            user.value.email = info.email;
            user.value.token = info.token;
        };

        const logout = function () {
            sessionStorage.removeItem('users');
            user.value = null;
            return sessionStorage.getItem('users') == null;
        };

        return { user, authenticated, login, getUser, getAuth, logout };
    },
    {
        persist: {
            enabled: true,
            storage: sessionStorage,
        },
    },
);
