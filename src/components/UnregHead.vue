<template>
<div class="head">
        <login @SwitchToSignUp="SwitchSignupState" @closeLoginWindow ="SwitchLoginState" v-if="login"></login>
        <sign-up @SwitchToLogin="SwitchLoginState" @closeSignupWindow ="SwitchSignupState" v-if="signup"></sign-up>
        <header  class="row  d-xl-flex d-lg-flex d-md-flex d-sm-none d-none" >
               <div class="py-3 mr-auto col-9">
                    <router-link to="/"><img src="../assets/logo/Logo.svg" width="40px"></router-link>
                    <router-link to="/#mainblock" v-scroll-to="'#mainblock'" class="pr-4 pl-5 pt-4">О ПРОДУКТЕ</router-link>
                    <router-link to="/#advantages" v-scroll-to="'#advantages'" class="px-4 pt-4 ">ПРИЕМУЩЕСТВА</router-link>
                    <router-link to='/team' class="px-4 pt-4">КОМАНДА</router-link>
                    <router-link to="/#reviews" v-scroll-to="'#reviews'" class="px-4 pt-4">ОТЗЫВЫ</router-link>
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
                    <router-link to="/#mainblock" v-scroll-to="'#mainblock'" class="py-2 text-center d-block col-12" @click.native="OpenMenu">О ПРОДУКТЕ</router-link>
                    <router-link to="/#advantages" v-scroll-to="'#advantages'"  class="py-2 text-center d-block col-12" @click.native="OpenMenu">ПРИЕМУЩЕСТВА</router-link>
                    <router-link to='/team' class="py-2 text-center d-block col-12" @click.native="OpenMenu">КОМАНДА</router-link>
                    <router-link to="/#reviews" v-scroll-to="'#reviews'" class="py-2 text-center d-block col-12" @click.native="OpenMenu">ОТЗЫВЫ</router-link>
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
      anchors: true
    }
  },
  methods: {
    OpenMenu: function () {
      this.$store.commit('OpenMenu')
    },
    SwitchLoginState: function () {
      this.$store.commit('SwitchLoginState')
    },
    SwitchSignupState: function () {
      this.$store.commit('SwitchSignupState')
    }
  },
  computed: {
    login () {
      return this.$store.state.head.login
    },
    signup () {
      return this.$store.state.head.signup
    }
  },
  components: { Login, SignUp }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/global";
@import "../assets/styles/header";

header{
  border-bottom: 1px solid $block_grey_outline;
}
</style>