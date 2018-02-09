<template>
    <div class="container step">
      <div class="mt-0">
        <h5>Заполните информацию о вашем образовании</h5>
        <h6>Для добавления места учебы нажимайте соответсвующую клавишу</h6>
      </div>
       <div  v-for="(school, key, index) in schools" :key="key" :class="['container-fluid list-item p-0 school mb-2',{'mt-0' : index > 0},{open:statuses['status'+index]}]">
          <header class="row p-4" :class="[{errorColor: status.step2.error && (!school.name || !school.major || !school.beginYear || !school.degreeType || !school.correct || (!school.endYear.val && !school.inProgress))}]">
              <simple-svg class="d-xl-inline-block d-lg-inline-block d-md-inline-block d-sm-inline-block d-none mx-3" :stroke="'none'" :fill="status.step2.error && (!school.name || !school.major || !school.beginYear || !school.degreeType || !school.correct || (!school.endYear.val && !school.inProgress)) ?'#ef4136' : '#4b92e2'" :filepath="require('@/assets/step_icons/university.svg')"  :width="'25px'" :height="'25px'"/>
              <label for="school_name" class="ml-xl-0 ml-lg-0 ml-md-0 ml-sm-0 ml-3" @click="changeCurrent(index)">
                  <span v-if="school.name">{{ school.name }}</span><span v-if="school.degreeType">{{'('+school.degreeType+')'}}</span>
                  <span v-if="!school.name">{{'Новое учебное заведение'}}</span>
                  <simple-svg :class="['d-xl-inline-block d-lg-inline-block d-md-inline-block d-sm-inline-block d-none', {'rotated ml-3 mb-2': statuses['status'+index]},{'ml-2 mr-3': !statuses['status'+index]}]" :stroke="'none'" :fill="status.step2.error && (!school.name || !school.major || !school.beginYear || !school.degreeType || !school.correct || (!school.endYear.val && !school.inProgress)) ?'#ef4136' : '#4b92e2'" :filepath="require('@/assets/images/arrow.svg')"  :width="'12px'" :height="'12px'"/>
              </label>
              <div :class="['ml-auto mr-3 my-auto']" @click="$emit('remove',{step:'education',property:'school'+index})">
                  <simple-svg :stroke="'none'" :fill="status.step2.error && (!school.name || !school.major || !school.beginYear || !school.degreeType || !school.correct || (!school.endYear.val && !school.inProgress)) ?'#ef4136' : '#4b92e2'" :filepath="require('@/assets/step_icons/cancel.svg')"  :width="'25px'" :height="'25px'"/>
              </div>
          </header>
          <transition name="open-window">
            <div v-if="statuses['status'+index]" class="newSchool_form p-4 container-fluid">
                <div class="row mb-5 align-middle">
                    <div class="order-xl-1 order-lg-1 order-md-1 order-sm-2 order-2 col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                    <h6 :class="['mb-2',{blue_text: correct}]">Проверка на корректно заполненные данные</h6>
                    <h6>{{sentence}}</h6>
                    </div>
                    <div class="d-flex order-xl-2 order-lg-2 order-md-2 order-sm-1 order-1 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 pb-xl-0 pb-lg-0 pb-md-4 pb-sm-4 pb-4 text-xl-right text-lg-right text-md-right text-sm-left text-left col-md-right align-middle">
                        <input id="correct" type="checkbox" value="0" :checked="school.correct" @change="changeSchool($event,'correct',index)"/>
                        <label class="ml-xl-auto ml-lg-auto ml-md-auto" for="correct" >
                            <div :class="['checkbox block_neutral mr-3',{error: status.step2.error && !school.correct}]"></div>
                            <span>Правильно</span>
                        </label>
                    </div>
                </div>
                <div class="container-fluid">
                    <div class="row align-middle mb-4">
                        <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 pl-0 pr-xl-3 pr-lg-3 pr-md-3 pr-sm-0 pr-0">
                            <input id="school_name" type="text" placeholder="Название учебного заведения" :class="['block_neutral col-12 pl-4 py-3 mb-xl-0 mb-lg-0 mb-md-4 mb-sm-4 mb-4',{error : status.step2.error && !school.name}]" 
                            :value="school.name" @input="changeSchool($event,'name',index)"/>
                        </div>    
                        <div class="d-flex col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 text-right mr-0 pr-0 pl-xl-3 pl-lg-3 pl-md-0 pl-sm-0 pl-0 " >
                            <input id="in_progress" type="checkbox" value="0" :checked="school.inProgress" @change="changeSchool($event,'inProgress',index)"/>
                            <label class="d-block ml-xl-auto ml-lg-auto ml-md-0 mb-0" for="in_progress">
                                <div class="checkbox block_neutral mr-3"></div>
                                <span>В процессе получения степени</span>
                            </label>                        
                        </div>
                    </div>
                    <div class="row">
                        <input id="major" type="text" maxlength="135" placeholder="Введите специальность..." :class="['block_neutral pl-4 py-3 col-12 mr-3 mb-4',{error : status.step2.error && !school.major}]" 
                        :value="school.major" @input="changeSchool($event,'major',index)"/>
                    </div>
                    <div  class="container-fluid px-0">
                        <div class="row px-0">
                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-6 pl-0 pr-xl-3 pr-lg-3 pr-md-3 pr-sm-2 pr-2 mb-xl-0 mb-lg-0 mb-md-0 mb-sm-4 mb-4">
                                <input id="begin_year" :class="['block_neutral col-12 pl-4 py-3',{error : status.step2.error && !school.beginYear}]" type="number" placeholder="Год начала"
                                :value="school.beginYear" @input="changeSchool($event,'beginYear',index)">
                            </div>
                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-6 text-right mr-0 pl-xl-0 pl-lg-0 pl-md-0 pl-sm-2 pl=2 pr-xl-3 pr-lg-3 pr-md-3 pr-sm-0 pr-0 mb-xl-0 mb-lg-0 mb-md-0 mb-sm-4 mb-4">    
                                <input id="end_year" :class="['block_neutral col-12 pl-4 py-3',{error : status.step2.error && !school.endYear.val && !school.inProgress}]"  type="number" :placeholder="school.endYear.not_required ? '----' : 'Год окончания'" :disabled="school.endYear.not_required"
                                :value="school.endYear.val" @input="changeSchool($event,'endYear',index)">
                            </div>
                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 text-right mr-0 px-0">    
                                <input id="degree" :class="['block_neutral col-12 pl-4 py-3',{error : status.step2.error && !school.degreeType}]"  type="text" placeholder="Степень" 
                                :value="school.degreeType" @input="changeSchool($event,'degreeType',index)">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </transition>
      </div>
      <div id="newSchoolBtn" :class="['container-fluid button text-center py-4 mb-2',{error: errorMessage}]" @click="addNew()"><span>+ Добавить</span></div>
      <h6 v-if="this.errorMessage" class="mb-4 error_message">{{errorMessage}}</h6>
    </div>
</template>
<script>
    import Vue from 'vue'
    export default {
      props: ['status'],
      data: function () {
        return {
          correct: false,
          current: 0,
          errorMessage: '',
          schoolsQuantity: 0
        }
      },
      methods: {
        remove () {
          
        },
        changeCurrent(i){
          this.current = this.current === i ? -1 : i
        },
        changeSchool (e, field, i) {
          let val
          if (field === 'inProgress' || field === 'correct') {
            val = field === 'inProgress' ? !this.schools['school'+i].inProgress : !this.schools['school'+i].correct
          } else{
            val = e.target.value
          }
          this.errorMessage = ''
          this.$store.commit('CHANGE_SCHOOL_DATA', {
            property: field,
            number: i,
            value: val
          })
        },
        addNew () {
          for (let key in this.schools) {
            if (!this.schools[key].name) {
              this.errorMessage = 'У вас уже существует пустой блок'
              return
            }
          }    
          this.schools = 1
        }
      },
      computed: {
        schools: {
          get: function () {
            this.schoolsQuantity = Object.keys(this.$store.state.resume.education.schools).length
            return this.$store.state.resume.education.schools
          },
          set: function (newFlag) {
            newFlag ? this.$store.commit('ADD_NEW_SCHOOL') : ''
          }
        },
        statuses: function () {
          let list = {}
          for (let k = 0; k < this.schoolsQuantity; k++) {
            if ( k === this.current ){
              list['status' + k] = true
            }else{
              list['status' + k] = false
            }
          }
          return list
        },
        sentence: function () {
          let period = 0
          if (this.schools['school'+ this.current].inProgress) {
           period = this.schools['school'+ this.current].beginYear ? new Date().getFullYear() : 0
          } else {
           period = this.schools['school'+ this.current].endYear.val  ? this.schools['school'+ this.current].endYear.val : this.schools['school'+ this.current].beginYear
          }
          period -= this.schools['school'+ this.current].beginYear
          let sentence = ''
          sentence += this.schools['school'+ this.current].inProgress ? 'Вы учитесь по специальности ' : 'Вы проходили обучение по специальности '
          sentence += this.schools['school'+ this.current].major ? this.schools['school'+ this.current].major : ' --укажите специальность-- '
          sentence += this.schools['school'+ this.current].degreeType ? ' (' + this.schools['school'+ this.current].degreeType + ') ' : ' --укажите степень-- ' 
          sentence += ' в '
          sentence += this.schools['school'+ this.current].name ? this.schools['school'+ this.current].name + ' ' : ' --укажите название учебного заведения -- '
          sentence += period < 5 ? period === 1 ? period + ' год' : period > 1 ? period + ' года' : period + ' лет ' : period + ' лет'
          sentence += !this.schools['school'+ this.current].inProgress ? ' (c ' + (this.schools['school'+ this.current].beginYear ? this.schools['school'+ this.current].beginYear : '--год начала--') + ' по ' + (this.schools['school'+ this.current].endYear.val ? this.schools['school'+ this.current].endYear.val : '--год окончания--') + ' )' : ''
          return sentence ? sentence : ''
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
.rotated{
    transform: rotate(90deg);
}
.blue_text{
    color:$btn_blue_text !important;
}
.simple-svg-wrapper{
    transition: 0.3s;
}
.newSchool_form{
    z-index: -1;
    transition: all 0.3s,opacity 0.1s;
    h6:first-child{
        color: $main_black;
    }
}
#newSchoolBtn{
    border: 1px dashed $block_grey_outline;
    color: $paragraphcolor
}
#newSchoolBtn:hover{
    border: 1px solid $btn_blue_text;
    color: $btn_blue_text;
    background: $btn_blue_inactive
}
</style>