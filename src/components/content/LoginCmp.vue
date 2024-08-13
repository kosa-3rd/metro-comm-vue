<!-- 
 담당자: 양건모 
 시작 일자: 2024.08.08
 설명 : 로그인 컴포넌트
 ---------------------
 2024.08.09 양건모 | 기능 구현
 2024.08.09 양건모 | 디자인 수정, 회원가입 링크 추가
 
 -->
<template>
    <div id="login-wrapper">
        <div id="upper-compo">
            <div id="upper-compo-left" class="w-6 mb-4 mt-4">
                <button @click="goPrev">
                    <img src="../../assets/left_arrow.png" style="width: 1.5rem; height: 1.5rem" />
                </button>
            </div>
            <div id="upper-compo-center">
                <h3 id="sign-info" class="text-xl font-semibold text-center mb-4 mt-4">로그인</h3>
            </div>
            <div id="upper-compo-right" class="w-6"></div>
        </div>
        <div id="form-div" class="">
            <form @submit.prevent="submit" id="form">
                <input
                    type="text"
                    id="userEmail"
                    v-model="emailInput"
                    placeholder=" Email"
                    class="data-input"
                    required
                /><br />
                <input
                    type="password"
                    id="password"
                    v-model="passwordInput"
                    placeholder=" Password"
                    class="data-input"
                /><br />
                <button id="submit" type="button" v-on:click="submit">Sign In</button>
                <h3 id="err" class="text-center text-lg text-red-500 font-semibold mt-4 errMsg">
                    아이디 혹은 비밀번호를 확인해주세요
                </h3>
            </form>
        </div>
        <div id="register-link">
            <router-link to="/register">회원가입</router-link>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        goPrev() {
            this.$router.go(-1);
        },
    },
};
</script>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useUserStore } from '@/store/user-store';
import router from '@/router';
import tempMember from '../../../public/member';

const emailInput = ref('');
const passwordInput = ref('');
const userStore = useUserStore();

const tremble = (target) => {
    target.classList.add('vibration-infinite');

    setTimeout(function () {
        target.classList.remove('vibration-infinite');
    }, 300);
};

const submit = async function () {
    const requestData = JSON.stringify({
        email: emailInput.value,
        password: passwordInput.value,
    });

    await axios
        .post('/api/users/login', requestData, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(function (info) {
            console.log(info.data);
            userStore.login(info.data);
        })
        .then(() => {
            router.push('/');
        })
        .catch(() => {
            console.log(tempMember.email + ' ' + tempMember.password);
            console.log(emailInput.value + ' ' + passwordInput.value);

            document.getElementById('err').style.visibility = 'visible';
            tremble(document.getElementById('submit'));
            tremble(document.getElementById('sign-info'));
        });
};
</script>

<style scoped>
#page-info {
    @apply text-center mt-10 mb-8;
}

#form-div {
    border: 2px solid lightgray;
    border-radius: 0.5rem;
    width: 90%;
    margin: auto;
    padding: 10% 5% 2% 5%;
}

#form-div label {
    @apply text-lg;
    display: block;
    width: 5rem;
    font-weight: bold;
}

.data-input {
    @apply h-9 m-auto block mb-5;
    width: 90%;
    max-width: 600px;
    border-bottom: 3px solid lightgray;
    outline: none;
}

.data-input:focus {
    border-bottom: 3px solid black;
}

#submit {
    border-radius: 0.5rem;
    width: 90%;
    height: 2rem;
    @apply bg-black m-auto block text-white;
    margin-top: 2rem;
}

form {
    padding-top: 3rem;
    padding-bottom: 2rem;
}

#login-wrapper {
    @apply mb-32;
}

#err {
    visibility: hidden;
}

#upper-compo {
    justify-content: space-between;
    margin: 0 2rem 0 2rem;
    @apply flex mb-4 mt-4 pb-0;
    border-bottom: 1px solid #e5e5e5; /* 선 추가 */
    border-top: 1px solid #e5e5e5;
}

#register-link {
    margin: auto;
    width: 90%;
    text-align: right;
    margin-right: 8%;
    color: #aaa;
    @apply text-lg mt-3 underline;
}
</style>
