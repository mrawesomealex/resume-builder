<template>
<div class="head">
        <login @SwitchToSignUp="SwitchSignupState" @closeLoginWindow ="SwitchLoginState" v-if="login"></login>
        <sign-up @SwitchToLogin="SwitchLoginState" @closeSignupWindow ="SwitchSignupState" v-if="signup"></sign-up>
        <header  class="row  d-xl-flex d-lg-flex d-md-flex d-sm-none d-none" >
               <div class="py-3 mr-auto col-9">
                    <router-link to="/"><img src="../assets/logo/Logo.svg" width="40px"></router-link>
                    <router-link to="/" v-scroll-to="'#mainblock'" class="pr-4 pl-5 pt-4">О ПРОДУКТЕ</router-link>
                    <router-link v-if="this.$router.history.current.fullPath === '/'" to="/" v-scroll-to="'#advantages'" class="px-4 pt-4 ">ПРИЕМУЩЕСТВА</router-link>
                    <router-link to='/team' class="px-4 pt-4">КОМАНДА</router-link>
                    <router-link v-if="this.$router.history.current.fullPath === '/'" to="/" v-scroll-to="'#reviews'" class="px-4 pt-4">ОТЗЫВЫ</router-link>
                </div>
                <div  class="pt-2 pb-3 ml-auto col-3">
                    <a @click="SwitchLoginState" class="signin offset-xl-4 offset-lg-3 offset-md-0 pt-4">ВОЙТИ</a>
                    <span class="pt-3 divider h4 px-2">.</span>
                    <a @click="SwitchSignupState" class="signup pt-4 pr-4">РЕГИСТРАЦИЯ</a>
                </div> 
        </header>
        <header id="mobile-header" class="row d-xl-none d-lg-none d-md-none d-sm-flex d-xs-flex" >
               <div @click="OpenMenu" class="py-3 mr-auto col-12 text-center">
                    <img src="../assets/logo/Logo.svg" width="40px">
                    <img src="../assets/images/up-arrow_red.svg" width="25px" id="menu_arrow">
               </div>
               <div id="sub-list" class="col-12 py-3">
                    <router-link to="/" v-scroll-to="'#mainblock'" class="py-2 text-center d-block col-12">О ПРОДУКТЕ</router-link>
                    <router-link to="/" v-scroll-to="'#advantages'"  class="py-2 text-center d-block col-12">ПРИЕМУЩЕСТВА</router-link>
                    <router-link to='/team' class="py-2 text-center d-block col-12">КОМАНДА</router-link>
                    <router-link to="/" v-scroll-to="'#reviews'" class="py-2 text-center d-block col-12">ОТЗЫВЫ</router-link>
                    <a  @click="SwitchLoginState" class="signin py-2 mt-5 text-center d-block col-12">ВОЙТИ</a>
                    <a  @click="SwitchSignupState"  class="signup py-2 text-center d-block col-12">РЕГИСТРАЦИЯ</a>
               </div>        
        </header>
</div>        
</template>

<script>
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'

export default {
  name: 'unreg-header',
  data: function () {
    return {
      login: false,
      signup: false,
      open: false,
      anchors: true
    }
  },
  methods: {
    OpenMenu: function () {
      if (!this.open) {
        // eslint-disable-next-line
        $("#mobile-header").css({ height: "60vh" })
      } else {
        // eslint-disable-next-line
        $("#mobile-header").css({ height: "9vh" })
      }
      this.open = !this.open
    },
    SwitchLoginState: function () {
      if (this.signup) {
        this.signup = !this.signup
      }
      this.login = !this.login
      // eslint-disable-next-line
      $("#mobile-header").css({ height: "9vh" })
      this.open = false
    },
    SwitchSignupState: function () {
      if (this.login) {
        this.login = !this.login
      }
      this.signup = !this.signup
      // eslint-disable-next-line
      $("#mobile-header").css({ height: "9vh" })
      this.open = false
    }
  },
  components: { Login, SignUp }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/global";
a{
    transition: opacity 0.3s;
}
header {
  display: flex;
  align-items: center;
  position: fixed;
  width: 100vw;
  background: rgba(255, 255, 255, 0.98);
  z-index: 200;
  border-bottom: 1px solid $block_grey_outline;

  .signup {
    color: $active;
  }
  a {
    font-family: $Raleway;
  }
  a:hover {
    text-decoration: none;
    color: $active;
  }
}
#mobile-header {
  height: 9vh;
  overflow-y: hidden;
  transition: 0.3s;
  z-index: 200;
  .signup {
    color: $active;
  }
}
a {
  font-family: $Roboto;
  font-weight: 700;
  font-size: 0.8vw;
  color: $main_black;
  text-align: center;
  transition: 0.2s;
  letter-spacing: 1.1px;
}
.divider {
  font-size: 16pt;
}
#menu_arrow {
  transform: rotate(180deg);
  transition: 0.3s;
}
@media (max-width: 1200px) {
  a {
    font-size: 0.9vw;
  }
}
@media (max-width: 990px) {
  a {
    font-size: 1.2vw;
  }
}
@media (max-width: 767px) {
  #sub-list a {
    font-size: 2.2vw;
  }
}
@media (max-width: 570px) {
  #sub-list a {
    font-size: 4vw;
    letter-spacing: 0px;
  }
}
</style>