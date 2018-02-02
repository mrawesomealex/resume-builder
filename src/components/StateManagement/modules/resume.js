export default {
  state: {
    preferences: {
      work_status: [0, 0, 0],
      area: '',
      salary_type: [0, 0],
      salary: 0,
      work_term: [0, 0, 0],
      hours: 0,
      validated: false
    },
    basic: {},
    education: {},
    skills: {},
    experience: {},
    additional: {}
  },
  mutations: {
    // мутации Предпочтения
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
    },
    VALIDATE_STEP: function (state, step) {
      for (let property in state[step]) {
        if (property.indexOf('validated') > 0) { continue }
        if (state[step][property].length && typeof (state[step][property]) !== 'string') {
          if (!state[step][property].filter(value => { return value }).length) {
            state[step].validated = false
            return
          } else {
            state[step].validated = true
          }
        } else {
          state[step].validated = (state[step][property].length === 1 ? !!parseInt(state[step][property]) : !!state[step][property])
          if (!state[step].validated) { return }
        }
      }
    }
  }
}
