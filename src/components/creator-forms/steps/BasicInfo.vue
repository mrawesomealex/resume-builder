<template>
    <div class="container step">
        <h5>Выберите тип желаемой работы</h5>
        <div id="work_type" class="row input-group align-middle">
            <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 px-0  pb-xl-0 pb-lg-0 pb-md-4 pb-sm-4 pb-4">
                <!-- :checked="[0]" @change="(0)" -->
                <input name="work_type" id="full-time" type="radio" value="0" />
                <label for="full-time">
                    <div class="checkbox block_neutral mr-3"></div>
                    <span>Полная занятость</span>
                </label>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 px-0  pb-xl-0 pb-lg-0 pb-md-4 pb-sm-4 pb-4 text-xl-center text-lg-center text-md-left text-sm-left text-left">
                <!-- :checked="[0]" @change="(0)" -->
                <input name="work_type" id="part-time" type="radio" value="1"/>
                <label for="part-time">
                    <div class="checkbox block_neutral mr-3"></div>
                    <span>Частичная занятость</span>
                </label>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 px-0  pb-xl-0 pb-lg-0 pb-md-4 pb-sm-4 pb-4 text-xl-center text-lg-center text-md-left text-sm-left text-left">
                <!-- :checked="[0]" @change="(0)" -->
                <input name="work_type" id="intern" type="radio" value="2"/>
                <label for="intern">
                    <div class="checkbox block_neutral mr-3"></div>
                    <span>Интернатура</span>
                </label>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12  px-0 o text-xl-right text-lg-right text-md-left text-sm-left text-left">
                <!-- :checked="[0]" @change="(0)" -->
                <input name="work_type" id="remote" value="3" type="radio"/>
                <label for="remote">
                    <div class="checkbox block_neutral mr-3"></div>
                    <span>Удаленная работа</span>
                </label>
            </div>
        </div>
        <h5>Укажите подходящий для вас график работы</h5>
        <h6>Начало смены указано приблизительно</h6>
        <div id="work_shifts" class="row input-group">
            <table class="col-xl-8 col-lg-9 col-md-12">
                <tr class="text-center align-middle ">
                    <th></th>
                    <!-- @change="(all_day)" -->
                    <th class="pb-4 pt-3"> 
                        <img class="isAvailable d-xl-inline d-lg-inline d-md-inline d-sm-inline  d-block mx-auto"  v-if="shiftsStatus.day" src="../../../assets/step_icons/shifts/sun.svg"/>
                        <img class="d-xl-inline d-lg-inline d-md-inline d-sm-inline  d-block mx-auto"  v-else src="../../../assets/step_icons/shifts/gsun.svg"/>
                        <span class="pr-2">c 8:00</span>
                    </th>
                    <!-- @change="(all_eve)" -->
                    <th class="pb-4 pt-3">
                        <img class="isAvailable d-xl-inline d-lg-inline d-md-inline d-sm-inline  d-block mx-auto"   v-if="shiftsStatus.evening" src="../../../assets/step_icons/shifts/sunset.svg"/>
                        <img class="d-xl-inline d-lg-inline d-md-inline d-sm-inline  d-block mx-auto"  v-else src="../../../assets/step_icons/shifts/gsunset.svg"/>
                        <span class="pr-2">c 17:00</span>
                    </th>
                    <!-- @change="(all_night)" -->
                    <th class="pb-4 pt-3">
                        <img class="isAvailable d-xl-inline d-lg-inline d-md-inline d-sm-inline  d-block mx-auto"  v-if="shiftsStatus.night" src="../../../assets/step_icons/shifts/moon.svg"/>
                        <img class="d-xl-inline d-lg-inline d-md-inline d-sm-inline  d-block mx-auto" v-else src="../../../assets/step_icons/shifts/gmoon.svg"/>
                        <span class="pr-2">c 23:00</span>
                    </th>
                </tr>
                <tr class="align-middle text-center" v-for="(day,key) in week_days" :key="key">
                    <td :class="['text-left py-4', { isAvailable: shifts['day' + (key+1)].day || shifts['day' + (key+1)].evening || shifts['day' + (key+1)].night }]">
                        <span class="d-xl-block d-lg-block d-md-block d-sm-none d-none">{{day}}</span> 
                        <span class="d-xl-none d-lg-none d-md-none d-sm-block d-block pr-4">{{subDays[key]}}</span>
                    </td>
                    <td :class="{choosed:shifts['day' + (key+1)].day}">
                        <!-- @change="(0)" -->                
                        <input :id="'day-shift-' + key" type="checkbox" value="1" :checked="shifts['day' + (key+1)].day"/>
                        <label :for="'day-shift-' + key">
                            <div class="checkbox block_neutral mr-xl-3 mr-lg-3 mr-md-3 mr-sm-3 mx-auto"></div>
                            <span class="d-xl-inline d-lg-inline d-md-inline d-sm-inline d-none">День</span>
                        </label>
                    </td>
                    <td :class="{choosed:shifts['day' + (key+1)].evening}">
                        <!-- @change="(0)" -->                
                        <input :id="'evening-shift-' + key" type="checkbox" value="2"  :checked="shifts['day' + (key+1)].evening"/>
                        <label :for="'evening-shift-' + key">
                            <div class="checkbox block_neutral mr-xl-3 mr-lg-3 mr-md-3 mr-sm-3 mx-auto"></div>
                            <span class="d-xl-inline d-lg-inline d-md-inline d-sm-inline d-none">Вечер</span>
                        </label>
                    </td>
                    <td :class="{choosed:shifts['day' + (key+1)].night}"> 
                        <!-- @change="(0)" -->               
                        <input :id="'night-shift-' + key" type="checkbox" value="3"  :checked="shifts['day' + (key+1)].night"/>
                        <label :for="'night-shift-' + key">
                            <div class="checkbox block_neutral mr-xl-3 mr-lg-3 mr-md-3 mr-sm-3 mx-auto"></div>
                            <span class="d-xl-inline d-lg-inline d-md-inline d-sm-inline d-none">Ночь</span>
                        </label>
                    </td>
                </tr>
            </table>
        </div>  
        <h5>Введите цель вашего резюме</h5>
        <h6>Данный текст будет указываться сразу после вашего имени и фамилии , например: «Ищу работу в IT» </h6>
        <div id="resume_goal" class="row input-group">
            <!-- @change="(0)" -->  
           <input id="resume_goal_field" type="text" maxlength="135" placeholder="Введите цель..." class="block_neutral pl-4 py-3 col-12 mr-3"/>
           <div class="max-length px-3 py-1">{{charactersLeft}} / 135</div>
        </div>
        <h5>Введите ваш адрес проживания</h5>
        <div id="resume_goal" class="input-group pb-4">
            <div  class="container-fluid ">
                <div class="row pl-0">
                    <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 pl-0 pr-xl-3 pr-lg-3 pr-md-3 pr-sm-0 pr-0 mb-4">
                        <input class="block_neutral col-12 pl-4 py-3" type="text" placeholder="Страна">
                    </div>
                    <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12 text-right mr-0 pr-0 pl-xl-3 pl-lg-3 pl-md-3 pl-sm-0 pl-0 mb-4">    
                        <input  class="block_neutral col-12 pl-4 py-3"  type="text" placeholder="Улица  ( пример: пр. Центральный 55 )">
                    </div>
                </div>
            </div>
            <div  class="container-fluid">
                <div class="row pl-0">    
                    <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 pl-0 pr-xl-3 pr-lg-3 pr-md-3 pr-sm-0 pr-0 mb-4">
                        <input class="col-12 block_neutral pl-4 py-3 d-block"  type="text" placeholder="Город">
                    </div>
                    <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12 text-right mr-0 pr-0 pl-xl-3 pl-lg-3 pl-md-3 pl-sm-0 pl-0 mb-4">    
                      <div  class="container-fluid"> 
                        <div class="row pl-0">
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12 pl-0 pr-xl-3 pr-lg-3 pr-md-3 pr-sm-0 pr-0 mb-4">
                            <input  class="col-12 block_neutral pl-4  py-3" type="text" placeholder="Область">
                          </div>
                          <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 text-right mr-0 pr-0 pl-xl-3 pl-lg-3 pl-md-3 pl-sm-0 pl-0 mb-4">  
                            <input  class="col-12 block_neutral pl-4 py-3 " type="text" placeholder="Индекс">
                          </div>
                        </div> 
                      </div>  
                    </div>     
                </div>    
            </div>
        </div>
        <h5>Общие сведения</h5>
        <h6>Пол соискателя является необязательным полем</h6>   
        <div id="personal_info" class="row input-group align-middle">  
            <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 pr-0  pb-0 mb-4">
                <!-- :checked="[0]" @change="(0)" -->
                <input name="sex" id="man" type="radio" value="0" />
                <label for="man" class="col-12 row px-0 ">
                    <div class="checkbox block_neutral mr-3 ">
                        <simple-svg class="d-flex mx-auto" :stroke="'none'" :fill="sex.man ? 'white' : 'rgba(41, 41, 43, 0.98)' " :filepath="require('@/assets/step_icons/businessman.svg')" :width="'35px'" :height="'35px'"/>
                    </div>
                    <span>Мужчина</span>
                </label>
            </div>
            <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 pr-0  pb-0 mb-4">
                <!-- :checked="[0]" @change="(0)" -->
                <input name="sex" id="woman" type="radio" value="1"/>
                <label for="woman" class="col-12 row px-0">
                    <div class="checkbox block_neutral mr-3 ">
                        <simple-svg class="d-flex mx-auto" :stroke="'none'" :fill="sex.woman ? 'white' : 'rgba(41, 41, 43, 0.98)' " :filepath="require('@/assets/step_icons/buisnesswoman.svg')" :width="'35px'" :height="'35px'"/>
                    </div>
                    <span>Женщина</span>
                </label>
            </div>
            <input id="fio" type="text"  placeholder="ФИО" class="block_neutral pl-4 py-3 col-xl-7 col-lg-5 col-md-12 col-sm-12 col-12 ml-auto mr-0 mb-4"/>             
        </div>
        <h5>Контакты</h5>    
        <div id="contacts" class="container-fluid px-0 input-group">
            <div class="container-fluid"> 
                <div class="row pl-0">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 pl-0 pr-xl-3 pr-lg-3 pr-md-3 pr-sm-0 pr-0 mb-4" id="portfolio_adress">
                        <input type="text" placeholder="Укажите адрес онлайн-портфолио (необязательно)" class="block_neutral col-12 pl-4 py-3"/>
                    </div>    
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 text-right mr-0 pr-0 pl-0 pl-xl-3 pl-lg-3 pl-md-3 pl-sm-0 pl-0 mb-4" id="email">
                        <input type="email" placeholder="Укажите email" class="block_neutral col-12 pl-4 py-3"/>
                    </div>
                </div>
            </div>
            <div class="container-fluid"> 
                <div class="row pl-0">
                    <div class="phone-style col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 pl-0 pr-xl-3 pr-lg-3 pr-md-3 pr-sm-0 pr-0 mb-4" id="phone1">
                        <input id="phone1_code" :class="['country-code py-3 mr-0 block_neutral',{'pl-4' : !country1}]" type="tel" placeholder="+ Код" @change="get_country_code(1)"/><input class="block_neutral col-9 pl-4 py-3 " type="tel"  placeholder="Мобильный тел."/>
                        <label v-if="country1" for="phone1_code">
                            <img class="flag" :src="country1" width="25px"/>
                        </label>
                    </div>
                    <div class="phone-style col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 text-right mr-0 pr-0 pl-0 pl-xl-3 pl-lg-3 pl-md-3 pl-sm-0 pl-0" id="phone2">
                        <input id="phone2_code"  :class="['country-code py-3 mr-0 col-3 block_neutral',{'pl-4' : !country2}]" type="tel" placeholder="+ Код" @change="get_country_code(2)"/><input class="block_neutral col-9 pl-4 py-3" type="tel"  placeholder="Доп. телефон (необязательно)"/>
                        <label v-if="country2" for="phone2_code">
                            <img class="flag" :src="country2" width="25px"/>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <h5>Дополнительные ресурсы соискателя</h5>
        <h6>Используйте кнопки "+" для добавление дополнительных ресурсов к вашему резюме</h6>        
        <div id="additional_resources" class="row input-group px-0 pb-3"> 
            <div class="container-fluid px-0 mb-4 pb-3 text-xl-left text-lg-left text-md-left text-sm-center text-center">
                <button @focus="focus_color(1, index)" @blur="focus_color(0, index)" v-for="(resource,key,index) in resources" :key="key" :class="['mb-4  py-3 px-4 resourse-btn block_neutral',{'mr-3':index < 13},{social_filled: resource.source},{new_btn: !resource.role}]">
                    <span class="px-1" v-if="!resource.role">+</span>
                    <simple-svg v-if="index < 5" class="d-flex mx-auto my-auto" :stroke="'none'" :fill="resources['resource'+index].source ? 'white' : colors['el'+index] " :filepath="require('@/assets/step_icons/'+svg_socials[index]+'.svg')" :width="'20px'" :height="'20px'" />
                </button>
                <div v-if="resources[current_resource]" id="resource_form" class="container-fluid my-4">
                    <div class="row">
                        <input class="col-xl-6 col-lg-6 col-md-7 col-sm-12 col-12 block_neutral py-3 pl-4 mb-4" type="text" placeholder="Название ресурса" maxlength="60"/>
                    </div>
                    <div class="container-fluid col-xl-10 col-lg-12 col-md-12 col-sm-12 px-0 mr-0 ml-0">
                      <div class="row">  
                        <label id="link_icon" for="link-field" :class="['block_neutral col-xl-1 col-lg-1 col-md-1 col-sm-2 col-2 mb-0 pt-1',{active_link : resources[current_resource].source }]">
                            <simple-svg :stroke="'none'" :fill="resources[current_resource].source ? 'white' : 'rgba(41, 41, 43, 0.98)' " :filepath="require('@/assets/step_icons/link.svg')" :width="'20px'" :height="'20px'"/>
                        </label>
                        <input id="link-field" class="col-xl-11 col-lg-11 col-md-11 col-sm-10 col-10 block_neutral py-3 pl-4" type="text" placeholder="Введите адрес ресурса"/>
                      </div>
                    </div>
                </div>
            </div>
        </div>
        <h5>Выберите фотографию</h5>
        <h6>Загрузите файл в формате .jpg, .jpeg, .png</h6>
        <div id="photo" class="container-fluid px-0 input-group">
            <div class="container-fluid"> 
                <div class="row pl-0">
                    <div class="col-xl-6 col-lg-6 col-md-4 col-sm-12 col-12 pl-0 pr-xl-3 pr-lg-3 pr-md-3 pr-sm-0 pr-0 mb-4">  
                        <input id="profileImg_picker" class="d-none" type="file" accept=".png, .jpg, .jpeg" >
                        <label class="d-block block_neutral text-center py-xl-5 py-lg-5 py-md-5 py-sm-3 py-3 mb-0" for="profileImg_picker">
                            <simple-svg :stroke="'none'" class="mt-0" :fill=" 'rgba(41, 41, 43, 0.98)' " :filepath="require('@/assets/step_icons/photo.svg')" :width="'30px'" :height="'30px'" />
                            <span class="d-block mt-1">Загрузить</span>
                            <h6 class="mb-0 col-12">Нажмите или перетяните нужный файл</h6>
                        </label>
                    </div> 
                    <div id="crop" class="d-flex col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12 text-right mr-0 pr-0 pl-0 pl-xl-3 pl-lg-3 pl-md-3 pl-sm-0 pl-0 ">   
                        <div id="preview_block" class="d-flex text-center block_neutral col-xl-5 col-lg-5 col-md-6 col-sm-5 col-6 mb-xl-4 mb-lg-4 mb-md-4 mb-sm-4 mb-0">
                            <simple-svg :stroke="'none'" :fill="'#6d6d6d' " :filepath="require('@/assets/step_icons/preview.svg')" :width="'40px'" :height="'40px'"/>
                        </div>
                        <h6 class="d-block block_neutral col-xl-7 col-lg-7 col-md-6 col-sm-7 col-6 text-left p-xl-4 p-lg-4 p-md-4 p-sm-5 p-5 mb-xl-4 mb-lg-4 mb-md-4 mb-sm-4 mb-0">Предварительный  просмотр показывает как ваше фото будет смотрется на странице резюме</h6>
                    </div>     
                </div>
            </div>
        </div>                    
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
      data: function () {
        return {
          country1: '',
          country2: '',
          current_resource: '',
          colors: {
            el0: 'rgba(41, 41, 43, 0.98)',
            el1: 'rgba(41, 41, 43, 0.98)',
            el2: 'rgba(41, 41, 43, 0.98)',
            el3: 'rgba(41, 41, 43, 0.98)',
            el4: 'rgba(41, 41, 43, 0.98)'
          },
          resourses_max: 14,
          svg_socials: ['instagram', 'facebook', 'telegram', 'skype', 'vk'],
          week_days: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
        }
      },
      methods: {
        get_country_code: function (phoneId) {
          phoneId === 1 ? this.country1 = '' : this.country2 = ''
          // eslint-disable-next-line
          let code = $('#phone' + phoneId + '>input.country-code').val() 
          if (code.indexOf('+') >= 0) {
            code = code.substr(1)
          }
          // eslint-disable-next-line 
          axios.get('https://restcountries.eu/rest/v2/callingcode/' + code + '?fields=flag')
          .then(response => {
            phoneId === 1 ? this.country1 = response.data[0].flag : this.country2 = response.data[0].flag
          })
          .catch(e => {
          })
        },
        focus_color (focusStatus, el) {
          if (!this.resources['resource' + el].source.length) {
            this.colors['el' + el] = focusStatus ? '#4b92e2' : 'rgba(41, 41, 43, 0.98)'
          }
        }
      },
      computed: {
        shifts: {
          get: function () {
            return {
              day1: {day: 0, evening: 0, night: 0},
              day2: {day: 0, evening: 0, night: 0},
              day3: {day: 0, evening: 0, night: 0},
              day4: {day: 0, evening: 0, night: 0},
              day5: {day: 0, evening: 0, night: 0},
              day6: {day: 0, evening: 0, night: 0},
              day7: {day: 0, evening: 0, night: 0}
            }
          },
          set: function (value) {
            // setter for shifts
          }
        },
        sex: {
          get: function () {
            return {man: 0, woman: 0}
          },
          set: function (value) {
          }
        },
        resources: {
          get: function () {
            return {
              resource0: {role: 'instagram', source: ''},
              resource1: {role: 'facebook', source: ''},
              resource2: {role: 'telegram', source: ''},
              resource3: {role: 'skype', source: ''},
              resource4: {role: 'vk', source: ''},
              resource5: {role: '', source: ''}
            }
          },
          set: function (value) {
          }
        },
        shiftsStatus () {
          let statuses = {}
          for (let shift in this.shifts) {
            if (this.shifts[shift].day) { statuses.day = 1 }
            if (this.shifts[shift].evening) { statuses.evening = 1 }
            if (this.shifts[shift].night) { statuses.night = 1 }
          }
          return statuses
        },
        subDays () {
          let weekDs = []
          for (let i = 0; i < this.week_days.length; i++) {
            let matches = this.week_days[i].match(/[^аеёиоуыэюя]/g)
            weekDs[i] = matches[0] + matches[1]
          }
          return weekDs
        },
        charactersLeft () {
          return 0
        }
      }
    }
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/global";

@mixin flag_inputs {
.phone-style{
        label{
            left: 7%
        }
        input:first-child{
            padding-left:25px !important;
            color:white;
            transition-delay: 0s;
        }
        input:first-child ~ input{
            transition: 0.2s;
            transition-delay: 0.1s;
        }
        input:first-child:focus{
            z-index: 2;
            width: 25%;
            color: $btn_blue_text;
            transition-delay: 0.1s;
        }
        input:first-child:focus ~ input{
            width: 80%;
            transition-delay: 0s;
            transition: 0.2s;
        }
    }
}
table{
    tr{
        td:nth-child(2):not(.choosed),
        td:nth-child(3):not(.choosed),
        td:nth-child(4):not(.choosed){
            background: #fdfdfd42;
            border: 1px solid $divider;
            font-family: $Exo;
            font-weight: 300;
        }
        td:nth-child(2):not(.choosed):hover,
        td:nth-child(3):not(.choosed):hover,
        td:nth-child(4):not(.choosed):hover{
            background: #f1f1f14d;
        }
        td:first-child,
        th{
            font-family: $Exo;
            font-weight: 300;
            color:$main_black
        }
        .isAvailable{
            color: $btn_blue_text !important;
            font-weight: 400 !important;
        }
        .isAvailable~span{
            color: $btn_blue_text
        }
        td:nth-child(2):not(.choosed){
            border-left: 1px solid $block_grey_outline;
        }
        td:nth-child(4):not(.choosed){
            border-right: 1px solid $block_grey_outline;
        }
        .choosed{
            background: $btn_blue_text;
            border: 1px solid $btn_blue_text;
            font-weight: 400;
        }
    }
    tr:nth-child(2){
        td:nth-child(2):not(.choosed),
        td:nth-child(3):not(.choosed),
        td:nth-child(4):not(.choosed),{
            border-top: 1px solid $block_grey_outline;
        }
    }
    tr:nth-child(8){
        td:nth-child(2):not(.choosed),
        td:nth-child(3):not(.choosed),
        td:nth-child(4):not(.choosed),{
            border-bottom: 1px solid $block_grey_outline;
        }
    }


}
input[type="text"]:focus~.max-length{
        opacity: 1;
        transition: 0.2s;
        transition-delay:0.3s;
}
.max-length{
    opacity: 0;
    position: absolute;
    top: -15px;
    left: 92%;
    color: $btn_blue_text; 
    background: white;
    font-size: 0.7vw;
    font-family: $Exo;
}
input[type="radio"]:checked ~ label > div,
input[type="checkbox"]:checked ~ label > div{
    background: $btn_blue_text url("../../../assets/step_icons/checked.svg") no-repeat;
    background-size: contain;
    border: 1px solid $btn_blue_text;
}
.choosed input[type="checkbox"]:checked ~ label > div{
    background-color: #274e7a;
}
#personal_info{
    input[name="sex"]:checked ~ label > div{
        background-color: $btn_blue_text;
        background-image: none;
    }
    .checkbox{
      display: flex;  
      width: 50px;
      height: 50px;
    }
}
.phone-style{
    position: relative;
    label{
        position: absolute;
        top:26%;
        left:4%;
        opacity: 1;
        transition: 0.3s;
    }
    input:first-child{
        position: relative;
    }
    input:first-child{
        width: 25%;
        padding-left:60px;
        background: white;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
    }
    input:first-child:focus{
        z-index: 1;
        padding-left: 20px; 
    }
    input:first-child:focus~label{
        left: 1%
    }
    input:nth-child(2){
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
        margin-left: -1px;
    }
}
.phone-style:last-child{
    label{
        top:19%;
        left: 8%
    }
    input:first-child:focus~label{
        opacity: 0;
        left: 3%;
        transition:0s;
    }
}
.resourse-btn:not(:last-child){
    margin-right:2.95%;
}
button.social_filled{
    background:$btn_blue_text;
    border: 1px solid $btn_blue_text; 
}
#additional_resources button{
    vertical-align: top;
    height: 60px;
}
#additional_resources button:not(.new_btn):hover{
    background: rgba(204, 204, 209, 0.281);
    cursor: pointer;
}

#resource_form #link_icon{
    display:flex;
    align-items: center;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;    
    align-items: center;
    justify-content: center;
    z-index: 1;
}
#link-field{
    margin-left: -1px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    background: white;
}
#link-field:focus{
    border: 1px solid $block_grey_outline
}
.active_link{
    background: $btn_blue_text; 
    border: 1px solid $btn_blue_text; 
}
.active_link~#link-field:focus{
    border: 1px solid $btn_blue_text;
}
.new_btn{
    background: none;
    border: 1px dashed $block_grey_outline;
    color: $paragraphcolor;
    transition: 0.1s;
}
.new_btn:hover{
    cursor: pointer;
    border: 1px solid $btn_blue_outline;
    background: $btn_blue_inactive;
    color:$btn_blue_text;
}
label[for="profileImg_picker"]{
    background: none;
    border: 1px dashed $block_grey_outline;
    span{
        color: $main_black
    }
}
label[for="profileImg_picker"]:hover{
    border: 1px solid $btn_blue_text;
    background: $btn_blue_inactive;
    span{
        color:$btn_blue_text;
        transition: 0.2s;
    }
}
#crop{
    div{
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
    }
    h6{
        background: none;
        margin-left: -1px;
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;        
    }
    #preview_block{
        justify-content: center;
        align-items: center;
    }
}
@media (max-width: 990px) and (min-width: 768px){
    @include flag_inputs;
    #phone2 input:nth-child(2)~label{
        left: 12%
    }
}
@media (max-width: 767px) {
    .phone-style:last-child{
        label{
            left: 4%
        }
        input:first-child:focus~label{
            opacity: 0;
            left: 1%;
            transition:0s;
        }
    }
    label[for="profileImg_picker"] > span[data-v-0f1af499]{
        font-size: 3vw
    }
}
@media (max-width: 545px) {
    @include flag_inputs;
    .phone-style label{
        display: block;
    }
    #phone2 input:nth-child(2)~label{
        left: 7%
    }
}
@media (max-width: 514px){
    #crop{
        h6{
            padding: 30px !important;
            font-size: 3vw;
        }
    }
}
@media (max-width: 390px){
    label[for="profileImg_picker"] > span[data-v-0f1af499]{
        font-size: 5.5vw
    }
    #crop{
        flex-direction: column;
        div{
            border-radius: 6px;
            flex: 0 0 100%;
            max-width: 100%;
        }
        h6{ 
           visibility: hidden;
        }

    }
}
</style>