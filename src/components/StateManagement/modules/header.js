export default{
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
