<template>
    <div class="head">
        <login @SwitchToSignUp="SwitchSignupState" @closeLoginWindow ="SwitchLoginState" v-if="login"></login>
        <sign-up @SwitchToLogin="SwitchLoginState" @closeSignupWindow ="SwitchSignupState" v-if="signup"></sign-up>        
        <header  class="row  d-xl-flex d-lg-flex d-md-flex d-sm-none d-none" >
            <div class="py-3 mr-xl-5 col-lg-5  col-md-7 mr-md-5 col-sm-1 col-12">
                <div @click="RequestMain"><img src="../../assets/logo/LogoMain.svg" width="140px"></div>
            </div>
            <div id="unreg-app-head" class=" py-3 pl-xl-4 ml-auto col-xl-3 col-4">
                <a @click="RequestMain" class="offset-xl-2 offset-lg-3 offset-md-0">Главная</a>
                <a @click="SwitchLoginState" class="px-4 signin">Войти</a>
                <a @click="SwitchSignupState" class="button red signup"><img><span>Регистрация</span></a>
            </div>     
        </header>
        <header id="mobile-header" class="row d-xl-none d-lg-none d-md-none d-sm-flex d-xs-flex" >
               <div @click="OpenMenu" class="py-3 mr-auto col-12 text-center">
                    <img src="../../assets/logo/Logo.svg" width="40px">
                    <img src="../../assets/images/up-arrow_red.svg" width="25px" id="menu_arrow">
               </div>
               <div id="sub-list" class="col-12 py-3">
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
  name: 'unreg-app-header',
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
    },
    RequestMain: function () {
      this.$emit('RequestMain')
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
@import "../../assets/styles/global";
@import "../../assets/styles/header";

#unreg-app-head{
    a{
        font-family: $Roboto;
        font-weight: 500;
        letter-spacing: 0;
    }
    a:not(.signup){
        color: $paragraphcolor;
    }
}
@media (min-width: 1200px){
        #unreg-app-head{
          padding: 0;
        }
}
</style>