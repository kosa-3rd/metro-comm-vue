<!-- 
 작성자: 양건모 
 시작 일자: 2024.08.08
 ---------------------
 2024.08.08 기능 구현 완료
 
 -->
<template>
    <div id="login-wrapper">
        <div id="page-info">
            <h3 class="h-mid-text bg mb-3 font-bold">로그인</h3>
        </div>
        <div id="form-div" class="">
            <form @submit.prevent="submit" id="form">
                <input
                    type="text"
                    id="userEmail"
                    v-model="userInput.userEmail"
                    placeholder=" Email"
                    class="data-input"
                    required
                /><br />
                <input
                    type="password"
                    id="password"
                    v-model="userInput.password"
                    placeholder=" Password"
                    class="data-input"
                /><br />
                <button id="submit" type="button" v-on:click="submit">Sign In</button>
            </form>
        </div>
    </div>
</template>

<!-- <script>
import axios from 'axios';

export default {
    data() {
        return {
            userEmail: '',
            password: '',
        };
    },
    methods: {
        async submit() {
            const requestData = JSON.stringify({
                email: this.userEmail,
                password: this.password,
            });
            await axios
                .post('/api/users/login', requestData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then((info) => {
                    console.log(info);
                })
                .catch();
        },
    },
};
</script> -->

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useUserStore } from '@/store/user-store';
import router from '@/router';

const userInput = ref({
    userEmail: '',
    password: '',
});

const login = useUserStore.login();
const authenticated = useUserStore.authenticated;

const submit = async function () {
    const requestData = JSON.stringify({
        email: userInput.value.userEmail,
        password: userInput.value.password,
    });
    await axios
        .post('/api/users/login', requestData, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((info) => {
            console.log(info.data.email);

            this.login(info.data.email);
            if (authenticated) {
                router.push('/');
            }
        })
        .catch((err) => {
            console.log('로그인 정보 없음: ' + err);
        });
};

// };
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
    padding: 10% 5%;
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
}

form {
    padding-top: 3rem;
    padding-bottom: 3rem;
}

#login-wrapper {
    @apply mb-32;
}
</style>
