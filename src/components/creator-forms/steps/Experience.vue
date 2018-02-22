<template>
    <div class="container step">
      <div class="mt-0">
        <h5>Добавьте места работы</h5>
        <h6>Для добавления места работы нажмите соответсвующую клавишу. Даты необходимо вводить в соответсвующем формате (ДД . MM . ГГГГ)</h6>
      </div>
      <div  v-for="(work, key, index) in workPlaces" :key="key" :id="'work'+index" :class="['container-fluid list-item work p-0 mb-2',{'mt-0' : index > 0},{open:statuses['status'+index]}]">
          <header class="row p-4" :class="[{errorColor: status.step4.error && (!work.title || !work.begin || !work.company || !work.address || !work.correct || (!work.end.val && !work.inProgress) || !work.duties || (work.workType === -1))}]">
              <simple-svg class="d-xl-inline-block d-lg-inline-block d-md-inline-block d-sm-inline-block d-none mx-3" :stroke="'none'" :fill="status.step4.error && (!work.title || !work.begin || !work.company || !work.address || !work.correct || (!work.end.val && !work.inProgress) || !work.duties || (work.workType === -1)) ?'#ef4136' : '#4b92e2'" :filepath="require('@/assets/step_icons/workplace.svg')"  :width="'25px'" :height="'25px'"/>
              <label for="work_title" class="ml-xl-0 ml-lg-0 ml-md-0 ml-sm-0 ml-3" @click="changeCurrent(index)">
                  <span v-if="work.title">{{ work.title }}</span><span v-if="work.company">{{' ('+work.company+')'}}</span>
                  <span v-if="!work.title">{{'Новое рабочее место'}}</span>
                  <simple-svg :class="['d-xl-inline-block d-lg-inline-block d-md-inline-block d-sm-inline-block d-none', {'rotated ml-3 mb-2': statuses['status'+index]},{'ml-2 mr-3': !statuses['status'+index]}]" :stroke="'none'" :fill="status.step4.error && (!work.title || !work.begin || !work.company || !work.address || !work.correct || (!work.end.val && !work.inProgress) || !work.duties || (work.workType === -1)) ?'#ef4136' : '#4b92e2'" :filepath="require('@/assets/images/arrow.svg')"  :width="'12px'" :height="'12px'"/>
              </label>
              <div :class="['ml-auto mr-3 my-auto']" @click="$emit('remove',{step:'experience',property:'work'+index})">
                  <simple-svg :stroke="'none'" :fill="status.step4.error && (!work.title || !work.begin || !work.company || !work.address || !work.correct || (!work.end.val && !work.inProgress) || !work.duties || (work.workType === -1)) ?'#ef4136' : '#4b92e2'" :filepath="require('@/assets/step_icons/cancel.svg')"  :width="'25px'" :height="'25px'"/>
              </div>
          </header>
          <transition name="open-window">
            <div v-if="statuses['status'+index]" class="newJob_form p-4 container-fluid">
                <div class="row mb-5 align-middle">
                    <div class="order-xl-1 order-lg-1 order-md-1 order-sm-2 order-2 col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                    <h6 :class="['mb-2',{blue_text: work.correct}]">Проверка на корректно заполненные данные</h6>
                    <h6>{{sentence}}</h6>
                    </div>
                    <div class="d-flex order-xl-2 order-lg-2 order-md-2 order-sm-1 order-1 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 pb-xl-0 pb-lg-0 pb-md-4 pb-sm-4 pb-4 text-xl-right text-lg-right text-md-right text-sm-left text-left col-md-right align-middle">
                        <input id="correct" type="checkbox" value="0" :checked="work.correct" @change="changeWorkplace($event,'correct',index)"/>
                        <label class="ml-xl-auto ml-lg-auto ml-md-auto" for="correct" >
                            <div :class="['checkbox block_neutral mr-3',{error: status.step4.error && !work.correct}]"></div>
                            <span>Правильно</span>
                        </label>
                    </div>
                </div>
                <div class="container-fluid">
                    <div  class="container-fluid px-0 mb-xl-4 mb-lg-4 mb-md-4 mb-sm-0 mb-0">
                        <div class="row px-0">
                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 text-right mb-xl-0 mb-lg-0 mb-md-0 mb-sm-4 mb-4 px-0">    
                                <input id="work_title" :class="['block_neutral col-12 pl-4 py-3',{error : status.step4.error && !work.title}]"  type="text" placeholder="Должность, которую вы занимали" 
                                :value="work.title" @input="changeWorkplace($event,'title',index)">
                            </div>
                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-6 pr-0 pl-xl-4 pl-lg-4 pl-md-4 pl-sm-0 pl-0 mb-xl-0 mb-lg-0 mb-md-0 mb-sm-4 mb-4 ml-auto">
                                <input id="begin_year" :class="['block_neutral col-12 pl-4 py-3',{error : status.step4.error && !work.begin || dateError.beginErr}]" type="text" placeholder="Дата начала"
                                :value="dateBuff1 ? dateBuff1 : work.begin ? (work.begin.getDate() < 10 ? '0' + work.begin.getDate() : work.begin.getDate()) + '.' + (work.begin.getMonth()+1 < 10 ? '0' + (work.begin.getMonth()+1) : work.begin.getMonth()+1) + '.' + work.begin.getFullYear() : ''" @input="changeWorkplace($event,'begin',index)">
                            </div>
                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-6 text-right mr-0 pr-0 mb-xl-0 mb-lg-0 mb-md-0 mb-sm-4 mb-4">    
                                <input id="end_year" :class="['block_neutral col-12 pl-4 py-3',{error : status.step4.error && !work.end.val && !work.inProgress || dateError.endErr}]"  type="text" :placeholder="work.end.not_required ? '----' : 'Дата окончания'" :disabled="work.end.not_required"
                                :value="dateBuff2 ? dateBuff2 : work.end.val ? (work.end.val.getDate() < 10 ? '0' + work.end.val.getDate() : work.end.val.getDate()) + '.' + (work.end.val.getMonth()+1 < 10 ? '0' + (work.end.val.getMonth()+1) : work.end.val.getMonth()+1) + '.' + work.end.val.getFullYear() : ''" @input="changeWorkplace($event,'end',index)">
                            </div>
                        </div>
                    </div>
                    <div class="row align-middle mb-4">
                        <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 pl-0 pr-0">
                            <input id="school_name" type="text" placeholder="Название компании (работодателя)" :class="['block_neutral col-12 pl-4 py-3 mb-xl-0 mb-lg-0 mb-md-4 mb-sm-4 mb-4',{error : status.step4.error && !work.company}]" 
                            :value="work.company" @input="changeWorkplace($event,'company',index)"/>
                        </div>    
                        <div class="d-flex col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 text-right mr-0 pr-0 pl-xl-3 pl-lg-3 pl-md-0 pl-sm-0 pl-0 " >
                            <input id="in_progress" type="checkbox" value="0" :checked="work.inProgress" @change="changeWorkplace($event,'inProgress',index)"/>
                            <label class="d-block ml-xl-auto ml-lg-auto ml-md-0 mb-0" for="in_progress">
                                <div class="checkbox block_neutral mr-3"></div>
                                <span>Текущее рабочее место</span>
                            </label>                        
                        </div>
                    </div>
                    <div class="row">
                        <input id="major" type="text" placeholder="Введите адрес офиса компании (главный офис)" :class="['block_neutral pl-4 py-3 col-12 mr-3 mb-4',{error : status.step4.error && !work.address}]" 
                        :value="work.address" @input="changeWorkplace($event,'address',index)"/>
                    </div>
                    <div class="container-fluid px-0 mb-4">
                      <div id="work_type" class="row align-middle px-0">
                        <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 px-0  pb-xl-0 pb-lg-0 pb-md-4 pb-sm-4 pb-4">
                            <input name="work_type" id="full-time" type="radio" value="0" :checked="parseInt(work.workType) === 0" @change="changeWorkplace($event,{field: 'workType',value: 0},index)" />
                            <label for="full-time">
                                <div :class="['checkbox block_neutral mr-3',{error: status.step4.error && work.workType === -1}]"></div>
                                <span>Полная занятость</span>
                            </label>
                        </div>
                        <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 px-0  pb-xl-0 pb-lg-0 pb-md-4 pb-sm-4 pb-4 text-xl-right text-lg-right text-md-left text-sm-left text-left">
                            <input name="work_type" id="part-time" type="radio" value="1" :checked="work.workType === 1" @change="changeWorkplace($event,{field: 'workType',value: 1},index)"/>
                            <label for="part-time">
                                <div :class="['checkbox block_neutral mr-3',{error: status.step4.error && work.workType === -1}]"></div>
                                <span>Частичная занятость</span>
                            </label>
                        </div>
                        <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 px-0  pb-xl-0 pb-lg-0 pb-md-4 pb-sm-4 pb-4 text-xl-center text-lg-center text-md-left text-sm-left text-left">
                            <input name="work_type" id="intern" type="radio" value="2" :checked="work.workType === 2" @change="changeWorkplace($event,{field: 'workType',value: 2},index)"/>
                            <label for="intern">
                                <div :class="['checkbox block_neutral mr-3',{error: status.step4.error && work.workType === -1}]"></div>
                                <span>Стажировка</span>
                            </label>
                        </div>
                        <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12  px-0 o text-xl-right text-lg-right text-md-left text-sm-left text-left">
                            <input name="work_type" id="remote" value="3" type="radio" :checked="work.workType === 3" @change="changeWorkplace($event,{field: 'workType',value: 3},index)"/>
                            <label for="remote">
                                <div :class="['checkbox block_neutral mr-3',{error: status.step4.error && work.workType === -1}]"></div>
                                <span>Удаленная работа</span>
                            </label>
                        </div>
                      </div>
                    </div>
                    <div class="row pragraph-block">
                        <textarea id="major" placeholder="Перечислите ваши обязанности на данной работе..." maxlength="900" :class="['block_neutral pl-4 py-3 col-12 mr-3 mb-4',{error : status.step4.error && !work.duties}]" 
                        :value="work.duties" @input="changeWorkplace($event,'duties',index)"></textarea>
                        <div class="max-length text-center py-1">{{charactersLeft1}} / 900</div>
                    </div>
                    <div class="row pragraph-block">
                        <textarea id="major" placeholder="Перечислите ваши награды, достижения на данной работе..." maxlength="900" :class="['block_neutral pl-4 py-3 col-12 mr-3']" 
                        :value="work.achievements.val" @input="changeWorkplace($event,'achievements',index)"></textarea>
                        <div class="max-length text-center py-1">{{charactersLeft2}} / 900</div>
                    </div>
                </div>
            </div>              
          </transition>
      </div>
      <div id="newSchoolBtn" :class="['new_btn container-fluid button text-center py-4 mb-2',{error: errorMessage}]" @click="addNew()"><span>+ Добавить</span></div>
      <h6 v-if="this.errorMessage" class="mb-4 error_message">{{errorMessage}}</h6>
    </div>
</template>

<script>
    export default {
      props: ['status'],
      data: function () {
        return {
          correct: false,
          current: 0,
          dateBuff1: '',
          dateBuff2: '',
          errorMessage: '',
          workQuantity: 0,
          dateError: {
            beginErr: false,
            endErr: false
          }
        }
      },
      created () {
        this.CreateMenu()
      },
      methods: {
        CreateMenu () {
          let p = {}
          let q = 0
          let prop = ''
          for (let work in this.workPlaces) {
            prop = q + 1 + ' ' + (this.workPlaces[work].company ? this.workPlaces[work].company : 'Новое место работы')
            p[prop] = {}
            p[prop]['status'] = !(!work.title || !work.begin || !work.company || !work.address || !work.correct || (!work.end.val && !work.inProgress) || !work.duties || (work.workType === -1))
            p[prop]['link'] = q > 0 ? '#work' + (q - 1) : '#navigation'
            q++
          }
          this.$emit('formSideMenu', p)
        },
        countPeriod (Date1, Date2) {
          let period
          if (Date1.getFullYear() === Date2.getFullYear()) {
            period = Date2.getMonth() - Date1.getMonth()
            return period < 5 ? period + ' месяца ' : period + ' месяцев '
          }
          if (Date1.getFullYear() < Date2.getFullYear()) {
            period = Date2.getFullYear() - Date1.getFullYear()
            return period === 1 ? period + ' год' : period < 5 && period !== 0 ? period + ' года' : period + ' лет'
          }
          this.dateError.endErr = true
          return ''
        },
        changeCurrent (i) {
          this.current = this.current === i ? -1 : i
        },
        changeWorkplace (e, field, i) {
          let val
          let source = field.field ? field.field : field
          if (field === 'inProgress' || field === 'correct') {
            val = field === 'inProgress' ? !this.workPlaces['work' + i].inProgress : !this.workPlaces['work' + i].correct
          } else {
            val = field.value ? field.value : e.target.value
            if (field === 'begin' || field === 'end') {
              if (e.target.value.length < 10 && !/(([0-2]\d){1}|(3[0-1]){1})\.((0\d){1}|(1[0-2]){1})\.\d{4}/.test(e.target.value)) {
                field === 'begin' ? this.dateBuff1 = e.target.value : this.dateBuff2 = e.target.value
              }
              if (!/(([0-2]\d){1}|(3[0-1]){1})\.((0\d){1}|(1[0-2]){1})\.\d{4}/.test(e.target.value)) {
                field === 'begin' ? this.dateError.beginErr = true : this.dateError.endErr = true
                return
              } else {
                this.dateError.beginErr = false
                this.dateError.endErr = false
                val = new Date(parseInt(val.substr(6, 4)), parseInt(val.substr(3, 2)) - 1, parseInt(val.substr(0, 2)), 0, 0, 0)
              }
            }
          }
          this.dateBuff1 = ''
          this.dateBuff2 = ''
          this.errorMessage = ''
          this.$store.commit('CHANGE_WORKPLACE_DATA', {
            property: source,
            number: i,
            value: val
          })
          this.CreateMenu()
        },
        addNew () {
          for (let key in this.workPlaces) {
            if (!this.workPlaces[key].title) {
              this.errorMessage = 'У вас уже существует пустой блок'
              return
            }
          }
          this.workPlaces = 1
          this.CreateMenu()
        }
      },
      computed: {
        workPlaces: {
          get: function () {
            this.workQuantity = Object.keys(this.$store.state.resume.experience.works).length
            return this.$store.state.resume.experience.works
          },
          set: function (newFlag) {
            if (newFlag) { this.$store.commit('ADD_NEW_WORKPLACE') }
          }
        },
        statuses: function () {
          let list = {}
          for (let k = 0; k < this.workQuantity; k++) {
            if (k === this.current) {
              list['status' + k] = true
            } else {
              list['status' + k] = false
            }
          }
          return list
        },
        sentence: function () {
          let sentence = ''
          sentence += 'Вы работали в '
          sentence += this.workPlaces['work' + this.current].company ? this.workPlaces['work' + this.current].company : '--введите место работы--'
          sentence += ' '
          if (this.workPlaces['work' + this.current].begin && this.workPlaces['work' + this.current].end.val) {
            sentence += this.countPeriod(this.workPlaces['work' + this.current].begin, this.workPlaces['work' + this.current].end.val)
          } else {
            sentence += this.workPlaces['work' + this.current].begin && this.workPlaces['work' + this.current].inProgress ? this.countPeriod(this.workPlaces['work' + this.current].begin, new Date()) : '--введите Дату начала и Дату окончания работы на данной позиции--'
          }
          sentence += ' на должности '
          sentence += this.workPlaces['work' + this.current].title ? this.workPlaces['work' + this.current].title : '--укажите должность--'
          sentence += ' ( '
          switch (parseInt(this.workPlaces['work' + this.current].workType)) {
            case 0 : sentence += 'Полная занятость'
              break
            case 1 : sentence += 'Частичная занятость'
              break
            case 2 : sentence += 'Стажировка'
              break
            case 3 : sentence += 'Удаленная работа'
              break
            default: sentence += 'Тип занятости не указан'
          }
          sentence += ' )'
          return sentence
        },
        charactersLeft1 () {
          return 900 - (this.current >= 0 ? this.workPlaces['work' + this.current].duties.length : 0)
        },
        charactersLeft2 () {
          return 900 - (this.current >= 0 ? this.workPlaces['work' + this.current].achievements.val.length : 0)
        }
      }
    }
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/global";
input[type="radio"]:checked ~ label > div,
input[type="checkbox"]:checked ~ label > div{
    background: $btn_blue_text url("../../../assets/step_icons/checked.svg") no-repeat ;
    background-size: contain;
    border: 1px solid $btn_blue_text;
}
.simple-svg-wrapper{
    transition: 0.3s;
}
</style>