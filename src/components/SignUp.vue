<template>
  <transition name="modal">
  <div class="row sign_up">
    <div @click="Close" class="wrap_block">
      <div class="col-xl-4 col-lg-6 col-md-8 col-sm-10 col-12 mx-auto text-center">
        <div class="window pt-5 pb-2 mb-4 container">
          <img src="../assets/images/cancel.svg" class="d-xl-none d-lg-none d-md-none d-sm-none " id="close-btn">
          <h2 class="pb-4">Регистрация</h2>
          <transition name="flowup">
            <p class="errorMessage col-xl-8 col-lg-8 col-md-8 col-sm-11 col-11 mx-auto text-left px-0" v-if="!this.validation.email && this.BLUR_FLAG_EMAIL">E-mail введен неккоректно</p>
          </transition>
          <input :class="['col-xl-8 col-lg-8 col-md-8 col-sm-11 col-11 mx-auto mt-4 mb-3 py-3 pl-3 d-block block_neutral', (!this.validation.email && this.BLUR_FLAG_EMAIL) ? errorClass : '']" 
                 type="text" 
                 placeholder="Ваш E-mail" 
                 v-model="email"
                 @blur.once="UnBlur('email')">
          <transition name="flowup">
            <p class="errorMessage col-xl-8 col-lg-8 col-md-8 col-sm-11 col-11 mx-auto text-left  px-0" v-if="!this.validation.password && this.BLUR_FLAG_PASSWORD">Необходимо  минимум  6  символов, также  минимум  1 цифра и 1 буква</p>
          </transition>       
          <input :class="['col-xl-8 col-lg-8 col-md-8 col-sm-11 col-11  mx-auto mt-3 mb-4 py-3 pl-3 d-block block_neutral',(!this.validation.password && this.BLUR_FLAG_PASSWORD) ? errorClass : '']" 
                 type="password" 
                 placeholder="Пароль" 
                 v-model="password"
                 @blur.once="UnBlur('password')">
          <button class="col-xl-5 col-lg-5 col-md-5 col-sm-11 col-11  button blue mx-auto mb-3 mt-5 text-center" :disabled="!this.isValid" @click="SignUp">Создать</button>
          <p class="text-center mt-5">
              <span class="mr-2">Уже с нами?</span><span  @click="Change" class="link-text">Войти</span>
          </p>        
        </div>
      </div>      
    </div> 
  </div>
 </transition> 
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'signUp',
  data: function () {
    return {
      email: '',
      password: '',
      VALID_EMAIL_REG: /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      BLUR_FLAG_EMAIL: false,
      BLUR_FLAG_PASSWORD: false,
      errorClass: 'error'
    }
  },
  methods: {
    SignUp: function () {
      if (this.isValid) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(
            user => {
              user.sendEmailVerification()
              alert('Запрос на подтверждение был отправлен на адрес ' + user.email)
              this.$emit('SwitchToLogin')
            },
            err => {
              alert('Oops. ' + err.message)
            }
          )
      } else {
        this.UnBlur('password')
      }
    },
    Close: function (e) {
      if (e.target.className === 'wrap_block' || e.target.id === 'close-btn') {
        this.$emit('closeSignupWindow')
      }
    },
    Change: function () {
      this.$emit('SwitchToLogin')
    },
    UnBlur: function (field) {
      if (field === 'email') {
        this.BLUR_FLAG_EMAIL = true
      } else {
        this.BLUR_FLAG_PASSWORD = true
      }
    }
  },
  computed: {
    validation: function () {
      return {
        email: this.VALID_EMAIL_REG.test(this.email),
        password: this.password.match(/[A-Za-z]/) && this.password.match(/\d/) && this.password.length >= 6
      }
    },
    isValid: function () {
      let status = this.validation.password && this.validation.email
      return status
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../assets/styles/global';

.sign_up {
  position: fixed;
  z-index: 200;
  transition: opacity 0.3s ease;
}
.wrap_block {
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: rgba(32, 32, 32, 0.97);
  transition: 0.3s ease;
  .window {
    background: white;
    border-radius: 6px;
    border-top: 5px solid $btn_blue_text;
    box-shadow: 0px 3px 10px 2px rgba(49, 49, 49, 0.678);
  }
  p {
    color: grey;
    font-family: $Exo;
    letter-spacing: -0.2px;
    font-weight: 400;
  }
}
h2 {
  font-family: $Exo;
  font-weight: 300;
}
.link-text {
  color: $active;
  cursor: pointer;
}
.link-text:hover {
  opacity: 0.7;
}
.error::placeholder{
  color:$active;
}
</style>