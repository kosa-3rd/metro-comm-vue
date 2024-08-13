import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';
import router from '@/router';

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

        const getEmail = computed(() => {
            return user.value.email;
        });

        const getAuth = computed(() => {
            return user.value.token;
        });

        const login = function (info) {
            user.value.email = info.email;
            user.value.token = info.token;
        };

        const logout = async function () {
            try {
                await axios.delete('/api/users', {
                    data: {
                        email: getEmail.value,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: getAuth.value, // computed 속성의 .value 사용
                    },
                });

                sessionStorage.removeItem('users');
                user.value.email = null;
                user.value.token = null;
                router.push('/');
            } catch (err) {
                console.log(getAuth.value); // 디버깅을 위한 토큰 출력
                console.log(err); // 오류 로그 출력
            }

            return sessionStorage.getItem('users') == null;
        };

        return { user, authenticated, login, getEmail, getAuth, logout };
    },
    {
        persist: {
            enabled: true,
            storage: sessionStorage,
        },
    },
);
