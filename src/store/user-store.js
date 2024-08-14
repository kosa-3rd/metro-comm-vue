/*
 담당자: 양건모 
 시작 일자: 2024.08.09
 설명 : 로그인 정보 저장 store
 ---------------------
 2024.08.09 양건모 | 기능 구현
 2024.08.13 양건모 | 속성 추가, 로그인/아웃 함수 수정
 
*/

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';
import router from '@/router';

export const useUserStore = defineStore(
    'users',
    () => {
        const user = ref({
            email: null,
            nickname: null,
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

        const getNickname = computed(() => {
            return user.value.nickname;
        });

        const login = function (info) {
            user.value.email = info.email;
            user.value.nickname = info.nickname;
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
                sessionStorage.removeItem('users');
                user.value.email = null;
                user.value.token = null;
                router.push('/');
            }

            return sessionStorage.getItem('users') == null;
        };

        return { user, authenticated, login, getEmail, getAuth, getNickname, logout };
    },
    {
        persist: {
            enabled: true,
            storage: sessionStorage,
        },
    },
);
