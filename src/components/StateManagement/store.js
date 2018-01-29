import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/userData'
import head from './modules/header'
import builder from './modules/builder'
import resume from './modules/resume'
import areas from './modules/areas'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    user,
    head,
    builder,
    resume,
    areas
  },
  strict: true
})
