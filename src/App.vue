<template>
  <div id="app">
    <router-view @openBuilder="ChooseBuilderView"/>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyFooter from '@/components/Footer'
import firebase from 'firebase'

export default {
  name: 'app',
  created: function () {
    // это нужно убрать после создания модуля Профиля и кнопки "Выйти"
    firebase.auth().signOut()
    // -----------------------------
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.commit('CHANGE_CURRENT_USER', user)
      } else {
        this.$store.commit('CHANGE_CURRENT_USER', '')
      }
    })
  },
  methods: {
    ChooseBuilderView: function () {
      if (!this.$store.state.user.current) {
        this.$router.replace('/creator/preferences')
      } else {
        // открыть профиль
      }
    }
  },
  components: {
    MyFooter
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

</style>
