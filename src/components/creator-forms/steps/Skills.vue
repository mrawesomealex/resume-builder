<template>
    <div class="container step">
      <div class="mt-0">
        <h5>Профессиональные навыки</h5>
        <h6>В данную категорию входят все навыки, кроме владения языками. Для указания уровня поставьте  хештег и цифру после него (1 - 5) </h6>
      </div>
      <div class="container-fluid input-group px-0 align-middle">
        <div  v-for="(skill, key, index) in profSkills" :key="key" :class="['container-fluid list-item p-3 mb-1',{'mt-0' : index > 0}]">
          <div class="col-12 row px-0 ml-0 align-middle"> 
            <div @click="$emit('remove',{step:'skills',property:'skill'+index})">
              <simple-svg class=" d-inline-block pb-xl-0 pb-lg-0 pb-md-0 pb-sm-2 pb-2 pl-xl-3 pl-lg-3 pl-md-1 pl-sm-2 pl-2 pr-xl-4 pr-lg-3 pr-md-3 pr-sm-2  pr-2 removeBtn" :stroke="'none'" :fill="status.step3.error && !skill.value ? '#ef4136' : '#4b92e2'" :filepath="require('@/assets/step_icons/cancel.svg')"  :width="'25px'" :height="'25px'"/>
            </div>
            <div v-if="skill.level" class="m-level level d-xl-none d-lg-none d-md-none d-sm-inline-block d-inline-block pb-xl-0 pb-lg-0 pb-md-4 pb-sm-3 pb-3 pr-sm-3 pr-3 ">
              <span v-for="(n, key) in 5" :key="key" :class="['level-num',{chosen: n === skill.level}]">{{n}}</span>
            </div>
            <div class="input-wrap col-xl-11 col-lg-11 col-md-11 col-sm-12 col-12  ml-auto px-xl-0 px-lg-0 px-md-0 px-sm-2 px-2">
                <input type="text" placeholder="Например: Владение Microsoft Office 2017 #5" :class="['block_neutral col-12  py-3', {error: (errorField.value && errorField.index === index) || (status.step3.error && !skill.value)}]" 
                :value="skill.value+(skill.level ? ' #'+skill.level : '')" @input="changeProfSkills($event,index)"/>
                <div v-if="skill.level" class="level d-xl-inline-block d-lg-inline-block d-md-inline-block d-sm-none d-none ">
                  <span v-for="(n, key) in 5" :key="key" :class="['level-num',{chosen: n === skill.level}]">{{n}}</span>
                </div>
            </div>
          </div>
        </div>
        <div id="newSkillBtn" :class="['new_btn container-fluid button text-center py-4 mb-2 px-0 mt-4',{error: errorMessage}]" @click="addNewProff"><span>+ Добавить</span></div>
        <h6 v-if="this.errorMessage" class="mb-4 error_message">{{errorMessage}}</h6>
      </div>
       <div>
        <h5>Ваши достижения </h5>
        <h6>Укажите все ваши награды, призовые места, успехи в учебе ( достижения в работе указываются на след. шаге )</h6>
      </div>
      <div class="container-fluid input-group px-0 align-middle">
        <div  v-for="(achieve, key, index) in achievements" :key="key" :class="['container-fluid list-item p-3 mb-1',{'mt-0' : index > 0}]">
          <div class="col-12 row px-0 ml-0 align-middle"> 
            <div @click="$emit('remove',{step:'skills',property:'achieve'+index})">
              <simple-svg class=" d-inline-block  pl-xl-3 pl-lg-3 pl-md-1 pl-sm-2 pl-2 pr-xl-4 pr-lg-3 pr-md-3 pr-sm-2  pr-2 removeBtn" :stroke="'none'" :fill="status.step3.error && !achieve ? '#ef4136' : '#4b92e2'" :filepath="require('@/assets/step_icons/cancel.svg')"  :width="'25px'" :height="'25px'"/>
            </div>
            <div class="input-wrap col-11 pl-0 ml-auto row">
                <input type="text" placeholder="Например: Владение Microsoft Office 2017 #5" :class="['block_neutral col-12  py-3',{error: status.step3.error && !achieve}]" 
                :value="achieve ? achieve : ''" @input="changeAchieve($event, index)"/>
            </div>
          </div>
        </div>
        <div id="newAchieveBtn" :class="['new_btn container-fluid button text-center py-4 mb-2 px-0 mt-4',{error: errorMessage2}]" @click="addNewAchive"><span>+ Добавить</span></div>
        <h6 v-if="this.errorMessage2" class="mb-4 error_message">{{errorMessage2}}</h6>
      </div>
    </div>
</template>
<script>
    export default {
      props: ['status'],
      data: function () {
        return {
          errorMessage: '',
          errorMessage2: '',
          errorField: {
            value: '',
            index: -1
          }
        }
      },
      methods: {
        changeProfSkills (e, i) {
          let val = e.target.value
          let level
          if (/#[1-5]/.test(val)) {
            if (val.length > 2) {
              this.errorMessage = ''
              this.errorField.value = ''
              this.errorField.index = -1
              val = val.substr(0, val.length - 2).trim()
              level = parseInt(e.target.value.trim().substr(-1))
              this.$store.commit('CHANGE_SKILL_DATA', {
                num: i,
                type: 'proffesional',
                value: val,
                level: level
              })
            } else {
              this.errorField.value = 'Вы ввели неккорректный уровень'
              this.errorField.index = i
            }
          }
        },
        changeAchieve (e, i) {
          this.errorMessage2 = ''
          let val = e.target.value.trim()
          this.$store.commit('CHANGE_SKILL_DATA', {
            num: i,
            type: 'achievements',
            value: val,
            level: ''
          })
        },
        addNewProff () {
          this.errorMessage = ''
          for (let key in this.profSkills) {
            if (!this.profSkills[key].value) {
              this.errorMessage = 'У вас уже существует незаполненный блок'
              return
            }
          }
          this.$store.commit('ADD_NEW_PROFF_SKILL')
        },
        addNewAchive () {
          this.errorMessage2 = ''
          for (let key in this.achievements) {
            if (!this.achievements[key]) {
              this.errorMessage2 = 'У вас уже существует незаполненный блок'
              return
            }
          }
          this.$store.commit('ADD_NEW_ACHIEVE')
        }
      },
      computed: {
        profSkills: function () {
          return this.$store.state.resume.skills.proffesional
        },
        achievements: function () {
          return this.$store.state.resume.skills.achievements
        }
      }
    }
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/global";
input[type="radio"]:checked ~ label > div {
    background: $btn_blue_text url("../../../assets/step_icons/checked.svg") no-repeat;
    background-size: contain;
    border: 1px solid $btn_blue_text;
}
.removeBtn{
    transition: 0.3s;
}
.level{
  position: absolute;
  top:2%;
  right: 15px;
  background: $block_grey_fill;
  height: 80%;
  width: 120px;
  transition: 0.2s;
}
.level::before{
  content: '';
  position: absolute;
  height: 1px;
  left: 12%;
  top:55%;
  width: 100px;
  background: $btn_blue_text;
}
.level-num{
  z-index: 1;
  position: relative;
  display: inline-block;
  margin: -20px 0px 0px 13px;
  top:51.2%;
  background: $btn_blue_text;
  border-radius: 100%;
  overflow:hidden;
  width:5px;
  height: 5px;
  color: $btn_blue_text;
  transition: 0.3s;
}
.m-level{
  height: 0%;
  width: 130px;
  right: 0px;
  background: none;
  .level-num{
    margin: -6px 0px 0px 13px;
  }
  .level-num.chosen{
    margin-top:-5px;
  }
}
.level::before{
  left: 11%;
}
.level-num:first-child.chosen{
  margin: 0px 7px 0px 10px;
}
.level-num:last-child.chosen{
  margin: 0px 0px 0px 17px 
}
.level-num.chosen{
  background: white;
  border: 1px solid $btn_blue_text;
  width: 25px; 
  height: 25px;
  text-align: center;
  font-size: 8pt;
  line-height: 23px;
  top:29%;
  margin: 0px 3px 0px 14px;
}
.input-wrap{
  position: relative;
  input:focus~div{
    visibility:hidden;
    opacity: 0;
  }
}
@media (max-width: 768px) {
    .removeBtn{
        transform: scale(1.2)
    }
    .removeBtn,
    .m-level {
        margin-top: 0px;
    }
}
</style>