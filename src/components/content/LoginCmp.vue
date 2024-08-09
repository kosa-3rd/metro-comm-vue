<!-- 
 작성자: 양건모 
 시작 일자: 2024.08.08
 ---------------------
 2024.08.09 기능 구현 완료
 
 -->
<template>
    <div id="login-wrapper">
        <h3 id="sign-info" class="h-mid-text text-center mb-4 font-semibold">Sign In</h3>
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
                    아이디 혹은 비밀번호가 일치하지 않습니다
                </h3>
            </form>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useUserStore } from '@/store/user-store';
import router from '@/router';

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
        .then((info) => {
            console.log(info.data.email);
            userStore.login(info.data.email);
            router.push('/');
        })
        .catch(() => {
            document.getElementById('err').style.visibility = 'visible';
            tremble(document.getElementById('submit'));
            tremble(document.getElementById('sign-info'));
        });

    console.log(userStore.authenticated);
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
    padding-bottom: 3rem;
}

#login-wrapper {
    @apply mb-32;
}

#err {
    visibility: hidden;
}
</style>
