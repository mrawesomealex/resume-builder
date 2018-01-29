export default {
  store: {
    current: ''
  },
  mutations: {
    CHANGE_CURRENT_USER: function (state, newUser) {
      state.current = newUser
    }
  }
}
