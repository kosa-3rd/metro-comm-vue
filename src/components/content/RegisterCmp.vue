<!-- 
 작성자: 양건모 
 시작 일자: 2024.08.07
 ---------------------
 2024.08.08 기능 구현 완료
 
 -->
<template>
    <div>
        <div id="page-info">
            <h3 class="h-mid-text bg mb-3 font-bold">지하철 소식과 정보, 모두의 손끝에서</h3>
            <h2 class="h-large-text font-bold">MECO</h2>
        </div>
        <div id="form-div" class="">
            <form @submit.prevent="submit" id="form">
                <input
                    type="text"
                    id="userEmail"
                    v-model="userEmail"
                    placeholder=" 이메일"
                    class="data-input"
                    required
                /><br />
                <input
                    type="password"
                    id="password"
                    v-model="password"
                    placeholder=" 비밀번호 (8~20자 대소문자, 숫자)"
                    class="data-input"
                /><br />
                <input
                    type="password"
                    id="passwordConfirm"
                    v-model="passwordConfirm"
                    placeholder=" 비밀번호확인"
                    class="data-input"
                    required
                /><br />
                <input
                    type="text"
                    id="username"
                    v-model="username"
                    placeholder=" 이름 (2~4자 한글)"
                    class="data-input"
                    required
                /><br />
                <input
                    type="text"
                    id="nickname"
                    v-model="nickname"
                    placeholder=" 닉네임 (2~12자 한글, 대소문자, 숫자)"
                    class="data-input"
                    required
                /><br />
                <button id="submit" type="button" v-on:click="submit">회원가입</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            userEmail: '',
            password: '',
            passwordConfirm: '',
            username: '',
            nickname: '',
        };
    },
    methods: {
        async validateEmail(email) {
            let msg = '형식이 올바르지 않습니다';
            const regPassed = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(email);
            let dupPassed = false;

            if (regPassed) {
                dupPassed = await this.validateDup(email);
                if (!dupPassed) msg = '이미 사용중인 이메일입니다';
            }

            return this.validate(regPassed && dupPassed, email, 'userEmail', msg);
        },
        async validateDup(email) {
            let result = false;

            await axios
                .post('/api/users/validate', email, {
                    headers: {
                        'Content-Type': 'text/plain',
                    },
                })
                .then((res) => {
                    console.log('res = ' + res.data);
                    result = res.data;
                })
                .catch((error) => {
                    console.log(error);
                });

            return result;
        },
        validatePassword(password) {
            return (
                this.validate(/^[a-zA-Z0-9]{8,20}$/.test(password), password, 'password', '형식이 올바르지 않습니다') &&
                this.validatePasswordConfirm(this.passwordConfirm)
            );
        },
        validatePasswordConfirm(passwordConfirm) {
            return this.validate(
                passwordConfirm === this.password,
                passwordConfirm,
                'passwordConfirm',
                '비밀번호가 일치하지 않습니다',
            );
        },
        validateNickanme(nickname) {
            return this.validate(
                /^[a-zA-Z가-힣0-9]{2,12}$/.test(nickname),
                nickname,
                'nickname',
                '형식이 올바르지 않습니다',
            );
        },
        validateName(name) {
            return this.validate(/^[가-힣]{2,4}$/.test(name), name, 'username', '형식이 올바르지 않습니다');
        },
        validate(pass, data, id, errMsg) {
            let color = '#DB4455';
            let text = errMsg;
            const elem = document.getElementById(id);

            if (pass && elem.value != '') {
                text = '';
                color = '#3FE87F';
            }
            elem.style.borderBottomColor = color;
            elem.setCustomValidity(text);

            return pass;
        },
        validateAll() {
            this.validateEmail(this.userEmail);
            this.validateDup(this.userEmail);
            this.validatePassword(this.password);
            this.validatePasswordConfirm(this.passwordConfirm);
            this.validateName(this.username);
            this.validateNickanme(this.nickname);
        },
        submit() {
            this.validateAll();
            const form = document.getElementById('form');
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            const reqData = JSON.stringify({
                email: this.userEmail,
                password: this.password,
                username: this.username,
                nickname: this.nickname,
            });

            axios
                .post('/api/users/signup', reqData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(() => {
                    alert('회원가입이 완료되었습니다.');
                    location.href = 'http://localhost:3000/';
                })
                .catch((error) => {
                    console.log(error);
                    alert('회원 가입에 실패했습니다.');
                });
        },
    },
    watch: {
        userEmail(newEmail) {
            this.validateEmail(newEmail);
        },
        password(newPassword) {
            this.validatePassword(newPassword);
        },
        passwordConfirm(newPasswordConfirm) {
            this.validatePasswordConfirm(newPasswordConfirm);
        },
        nickname(newNickname) {
            this.validateNickanme(newNickname);
        },
        username(newName) {
            this.validateName(newName);
        },
    },
};
</script>

<style scoped>
#page-info {
    @apply text-center mt-5 mb-8;
}

#form-div {
    border: 2px solid lightgray;
    border-radius: 0.5rem;
    width: 90%;
    margin: auto;
    padding: 5%;
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
</style>
