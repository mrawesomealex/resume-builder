import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/userData'
import head from './modules/header'
import builder from './modules/builder'
import resume from './modules/resume'
import areas from './modules/areas'
import createMutationsSharer from 'vuex-shared-mutations'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    user,
    head,
    builder,
    resume,
    areas
  },
  strict: true,
  plugins: [createMutationsSharer({ predicate: [
    'CHANGE_WORK_STATUS',
    'CHANGE_AREA',
    'CHANGE_SALARY_TYPE',
    'CHANGE_SALARY',
    'CHANGE_WORK_TERM',
    'CHANGE_HOURS',
    'CHANGE_WORK_TYPE',
    'CHANGE_SHIFTS',
    'CHANGE_HOME_ADDRESS',
    'CHANGE_GOAL',
    'CHANGE_SEX',
    'CHANGE_FIO',
    'CHANGE_PORTFOLIO_LINK',
    'CHANGE_EMAIL',
    'CHANGE_PRIMARY_PHONE',
    'CHANGE_SECOND_PHONE',
    'CHANGE_ADDITIONAL_RESOURCES',
    'CHANGE_PHOTO',
    'CHANGE_SCHOOL_DATA',
    'ADD_NEW_SCHOOL',
    'REMOVE_SCHOOL',
    'CHANGE_SKILL_DATA',
    'ADD_NEW_PROFF_SKILL',
    'ADD_NEW_ACHIEVE',
    'REMOVE_SKILL',
    'CHANGE_WORKPLACE_DATA',
    'ADD_NEW_WORKPLACE',
    'REMOVE_WORK']
  })]
})
