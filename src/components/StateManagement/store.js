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
  state: {
    currentStage: [1, 0, 0, 0, 0, 0],
    done: [0, 0, 0, 0, 0, 0],
    error: [0, 0, 0, 0, 0, 0]
  },
  mutations: {
    CHANGE_STEP: function (state, status) {
      for (let i = 0; i < state.currentStage.length; i++) {
        state.currentStage[i] = 0
      }
      state.currentStage[status] = 1
    }
  }
}
const Areas = {
  state: {
    // добавить получение данных из БД
    arealist: ['sphere1dkjsf nkjsndfjksnakjdnsak jdnajkdsakdnkasndknaskdkjfn gsdfsfdjknjsdfnjsf', 'sphere2', 'sphere3', 'sphere1', 'sphere2', 'sphere3', 'sphere1', 'sphere2', 'sphere3', 'sphere1', 'sphere2', 'sphere3']
  }
}
const Resume = {
  state: {
    preferences: {
      work_status: [0, 0, 0],
      area: '',
      salary_type: [0, 0],
      salary: 0,
      work_term: [0, 0, 0],
      hours: 0
    }
  },
  mutations: {
    CHANGE_WORK_STATUS: function (state, newStatus) {
      for (let i = 0; i < state.preferences.work_status.length; i++) {
        state.preferences.work_status[i] = 0
      }
      state.preferences.work_status[newStatus] = 1
    },
    CHANGE_AREA: function (state, value) {
      state.preferences.area = value
    },
    CHANGE_SALARY_TYPE: function (state, newType) {
      for (let i = 0; i < state.preferences.salary_type.length; i++) {
        state.preferences.salary_type[i] = 0
      }
      state.preferences.salary_type[newType] = 1
    },
    CHANGE_SALARY: function (state, value) {
      state.preferences.salary = value
    },
    CHANGE_WORK_TERM: function (state, newTerm) {
      for (let i = 0; i < state.preferences.work_term.length; i++) {
        state.preferences.work_term[i] = 0
      }
      state.preferences.work_term[newTerm] = 1
    },
    CHANGE_HOURS: function (state, value) {
      state.preferences.hours = value
    }
  }
}

export const store = new Vuex.Store({
  modules: {
    head: Header,
    builder: Builder,
    resume: Resume,
    areas: Areas
  },
  strict: true
})
