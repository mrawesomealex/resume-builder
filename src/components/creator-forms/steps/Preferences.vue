<template>
    <div class="container step">
        <h5>Выберите ваш текущий статус</h5>
        <div id="work_status" class="row input-group align-middle">
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 px-0  pb-xl-0 pb-lg-0 pb-md-4 pb-sm-4 pb-4">
                <input name="work_status" id="part_time" type="radio" value="0" :checked="work_status[0]" @change="choose_status(0)"/>
                <label for="part_time">
                    <div class="checkbox block_neutral mr-3"></div>
                    <span>Трудоустроен, в поиске дополнительного заработка</span>
                </label>
            </div> 
            <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 pl-0 pb-xl-0 pb-lg-0 pb-md-4 pb-sm-4 pb-4">   
                <input name="work_status" id="full_time" value="1" type="radio" :checked="work_status[1]" @change="choose_status(1)"/>
                <label for="full_time">
                    <div class="checkbox block_neutral mr-3"></div>
                    <span>В поиске основного рабочего места</span>
                </label>
            </div>
            <div class="col-xl-2 col-lg-2 col-md-12 col-sm-12 col-12  px-0 o text-xl-right text-lg-right text-md-left text-sm-left text-left">
                <input name="work_status" id="educate" value="2" type="radio" :checked="work_status[2]"  @change="choose_status(2)"/>
                <label for="educate">
                    <div class="checkbox block_neutral mr-3"></div>
                    <span>Учащийся</span>
                </label>
            </div>
        </div>
        <label for="w_area_field">
          <div>
            <h5>Укажите сферу вашей деятельности</h5>
            <h6>Если, вашей сферы деятельности нет в списке, добавьте ее с помощью соответсвующего поля</h6>
          </div>
        </label>
        <div id="work_area"  class="row input-group">
            <input id="w_area_field" placeholder="Найти сферу деятельности..." class="block_neutral pl-4 py-3 col-12 mr-3" @input="update_area()" @keyup="update_area()" :value="area">
            <button :disabled="!new_area" class="d-xl-block d-lg-block d-md-block d-sm-none d-none add-btn">+</button>
            <ul id="w_area_list" class="white_block col-12">
                <i v-if="new_area">
                    <span>Данной сферы деятельности не найдено. Нажмите <span class="d-xl-inline d-lg-inline d-md-inline d-sm-none d-none">+</span><span class="d-xl-none d-lg-none d-md-none d-sm-inline d-inline">Добавить</span>, чтобы создать новую</span>
                </i>
                <li v-if="!new_area" v-for="(item,key) in areas" :key="key">
                    <input type="radio" :id="item" :value="item" @click="area = item">
                    <label class="option" :for="item">{{item}}</label>
                </li>
            </ul>
            <button :disabled="!new_area" class="button red col-12 d-xl-none d-lg-none d-md-none d-sm-block d-block m-add-btn mt-2">+ Добавить</button>
        </div>
        <div>
            <h5>Выберите тип заработной платы</h5>
            <h6>Опция сдельная оплата предпологает оплату по завершению проекта или  этапах его выполнения</h6>
        </div> 
        <div id="work_salary"  class="container-fluid input-group px-0">    
            <div id="type" class="align-middle row col-xl-7 col-lg-7 col-md-12 pl-xl-3 pl-lg-3 px-md-0 px-sm-0 px-0">
                <div class="col-xl-6 col-lg-6 col-12 pl-0 pr-xl-3 pr-lg-3 pr-md-0 pr-sm-0 pr-0 ml-xl-0 ml-lg-0 ml-3">
                    <input name="work_salarytype" id="hourly" type="radio" value="1" :checked="salary_type[0]"  @change="choose_type(0)" />
                    <label for="hourly" class="d-block button block_neutral col-12 px-0  pt-xl-4 pt-lg-4  text-xl-center text-lg-center text-md-left text-sm-left ">
                        <div class="checkbox block_neutral mr-3"></div>
                        <span>Почасовая оплата</span>
                        <img  src="../../../assets/step_icons/stopwatch.svg"/>
                    </label>
                </div>
                <div class='col-xl-6 col-lg-6 col-12 pl-0 pr-xl-3 pr-lg-3 pr-0 ml-xl-0 ml-lg-0 ml-3'>  
                    <input name="work_salarytype" id="milestone" type="radio"  value="2" :checked="salary_type[1]"   @change="choose_type(1)">
                    <label for="milestone" class="d-block button block_neutral col-12 px-0  pt-xl-4 pt-lg-4 text-xl-center text-lg-center text-md-left text-sm-left ">
                        <div class="checkbox block_neutral mr-3"></div>
                        <span class="pl-xl-0 pl-lg-0 pl-md-1 pl-sm-1 pl-1 col-12">Сдельная оплата</span>
                        <img src="../../../assets/step_icons/idea.svg"/>
                    </label>
                </div>     
            </div> 
             <!--Модуль выбора валюты  -->
        </div>
        <div>  
            <h5>Выберите желаемый примерный уровень зарплаты</h5>
            <h6>Выберите зарплату без учета НДС, для будущего работодателя</h6>
        </div>
        <div id="salary_counts"  class="row input-group">
            <div class="container block_neutral align-middle p-3">
                <div v-if="salary_type[0] || salary_type[1]" class="pb-2 salary-info">
                    <span>от </span>
                    <strong>{{min_salary}}</strong>
                    <span>{{this.salary_type[0] ? '/в час' : '/за проект'}}</span>
                </div>
                <input id="salary" class=" px-0 col-12" type="range" min="0" :step="salaryInfo.step" :max="salaryInfo.max" @input="choose_salary()" :value="min_salary">
            </div>             
        </div>
        <div>
            <h5>Выберите желаемое примерное количество часов </h5>
            <h6>Для начала выберите период, за который предполгается получать выбранное количество часов</h6>
        </div>
        <div id="work_hours"  class="row input-group">
              <div class=" row col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 pt-3 pr-3 pb-3  align-middle">
                <div class="px-0 pb-xl-0 pb-lg-0 pb-md-3 pb-sm-3 pb-3 col-xl-4 col-lg-4 col-md-3 col-sm-12 col-12 ">   
                    <input name="term" id="week" type="radio" value="0" :checked="work_term[0]" @change="choose_term(0)"/>
                    <label for="week" class="mr-4 mb-0 pt-3">
                        <div class="checkbox block_neutral mr-3"></div>
                        <span>В неделю</span>
                    </label>
                </div>
                <div class="px-0 pb-xl-0 pb-lg-0 pb-md-3 pb-sm-3 pb-3  col-xl-4 col-lg-4 col-md-3 col-sm-12 col-12">
                    <input name="term" id="month" type="radio" value="1" :checked="work_term[1]" @change="choose_term(1)"/>
                    <label for="month"  class="mr-4 mb-0 pt-3">
                        <div class="checkbox block_neutral mr-3"></div>
                        <span>В месяц</span>
                    </label>
                </div>
                <div class="px-0 pb-xl-0 pb-lg-0 pb-md-3 pb-sm-3 pb-3  col-xl-4 col-lg-4 col-md-3 col-sm-12 col-12">
                    <input name="term" id="quater" type="radio" value="2" :checked="work_term[2]" @change="choose_term(2)"/>
                    <label for="quater" class="pt-3 mb-0">
                        <div class="checkbox block_neutral mr-3"></div>
                        <span>За квартал</span>
                    </label>
                </div>
              </div> 
              <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 block_neutral p-3 ml-auto ">  
                <span class="label_hours"><strong>{{hours}}</strong> часов</span>
                <input id="hours" class="px-0 col-12" type="range" min="0" :max="salaryInfo.term" :value="hours" @input="choose_hours()">
              </div>            
        </div>
    </div>

</template>

<script>
    export default {
      data: function () {
        return {
          val: '',
          salaryInfo: {
            step: 1,
            max: 50000,
            term: 480
          }
        }
      },
      methods: {
        choose_status: function (value) {
          this.work_status = value
        },
        update_area: function () {
          // eslint-disable-next-line  
          let content = $('#w_area_field').val()
          content = content.trim()
          if (this.area.length === 0 && content.length !== 0) {
            this.val = content
          }
          let fullPhrase = this.areas.filter((value) => {
            return value.length === this.area.length
          })
          if (this.new_area || fullPhrase.length === 0) {
            this.val = content
            if (this.$store.state.resume.area.length) {
              this.$store.commit('CHANGE_AREA', '')
            }
          } else {
            this.val = ''
            if (content.length !== 0) {
              this.$store.commit('CHANGE_AREA', content)
            }
          }
        },
        choose_type: function (value) {
          this.salary_type = value
        },
        choose_salary: function () {
          // eslint-disable-next-line  
          let newSalary = $('#salary').val()
          this.min_salary = newSalary
        },
        choose_term: function (value) {
          this.work_term = value
        },
        choose_hours: function () {
          // eslint-disable-next-line    
          let newHours = $('#hours').val()
          this.hours = newHours
        }
      },
      computed: {
        work_status: {
          get: function () {
            return this.$store.state.resume.work_status
          },
          set: function (newStatus) {
            this.$store.commit('CHANGE_WS', newStatus)
          }
        },
        areas: {
          get: function () {
            let p = this.$store.state.areas.arealist.filter((value) => {
              return value.indexOf(this.area) >= 0
            })
            return p
          }
        },
        area: {
          get: function () {
            return this.val.length === 0 ? this.$store.state.resume.area : this.val
          },
          set: function (value) {
            // eslint-disable-next-line   
            $('#w_area_field').val(value)
            this.$store.commit('CHANGE_AREA', value)
          }
        },
        new_area () {
          return this.areas.length === 0
        },
        salary_type: {
          get: function () {
            return this.$store.state.resume.salary_type
          },
          set: function (newType) {
            this.$store.commit('CHANGE_SALARY', 0)
            if (newType) {
              this.salaryInfo.step = 100
              this.salaryInfo.max = 50000
            } else {
              this.salaryInfo.step = 1
              this.salaryInfo.max = 500
            }
            this.$store.commit('CHANGE_ST', newType)
          }
        },
        min_salary: {
          get: function () {
            return this.$store.state.resume.salary
          },
          set: function (newSalary) {
            this.$store.commit('CHANGE_SALARY', newSalary)
          }
        },
        work_term: {
          get: function () {
            return this.$store.state.resume.work_term
          },
          set: function (newTerm) {
            switch (newTerm) {
              case 0: this.salaryInfo.term = 40
                break
              case 1: this.salaryInfo.term = 160
                break
              case 2: this.salaryInfo.term = 480
                break
              default: this.salaryInfo.term = 0
                break
            }
            this.$store.commit('CHANGE_WT', newTerm)
          }
        },
        hours: {
          get: function () {
            return this.$store.state.resume.hours
          },
          set: function (newHours) {
            this.$store.commit('CHANGE_HOURS', newHours)
          }
        }
      }
    }
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/global";
.figure{
    fill: #000000;;
} 
i{
    color: $paragraphcolor;
    font-family: $Roboto;
    font-weight: 300;
}
i label{
    color: $active;
}
input[type="radio"]{
    position: absolute;
    opacity: 0;
    z-index: -10;
}
.checkbox{
    display: inline-block;
    width:30px;
    height: 30px;
}
#work_status{
    position: relative
}
.align-middle *{
    vertical-align: middle;
}
#work_status>div{
    display: inline-block;
}
#work_status label{
    margin: 0;
}
label:hover{
    cursor: pointer;
}
input[type="radio"]:checked~label{
    span,div{
        animation: 0.15s skew forwards;
        transition: 0.15s;
    }
}
#w_area_list{
    position: absolute; 
    width: 100%;
    max-height: 25vh;
    overflow-y: scroll;
    .option{
        color: $paragraphcolor;
        transition: 0.3s;
    }
    .option:hover{
        color:$active;
        padding-left: 10px;
    }
}
#w_area_list::-webkit-scrollbar{
    opacity: 1;
}
#work_area{
    position: relative;
    display: flex;
    align-items: center;
    input:focus~.add-btn{
        background: $btn_blue_text;
        color: white;
    }
    input:focus~.add-btn[disabled="disabled"]{
        color:$paragraphcolor;
        background: white;
    }
}
#w_area_field{
    transition: 0.3s;
}

#w_area_field:focus~ul{
    top:40%;
    opacity: 1;
    z-index: 2;
}

.add-btn[disabled="disabled"]{
    border:none !important;
    opacity:.5;
    
}
.add-btn[disabled="disabled"]:hover{
    color: $paragraphcolor !important;
}
.add-btn{
    cursor: pointer;
    border:none;
    left:95.5%;
    z-index: 1;
    width:26px;
    font-family: $Roboto;
    font-weight: 700;
    text-align: center;
    background: $active;
    border-radius: 100%;
    color:white;
    position: absolute;
    transition: 0.3s;
}
.add-btn:focus{
    outline:none !important;
}
label span,
h6,
#w_area_field{
    font-family: $Roboto;
    font-weight: 400;
    color: $paragraphcolor
}
#w_area_field:focus,
#w_area_field:focus::-webkit-input-placeholder{
    color:$btn_blue_text;
    
}
h6{
    font-family: $Roboto;
    line-height: 22px;
    font-size: 11pt;
    font-weight: 300;
}
input[type="radio"]:checked~label>span{
    color:$btn_blue_text;
}
input[type="radio"]:checked~label>div{
    background: $btn_blue_text url('../../../assets/step_icons/checked.svg') no-repeat;
    background-size: contain;
    border:1px solid $btn_blue_text;
}
input[name="work_salarytype"]:checked~label{
    border: 1px solid $btn_blue_outline;
    background: $btn_blue_inactive;
    color:$btn_blue_text;
}
input[name="work_salarytype"]~.block_neutral{
    background: white;
    min-height: 175.5px;
}
.salary-info{
    font-family: $Roboto;
    font-weight: 400;
    color:$btn_blue_text 
}
input::-webkit-calendar-picker-indicator{
    display: none;
}
.label_hours{
    color:$btn_blue_text;
    font-family: $Roboto;
    font-weight: 400;
}

.white_block{   
    box-shadow: $shadow_light;
    list-style: none;
    width:50%;
    padding: 10px 20px;
    top:60%;
    opacity:0;
    z-index: -1;
    transition: 0.3s;
}
@media (max-width: 990px) {
    #work_salary label{
        padding-left: 25px !important;
    }
    #work_salary img{
        float: right;
    }
    .add-btn{
        left:93%;
    }
}
@media (max-width: 767px) {
    .add-btn{
        left:90%;
    }
    #w_area_list{
        margin-top: -30px;
    }
    #w_area_field:focus{
    margin-bottom:65px;
    }
}
@media (max-width: 570px){
    #work_salary label{
        padding-left: 13px !important;
    }
}
@keyframes skew{
    0%{
        -webkit-transform: scale(0.8);
        transform: scale(0.8);
    }
    100%{
        -webkit-transform: scale(1);
        transform: scale(1);
    }
}
</style>