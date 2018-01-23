import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const Header = {
  state: {
    login: false,
    signup: false,
    open: false
  },
  mutations: {
    OpenMenu: function (state) {
      if (!state.open) {
        // eslint-disable-next-line
        $("#mobile-header").css({ height: "60vh" })
      } else {
        // eslint-disable-next-line
        $("#mobile-header").css({ height: "9vh" })
      }
      state.open = !state.open
    },
    SwitchLoginState: function (state) {
      if (state.signup) {
        state.signup = !state.signup
      }
      state.login = !state.login
      // eslint-disable-next-line
      $("#mobile-header").css({ height: "9vh" })
      state.open = false
    },
    SwitchSignupState: function (state) {
      if (state.login) {
        state.login = !state.login
      }
      state.signup = !state.signup
      // eslint-disable-next-line
      $("#mobile-header").css({ height: "9vh" })
      state.open = false
    }
  }
}

const Builder = {
  state:{
    currentStage: [1,0,0,0,0,0],
    done: [0,0,0,0,0,0],
    error: [0,0,0,0,0,0]
  }
}

export const store = new Vuex.Store({
  modules: {
    head: Header,
    builder: Builder
  }
})
