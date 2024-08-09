import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore(
    'users',
    () => {
        const user = ref(null);

        const authenticated = function () {
            return user.value != null;
        };

        const getUser = function () {
            return user.value;
        };

        const login = function (email) {
            user.value = email;
        };

        return { user, authenticated, login, getUser };
    },
    {
        persist: {
            enabled: true,
            storage: sessionStorage,
        },
    },
);
