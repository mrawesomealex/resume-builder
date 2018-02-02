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
    }
  },
  mutations: {
    CHANGE_STEP: function (state, status) {
      state.steps['step' + status.from].current = 0
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
    }
  }
}
