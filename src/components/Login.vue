<template>
 <transition name="modal">
  <div class="row login">
    <div @click="Close" class="wrap_block">
      <div class=" col-xl-4 col-lg-6 col-md-8 col-sm-12 col-12 mx-auto text-center">
        <div class="window pt-5 pb-2 mb-4 container">
          <h2 class="pb-4">Вход</h2>
          <input class="col-xl-8 col-lg-8 col-md-8 col-sm-11 col-11 mx-auto mt-4 mb-3 py-3 pl-3 d-block block_neutral" type="text" placeholder="Ваш E-mail" v-model="email">
          <input class="col-xl-8 col-lg-8 col-md-8 col-sm-11 col-11 mx-auto mt-4 mb-3 py-3 pl-3 d-block block_neutral" type="password" placeholder="Пароль" v-model="password">
          <button class="col-xl-5 col-lg-5 col-md-5 col-sm-11 col-11  button blue mx-auto mb-3 mt-5 text-center" @click="Enter">Войти в профиль</button>
          <p class="text-center mt-5">
              <span class="mr-2">Новый пользователь?</span><span @click="Switch" class="link-text">Зарегистрируйтесь</span><br>
              <span class="mr-2">Забыли пароль?</span><span @click="Reset" class="link-text">Восстановить пароль</span></p>        
        </div>
      </div>
    </div> 
  </div>
 </transition> 
</template>
<script>
import firebase from 'firebase'

export default {
  name: 'login',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    Enter: function () {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            console.log(user)
            if (user.emailVerified) {
              alert('Вы подтвердили емаил')
            } else {
              alert('Уупс вы не подтвердили e-mail')
            }
          },
          err => {
            alert('Ooops. ' + err.message)
          }
        )
    },
    Close: function (e) {
      if (e.target.className === 'wrap_block') {
        this.$emit('closeLoginWindow')
      }
    },
    Switch: function () {
      this.$emit('SwitchToSignUp')
    },
    Reset: function () {
      if (this.email) {
        console.log(firebase.auth())
        firebase
          .auth()
          .sendPasswordResetEmail(this.email)
          .then(() => {
            alert('Ссылка на востановление пароля успешно отправлена')
          })
          .catch(error => {
            alert(error)
          })
      } else {
        alert(
          'Введите в поле e-mail свой адрес электронной почты (поле Пароль заполнять не нужно)'
        )
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/styles/global";

.login {
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
    font-family: $Roboto;
    letter-spacing: -0.2px;
    font-weight: 300;
  }
}
h2 {
  font-family: $Raleway;
  font-weight: 300;
}
.link-text {
  color: $active;
  cursor: pointer;
}
.link-text:hover {
  opacity: 0.7;
}
</style>