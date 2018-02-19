import Vue from 'vue'
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
    basic: {
      work_type: [0, 0, 0, 0],
      shifts: {
        day1: {day: 0, evening: 0, night: 0},
        day2: {day: 0, evening: 0, night: 0},
        day3: {day: 0, evening: 0, night: 0},
        day4: {day: 0, evening: 0, night: 0},
        day5: {day: 0, evening: 0, night: 0},
        day6: {day: 0, evening: 0, night: 0},
        day7: {day: 0, evening: 0, night: 0}
      },
      home_address: {
        country: '',
        state: '',
        city: '',
        street: '',
        index: ''
      },
      goal: '',
      sex: {
        man: 0,
        woman: 0,
        not_required: true
      },
      fio: '',
      portfolio_link: {
        value: '',
        not_required: true
      },
      email: '',
      phone1: { code: '', number: '' },
      phone2: {
        value: { code: '', number: '' },
        not_required: true
      },
      additional: {
        resource0: {role: 'instagram', source: ''},
        resource1: {role: 'facebook', source: ''},
        resource2: {role: 'telegram', source: ''},
        resource3: {role: 'skype', source: ''},
        resource4: {role: 'vk', source: ''},
        resource5: {role: '', source: ''}
      },
      photo: '',
      validated: false
    },
    education: {
      schools: {
        school0: {
          name: '',
          major: '',
          beginYear: '',
          endYear: {
            val: '',
            not_required: false
          },
          degreeType: '',
          correct: false,
          inProgress: false
        }
      },
      validated: false
    },
    skills: {
      proffesional: {
        skill0: {value: '', level: 0}
      },
      achievements: {
        achieve0: ''
      },
      validated: false
    },
    experience: {
      works: {
        work0: {
          title: '',
          begin: '',
          end: {
            val: '',
            not_required: false
          },
          company: '',
          address: '',
          workType: -1,
          duties: '',
          achievements: {
            val: '',
            not_required: true
          },
          correct: false,
          inProgress: false
        }
      },
      validated: false
    },
    additional: {
      aboutMe: {
        val: '',
        not_required: true
      },
      docs: {
        doc0: {
          name: '',
          file: '',
          not_required: true
        },
        
      },
      references: {
        reference0: {
          fullName: '',
          email: '',
          phone: { code: '', number: '' },
          canCall: false,
          not_required: true
        },
        
      },
      validated: false
    }
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
      let isValue
      for (let property in state[step]) {
        if (state[step][property].not_required || property === 'validated') {
          if (property === 'validated') {
            state[step][property] = true
            return
          }
          continue
        }
        isValue = 0
        if (typeof state[step][property] === 'object' && !Array.isArray(state[step][property])) {
          for (let value in state[step][property]) {
            if (state[step][property][value].not_required) {
              isValue = 1
              continue
            }
            if (typeof state[step][property][value] === 'object') {
              if (!state[step][property][value] && value.indexOf('resource') === -1) {
                state[step].validated = false
                return
              }
              if (state[step][property][value].source && value.indexOf('resource') >= 0) {
                isValue = 1
                break
              }
              if (value.indexOf('resource') === -1 && property.indexOf('school') === -1 && value.indexOf('skill') === -1 && value.indexOf('work') === -1 && property.indexOf('reference') === -1 && property.indexOf('doc') === -1) {
                for (let subValue1 in state[step][property][value]) {
                  if (state[step][property][value][subValue1] || state[step][property][value].source) {
                    isValue = 1
                    break
                  }
                }
              }
              if (property.indexOf('reference') >= 0) {
                if (state[step][property][value].fullName && (state[step][property][value].email || (state[step][property][value].phone.code && state[step][property][value].phone.number))) {
                  isValue = 1
                  continue
                } else {
                  isValue = 0
                }
              }
              if ( property.indexOf('doc') >= 0) {
                if (state[step][property][value].name && state[step][property][value].file) {
                  isValue = 1
                } else {
                  isValue = 0
                }
              }
              if (property.indexOf('school') !== -1 || value.indexOf('skill') !== -1 || value.indexOf('work') !== -1) {
                if (typeof state[step][property][value] === 'object') {
                  for (let subValue2 in state[step][property][value]) {
                    if (subValue2 === 'inProgress') { continue }
                    if (state[step][property][value][subValue2]) {
                      isValue = 1
                    } else {
                      isValue = 0
                      break
                    }
                  }
                }
              }
            }
            if (typeof state[step][property][value] === 'string') {
              isValue = state[step][property][value].length > 0
            }
          }
          if (!isValue) {
            state[step].validated = false
            return
          } else {
            if (property.indexOf('school') >= 0 || step.indexOf('skill') >= 0 || property.indexOf('work') >= 0) {
              state[step].validated = true
            }
            continue
          }
        }
        if (state[step][property].length && typeof state[step][property] !== 'string') {
          if (!state[step][property].filter(value => { return value }).length) {
            state[step].validated = false
            return
          } else {
            state[step].validated = true
          }
        } else {
          state[step].validated = !!state[step][property]
          if (!state[step].validated) { return }
        }
      }
    },

    // мутации Базовая информация

    CHANGE_WORK_TYPE: function (state, newType) {
      for (let i = 0; i < state.basic.work_type.length; i++) {
        state.basic.work_type[i] = 0
      }
      state.basic.work_type[newType] = 1
    },
    CHANGE_SHIFTS: function (state, dayData) {
      if (!dayData.flagAllShift && !dayData.flagAllDay) {
        state.basic.shifts['day' + dayData.newDay][dayData.newShift] = !state.basic.shifts['day' + dayData.newDay][dayData.newShift]
      } else {
        let undo = 1
        if (dayData.flagAllShift) {
          for (let day in state.basic.shifts) {
            undo = undo && state.basic.shifts[day][dayData.newShift]
          }
          for (let day in state.basic.shifts) {
            state.basic.shifts[day][dayData.newShift] = !undo
          }
        } else {
          for (let shift in state.basic.shifts['day' + dayData.newDay]) {
            undo = undo && state.basic.shifts[['day' + dayData.newDay]][shift]
          }
          for (let shift in state.basic.shifts['day' + dayData.newDay]) {
            state.basic.shifts['day' + dayData.newDay][shift] = !undo
          }
        }
      }
    },
    CHANGE_HOME_ADDRESS: function (state, value) {
      state.basic.home_address[value.field] = value.content
    },
    CHANGE_GOAL: function (state, value) {
      state.basic.goal = value
    },
    CHANGE_SEX: function (state, sexVal) {
      for (let value in state.basic.sex) {
        if (value.indexOf('not_required') >= 0) { continue }
        state.basic.sex[value] = 0
      }
      state.basic.sex[sexVal] = 1
    },
    CHANGE_FIO: function (state, value) {
      state.basic.fio = value
    },
    CHANGE_PORTFOLIO_LINK: function (state, value) {
      state.basic.portfolio_link.value = value
    },
    CHANGE_EMAIL: function (state, value) {
      state.basic.email = value
    },
    CHANGE_PRIMARY_PHONE: function (state, value) {
      state.basic.phone1.code = value.code
      state.basic.phone1.number = value.number
    },
    CHANGE_SECOND_PHONE: function (state, newValue) {
      state.basic.phone2.value.code = newValue.code
      state.basic.phone2.value.number = newValue.number
    },
    CHANGE_ADDITIONAL_RESOURCES: function (state, value) {
      let quantity = 0
      // eslint-disable-next-line
      for (let key in state.basic.additional) {
        quantity++
      }
      if (value.createNew) {
        state.basic.additional['resource' + (quantity - 1)] = {role: 'custom', source: ''}
        if (quantity < 14) {
          state.basic.additional['resource' + quantity] = {role: '', source: ''}
        }
      } else {
        Vue.set(state.basic.additional['resource' + value.index], 'source', value.newSource)
        Vue.set(state.basic.additional['resource' + value.index], 'role', value.newRole)
      }
    },
    CHANGE_PHOTO: function (state, photoData) {
      state.basic.photo = photoData
    },

    // мутации Образование

    CHANGE_SCHOOL_DATA: function (state, schoolData) {
      if (schoolData.property === 'inProgress') {
        state.education.schools['school' + schoolData.number].endYear.not_required = schoolData.value
        state.education.schools['school' + schoolData.number].endYear.val = ''
      }
      if (schoolData.property !== 'endYear') {
        state.education.schools['school' + schoolData.number][schoolData.property] = schoolData.value
      } else {
        state.education.schools['school' + schoolData.number].endYear.val = schoolData.value
      }
    },
    ADD_NEW_SCHOOL: function (state) {
      let length = Object.keys(state.education.schools).length
      let content = {
        name: '',
        major: '',
        beginYear: '',
        endYear: {
          val: '',
          not_required: false
        },
        degreeType: '',
        correct: false,
        inProgress: false
      }
      Vue.set(state.education.schools, 'school' + length, content)
    },
    REMOVE_SCHOOL: function (state, school) {
      Vue.delete(state.education.schools, school)
    },

    // мутации Скиллы

    CHANGE_SKILL_DATA: function (state, skillData) {
      if (skillData.type === 'proffesional') {
        state.skills[skillData.type]['skill' + skillData.num].value = skillData.value
        state.skills[skillData.type]['skill' + skillData.num].level = skillData.level
      } else {
        state.skills[skillData.type]['achieve' + skillData.num] = skillData.value
      }
    },
    ADD_NEW_PROFF_SKILL: function (state) {
      let length = Object.keys(state.skills.proffesional).length
      let content = {
        value: '',
        level: 0
      }
      Vue.set(state.skills.proffesional, 'skill' + length, content)
    },
    ADD_NEW_ACHIEVE: function (state) {
      let length = Object.keys(state.skills.achievements).length
      let content = ''
      Vue.set(state.skills.achievements, 'achieve' + length, content)
    },
    REMOVE_SKILL: function (state, skill) {
      Vue.delete(state.skills[skill.type], skill.skillVal)
    },

    // Мутации Опыт работы

    CHANGE_WORKPLACE_DATA: function (state, workData) {
      if (workData.property === 'inProgress') {
        state.experience.works['work' + workData.number].end.not_required = workData.value
        state.experience.works['work' + workData.number].end.val = ''
      }
      if (workData.property !== 'end' && workData.property !== 'achievements') {
        state.experience.works['work' + workData.number][workData.property] = workData.value
      } else {
        state.experience.works['work' + workData.number][workData.property].val = workData.value
      }
    },
    ADD_NEW_WORKPLACE: function (state) {
      let length = Object.keys(state.experience.works).length
      let content = {
        title: '',
        begin: '',
        end: {
          val: '',
          not_required: false
        },
        company: '',
        address: '',
        workType: -1,
        duties: '',
        achievements: {
          val: '',
          not_required: true
        },
        correct: false,
        inProgress: false
      }
      Vue.set(state.experience.works, 'work' + length, content)
    },
    REMOVE_WORK: function (state, work) {
      Vue.delete(state.experience.works, work)
    },

    // Мутации Прочее

    CHANGE_ABOUTME: function (state, value) {
      state.additional.aboutMe.val = value
    },
    CHANGE_CERTIFICATE_NAME: function (state, value) {
      state.additional.docs['doc' + value.num].name = value.val
      state.additional.docs['doc' + value.num].not_required = false
    },
    CHANGE_CERTIFICATES: function (state, value) {
      state.additional.docs['doc' + value.num].file = value.val
    },
    ADD_NEW_CERTIFICATE: function (state) {
      let length = Object.keys(state.additional.docs).length
      let content = {
        name: '',
        file: '',
        not_required: true
      }
      Vue.set(state.additional.docs, 'doc' + length, content)
    },
    CHANGE_REFERENCE_INFO: function (state, value) {
      state.additional.references['reference' + value.index][value.property] = value.val
      state.additional.references['reference' + value.index].not_required = !state.additional.references['reference' + value.index].fullName.length && !state.additional.references['reference' + value.index].email && !(state.additional.references['reference' + value.index].phone.code && state.additional.references['reference' + value.index].phone.number) && !state.additional.references['reference' + value.index].canCall
    },
    ADD_NEW_REFERENCE: function (state) {
      let length = Object.keys(state.additional.references).length
      let content = {
        fullName: '',
        email: '',
        phone: { code: '', number: '' },
        canCall: false,
        not_required: true
      }
      Vue.set(state.additional.references, 'reference' + length, content)
    },
    REMOVE_REF: function (state, reference) {
      Vue.delete(state.additional.references, reference)
    },
    REMOVE_RESOURCE: function (state, doc) {
      Vue.delete(state.additional.docs, doc)
    }
  },
  actions: {
    removeSchool ({commit, state}, school) {
      return new Promise((resolve, reject) => {
        if (Object.keys(state.education.schools).length > 1) {
          commit('REMOVE_SCHOOL', school)
          resolve()
        } else {
          // eslint-disable-next-line
          throw 'DeletionError'
        }
      })
    },
    removeSkill ({commit, state}, skill) {
      if (skill.indexOf('skill') > -1) {
        return new Promise((resolve, reject) => {
          if (Object.keys(state.skills.proffesional).length > 1) {
            commit('REMOVE_SKILL', {
              type: 'proffesional',
              skillVal: skill
            })
            resolve()
          } else {
            // eslint-disable-next-line
            throw 'DeletionError'
          }
        })
      } else {
        return new Promise((resolve, reject) => {
          if (Object.keys(state.skills.achievements).length > 1) {
            commit('REMOVE_SKILL', {
              type: 'achievements',
              skillVal: skill
            })
            resolve()
          } else {
            // eslint-disable-next-line
            throw 'DeletionError'
          }
        })
      }
    },
    removeWork ({commit, state}, work) {
      return new Promise((resolve, reject) => {
        if (Object.keys(state.experience.works).length > 1) {
          commit('REMOVE_WORK', work)
          resolve()
        } else {
          // eslint-disable-next-line
          throw 'DeletionError'
        }
      })
    },
    removeRef ({commit, state}, ref) {
      return new Promise((resolve, reject) => {
        if (Object.keys(state.additional.references).length > 1) {
          commit('REMOVE_REF', ref)
          resolve()
        } else {
          // eslint-disable-next-line
          throw 'DeletionError'
        }
      })
    },
    removeResource ({commit, state}, doc) {
      return new Promise((resolve, reject) => {
        if (Object.keys(state.additional.docs).length > 1) {
          commit('REMOVE_RESOURCE', doc)
          resolve()
        } else {
          // eslint-disable-next-line
          throw 'DeletionError'
        }
      })
    }
  }
}
