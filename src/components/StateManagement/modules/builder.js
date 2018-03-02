export default{
  state: {
    lastStep: 0,
    currentStep: 0,
    steps: {
      step0: { current: 1, done: 0, error: 0 },
      step1: { current: 0, done: 0, error: 0 },
      step2: { current: 0, done: 0, error: 0 },
      step3: { current: 0, done: 0, error: 0 },
      step4: { current: 0, done: 0, error: 0 },
      step5: { current: 0, done: 0, error: 0 }
    },
    print_templates: {
      templ0: {
        name: 'lightTheme',
        font: '800 48pt "Roboto", serif',
        colors: {
          mainColor: '#babecb',
          subColor1: '#edf0f2',
          subColor2: '#1d90ed'
        },
        noColor: false
      },
      templ1: {
        name: 'darkTheme',
        font: '100 48pt "Roboto", serif',
        colors: {
          mainColor: '№323848',
          subColor1: '#edf0f2',
          subColor2: '#1d90ed'
        },
        noColor: false
      },
      templ2: {
        name: 'noColor',
        font: '800 48pt "Roboto", serif',
        noColor: true
      }
    }
  },
  mutations: {
    CHANGE_STEP: function (state, status) {
      for (let key in state.steps) {
        state.steps[key].current = 0
      }
      state.steps['step' + status.next].current = 1
      state.currentStep = status.next
      state.lastStep = status.from
    },
    CHANGE_DONE: function (state, status) {
      state.steps['step' + status].done = 1
      state.steps['step' + status].error = 0
    },
    CHANGE_ERROR: function (state, status) {
      state.steps['step' + status].error = 1
      state.steps['step' + status].done = 0
    },
    // тестовые денные, удалить при сборке
    INPUT_TEST: function (state) {
      for (let key in state.steps) {
        state.steps[key].done = 1
      }
    }
  }
}
