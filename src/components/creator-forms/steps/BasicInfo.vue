<template>
    <div class="container step">
        <h5>Выберите тип желаемой работы</h5>
        <div id="work_type" class="row input-group align-middle">
            <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 px-0  pb-xl-0 pb-lg-0 pb-md-4 pb-sm-4 pb-4">
                <input name="work_type" id="full-time" type="radio" value="0" :checked="work_type[0]" @change="work_type = 0" />
                <label for="full-time">
                    <div :class="['checkbox block_neutral mr-3',{error: status.step1.error && !work_type[0] && !work_type[1] && !work_type[2] && !work_type[3]}]"></div>
                    <span>Полная занятость</span>
                </label>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 px-0  pb-xl-0 pb-lg-0 pb-md-4 pb-sm-4 pb-4 text-xl-center text-lg-center text-md-left text-sm-left text-left">
                <input name="work_type" id="part-time" type="radio" value="1" :checked="work_type[1]" @change="work_type = 1"/>
                <label for="part-time">
                    <div :class="['checkbox block_neutral mr-3',{error: status.step1.error && !work_type[0] && !work_type[1] && !work_type[2] && !work_type[3]}]"></div>
                    <span>Частичная занятость</span>
                </label>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 px-0  pb-xl-0 pb-lg-0 pb-md-4 pb-sm-4 pb-4 text-xl-center text-lg-center text-md-left text-sm-left text-left">
                <input name="work_type" id="intern" type="radio" value="2" :checked="work_type[2]" @change="work_type = 2"/>
                <label for="intern">
                    <div :class="['checkbox block_neutral mr-3',{error: status.step1.error && !work_type[0] && !work_type[1] && !work_type[2] && !work_type[3]}]"></div>
                    <span>Интернатура</span>
                </label>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12  px-0 o text-xl-right text-lg-right text-md-left text-sm-left text-left">
                <input name="work_type" id="remote" value="3" type="radio" :checked="work_type[3]" @change="work_type = 3"/>
                <label for="remote">
                    <div :class="['checkbox block_neutral mr-3',{error: status.step1.error && !work_type[0] && !work_type[1] && !work_type[2] && !work_type[3]}]"></div>
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
                    <th class="pb-4 pt-3" @click="setShift(0, 'day', false, true)"> 
                        <img class="isAvailable d-xl-inline d-lg-inline d-md-inline d-sm-inline  d-block mx-auto"  v-if="shiftsStatus.day" src="../../../assets/step_icons/shifts/sun.svg"/>
                        <img class="d-xl-inline d-lg-inline d-md-inline d-sm-inline  d-block mx-auto"  v-else src="../../../assets/step_icons/shifts/gsun.svg"/>
                        <span class="pr-2">c 8:00</span>
                    </th>
                    <th class="pb-4 pt-3" @click="setShift(0, 'evening', false, true)">
                        <img class="isAvailable d-xl-inline d-lg-inline d-md-inline d-sm-inline  d-block mx-auto"   v-if="shiftsStatus.evening" src="../../../assets/step_icons/shifts/sunset.svg"/>
                        <img class="d-xl-inline d-lg-inline d-md-inline d-sm-inline  d-block mx-auto"  v-else src="../../../assets/step_icons/shifts/gsunset.svg"/>
                        <span class="pr-2">c 17:00</span>
                    </th>
                    <th class="pb-4 pt-3" @click="setShift(0, 'night', false, true)">
                        <img class="isAvailable d-xl-inline d-lg-inline d-md-inline d-sm-inline  d-block mx-auto"  v-if="shiftsStatus.night" src="../../../assets/step_icons/shifts/moon.svg"/>
                        <img class="d-xl-inline d-lg-inline d-md-inline d-sm-inline  d-block mx-auto" v-else src="../../../assets/step_icons/shifts/gmoon.svg"/>
                        <span class="pr-2">c 23:00</span>
                    </th>
                </tr>
                <tr class="align-middle text-center" v-for="(day,key) in week_days" :key="key">
                    <td :class="['text-left py-4', { isAvailable: shifts['day' + (key+1)].day || shifts['day' + (key+1)].evening || shifts['day' + (key+1)].night }]" @click="setShift((key+1), '', true, false)">
                        <span class="d-xl-block d-lg-block d-md-block d-sm-none d-none">{{day}}</span> 
                        <span class="d-xl-none d-lg-none d-md-none d-sm-block d-block pr-4">{{subDays[key]}}</span>
                    </td>
                    <td :class="{choosed:shifts['day' + (key+1)].day}"> 
                        <input :id="'day-shift-' + key" type="checkbox" value="1" :checked="shifts['day' + (key+1)].day" @change="setShift(key+1,'day')"/>
                        <label :for="'day-shift-' + key">
                            <div class="checkbox block_neutral mr-xl-3 mr-lg-3 mr-md-3 mr-sm-3 mx-auto"></div>
                            <span class="d-xl-inline d-lg-inline d-md-inline d-sm-inline d-none">День</span>
                        </label>
                    </td>
                    <td :class="{choosed:shifts['day' + (key+1)].evening}">             
                        <input :id="'evening-shift-' + key" type="checkbox" value="2"  :checked="shifts['day' + (key+1)].evening" @change="setShift(key+1, 'evening')"/>
                        <label :for="'evening-shift-' + key">
                            <div class="checkbox block_neutral mr-xl-3 mr-lg-3 mr-md-3 mr-sm-3 mx-auto"></div>
                            <span class="d-xl-inline d-lg-inline d-md-inline d-sm-inline d-none">Вечер</span>
                        </label>
                    </td>
                    <td :class="{choosed:shifts['day' + (key+1)].night}">               
                        <input :id="'night-shift-' + key" type="checkbox" value="3"  :checked="shifts['day' + (key+1)].night" @change="setShift(key+1, 'night')"/>
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
           <input id="resume_goal_field" type="text" maxlength="135" placeholder="Введите цель..." :class="['block_neutral pl-4 py-3 col-12 mr-3',{error: status.step1.error && !goal_unsaved}]" v-model="goal_unsaved"  @change="save_goal()"/>
           <div class="max-length text-center py-1">{{charactersLeft}} / 135</div>
        </div>
        <h5>Введите ваш адрес проживания</h5>
        <div class="input-group pb-4">
            <div  class="container-fluid ">
                <div class="row pl-0">
                    <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 pl-0 pr-xl-3 pr-lg-3 pr-md-3 pr-sm-0 pr-0 mb-4">
                        <input id="country" :class="['block_neutral col-12 pl-4 py-3',{error: status.step1.error && !address.country}]" type="text" placeholder="Страна" :value="address.country" @change="change_address('country')">
                    </div>
                    <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12 text-right mr-0 pr-0 pl-xl-3 pl-lg-3 pl-md-3 pl-sm-0 pl-0 mb-4">    
                        <input id="street" :class="['block_neutral col-12 pl-4 py-3',{error: status.step1.error && !address.street}]"  type="text" placeholder="Улица  ( пример: пр. Центральный 55 )"  :value="address.street" @change="change_address('street')">
                    </div>
                </div>
            </div>
            <div  class="container-fluid">
                <div class="row pl-0">    
                    <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 pl-0 pr-xl-3 pr-lg-3 pr-md-3 pr-sm-0 pr-0 mb-4">
                        <input  id="city" :class="['col-12 block_neutral pl-4 py-3 d-block',{error: status.step1.error && !address.city}]"  type="text" placeholder="Город"  :value="address.city" @change="change_address('city')">
                    </div>
                    <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12 text-right mr-0 pr-0 pl-xl-3 pl-lg-3 pl-md-3 pl-sm-0 pl-0 mb-4">    
                      <div  class="container-fluid"> 
                        <div class="row pl-0">
                          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12 pl-0 pr-xl-3 pr-lg-3 pr-md-3 pr-sm-0 pr-0 mb-4">
                            <input id="state" :class="['col-12 block_neutral pl-4  py-3',{error: status.step1.error && !address.state}]" type="text" placeholder="Область"  :value="address.state" @change="change_address('state')">
                          </div>
                          <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 text-right mr-0 pr-0 pl-xl-3 pl-lg-3 pl-md-3 pl-sm-0 pl-0 mb-4">  
                            <input id="index" :class="['col-12 block_neutral pl-4 py-3',{error: status.step1.error && !address.index}]" type="text" placeholder="Индекс"  :value="address.index" @change="change_address('index')">
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
                <input name="sex" id="man" type="radio" value="0" :checked="sex.man" @change="sex='man'"/>
                <label for="man" class="col-12 row px-0 ">
                    <div class="checkbox block_neutral mr-3 ">
                        <simple-svg class="d-flex mx-auto" :stroke="'none'" :fill="sex.man ? 'white' : 'rgba(41, 41, 43, 0.98)' " :filepath="require('@/assets/step_icons/businessman.svg')" :width="'35px'" :height="'35px'"/>
                    </div>
                    <span>Мужчина</span>
                </label>
            </div>
            <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 pr-0  pb-0 mb-4">
                <input name="sex" id="woman" type="radio" value="1" :checked="sex.woman" @change="sex='woman'"/>
                <label for="woman" class="col-12 row px-0">
                    <div class="checkbox block_neutral mr-3 ">
                        <simple-svg class="d-flex mx-auto" :stroke="'none'" :fill="sex.woman ? 'white' : 'rgba(41, 41, 43, 0.98)' " :filepath="require('@/assets/step_icons/buisnesswoman.svg')" :width="'35px'" :height="'35px'"/>
                    </div>
                    <span>Женщина</span>
                </label>
            </div>
            <input id="fio" type="text"  placeholder="ФИО" :class="['block_neutral pl-4 py-3 col-xl-7 col-lg-5 col-md-12 col-sm-12 col-12 ml-auto mr-0 mb-4',{error: status.step1.error && !fio}]"  :value="fio" @change="set_fio()"/>             
        </div>
        <h5>Контакты</h5>
        <h6>Телефон считается введенным корректно, если появился флаг страны в поле код</h6>     
        <div id="contacts" class="container-fluid px-0 input-group">
            <div class="container-fluid"> 
                <div class="row pl-0">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 pl-0 pr-xl-3 pr-lg-3 pr-md-3 pr-sm-0 pr-0 mb-4" id="portfolio_adress">
                        <input id="portfolio_link" type="text" placeholder="Укажите адрес онлайн-портфолио (необязательно)" :class="['block_neutral col-12 pl-4 py-3',{error: !validatePortfolio && current_portfolio.length && first.portfolio}]" :value="current_portfolio" @change="set_portfolio_link()" @input="update_portfolio_link()"/>
                    </div>    
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 text-right mr-0 pr-0 pl-0 pl-xl-3 pl-lg-3 pl-md-3 pl-sm-0 pl-0 mb-4" id="email">
                        <input id="email_value" type="email" placeholder="Укажите email" :class="['block_neutral col-12 pl-4 py-3',{error: !validateEmail && !current_email && (first.email || status.step1.error)}]" :value="current_email" @change="set_email()" @input="update_email()"/>
                    </div>
                </div>
            </div>
            <div class="container-fluid"> 
                <div class="row pl-0">
                    <div class="phone-style col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 pl-0 pr-xl-3 pr-lg-3 pr-md-3 pr-sm-0 pr-0 mb-4" id="phone1">
                        <input id="phone1_code" :class="['country-code py-3 mr-0 block_neutral',{'pl-4' : !country1}, {error : phone_code_invalid.phone1 || (!phone1.code && status.step1.error)}]" type="tel" placeholder="+ Код" @change="get_country_code(1)" v-model="phone_codes_local.code1"/><input id="phone1_number" :class="['block_neutral col-9 pl-4 py-3', {error: phone_invalid.phone1 || (!phone1.number && status.step1.error)}]" type="tel"  placeholder="Мобильный тел." @change="processPhone(1)" v-model="phone_numbers_local.phone1"/>
                        <label v-if="country1" for="phone1_code">
                            <img class="flag" :src="country1" width="25px"/>
                        </label>
                    </div>
                    <div class="phone-style col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 text-right mr-0 pr-0 pl-0 pl-xl-3 pl-lg-3 pl-md-3 pl-sm-0 pl-0" id="phone2">
                        <input id="phone2_code"  :class="['country-code py-3 mr-0 col-3 block_neutral',{'pl-4' : !country2}, {error : phone_code_invalid.phone2}]" type="tel" placeholder="+ Код" @change="get_country_code(2)"  v-model="phone_codes_local.code2"/><input id="phone2_number" :class="['block_neutral col-9 pl-4 py-3', {error: phone_invalid.phone2 }]" type="tel"  placeholder="Доп. телефон (необязательно)" @change="processPhone(2)" v-model="phone_numbers_local.phone2"/>
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
                <button @click="resource.role ? set_current($event,index) : new_resource()" v-for="(resource,key,index) in resources" :key="resource.role" :class="['mb-4  py-3 px-4 resourse-btn block_neutral',{'mr-3':index < 13},{social_filled: resource.source},{new_btn: !resource.role},{focused: index === current_resource}]">
                    <span class="px-1" v-if="!resource.role">+</span>
                    <span class="px-1" v-if="resource.role && index > 4">{{resource.role.substr(0,2)}}</span>
                    <simple-svg v-if="index < 5" class="d-flex mx-auto my-auto" :stroke="'none'" :fill="resource.source && index !== current_resource ? 'white' : colors['el'+index] " :filepath="require('@/assets/step_icons/'+svg_socials[index]+'.svg')" :width="'20px'" :height="'20px'" />
                </button>
                <div v-if="resources['resource'+current_resource] && resources['resource'+current_resource].role" id="resource_form" class="container-fluid my-4">
                    <div class="row">
                        <input id="role_field" :class="['col-xl-6 col-lg-6 col-md-7 col-sm-12 col-12 block_neutral py-3 pl-4 mb-4',{error: source_invalid}]" type="text" placeholder="Название ресурса" maxlength="60" :value="resources['resource'+current_resource].role" @change="set_resource(true, current_resource)"/>
                    </div>
                    <div class="container-fluid col-xl-10 col-lg-12 col-md-12 col-sm-12 px-0 mr-0 ml-0">
                    <div class="row">  
                            <label id="link_icon" for="link_field" :class="['block_neutral col-xl-1 col-lg-1 col-md-1 col-sm-2 col-2 mb-0 pt-1',{active_link : resources['resource'+current_resource].source }]">
                                <simple-svg :stroke="'none'" :fill="resources['resource'+current_resource].source ? 'white' : 'rgba(41, 41, 43, 0.98)' " :filepath="require('@/assets/step_icons/link.svg')" :width="'20px'" :height="'20px'"/>
                            </label>
                            <input id="link_field" class="col-xl-11 col-lg-11 col-md-11 col-sm-10 col-10 block_neutral py-3 pl-4" type="text" placeholder="Введите адрес ресурса" :value="resources['resource'+current_resource].source"  @change="set_resource(false, current_resource)"/>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <h5>Выберите фотографию</h5>
        <h6>Загрузите файл в формате .jpg, .jpeg, .png, и менее 3Мб</h6>
        <div id="photo" class="container-fluid px-0 input-group">
            <div class="container-fluid"> 
                <div class="row pl-0">
                    <div class="col-xl-6 col-lg-6 col-md-4 col-sm-12 col-12 pl-0 pr-xl-3 pr-lg-3 pr-md-3 pr-sm-0 pr-0 mb-4">  
                        <input id="profileImg_picker" class="d-none" type="file" accept=".png, .jpg, .jpeg" @change="readAsButton()">
                        <label @dragover.stop.prevent="dragClass=true" @dragleave.stop.prevent.self="dragClass=false" @drop.stop.prevent="fileHandler($event)" id="drop-zone"  :class="['d-block block_neutral text-center py-xl-5 py-lg-5 py-md-5 py-sm-3 py-3 mb-0',{drag_zone: dragClass},{error : file_error || (!photo && status.step1.error)}]" for="profileImg_picker">
                            <simple-svg :stroke="'none'" class="mt-0" :fill="dragClass ? '#64a4ee' : 'rgba(41, 41, 43, 0.98)' " :filepath="require('@/assets/step_icons/photo.svg')" :width="'30px'" :height="'30px'" />
                            <span class="d-block mt-1 ">Загрузить</span>
                            <h6 class="mb-0 col-12">Нажмите или перетяните нужный файл</h6>
                        </label>
                    </div> 
                    <div id="crop" class="d-flex col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12 text-right mr-0 pr-0 pl-0 pl-xl-3 pl-lg-3 pl-md-3 pl-sm-0 pl-0 ">   
                        <div id="preview_block" class="d-flex text-center block_neutral col-xl-5 col-lg-5 col-md-6 col-sm-5 col-6 mb-xl-4 mb-lg-4 mb-md-4 mb-sm-4 mb-0">
                            <simple-svg :stroke="'none'" :fill=" !photo ?'#6d6d6d' : 'rgba(0,0,0,0)' " :filepath="require('@/assets/step_icons/preview.svg')" :width="'40px'" :height="'40px'"/>
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
      props: ['status'],
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
          first: {
            portfolio: false,
            email: false
          },
          current_portfolio: '',
          current_email: '',
          goal_unsaved: '',
          resourses_max: 14,
          phone_invalid: {
            phone1: false,
            phone2: false
          },
          phone_code_invalid: {
            phone1: false,
            phone2: false
          },
          phone_codes_local: {
            code1: '',
            code2: ''
          },
          phone_numbers_local: {
            phone1: '',
            phone2: ''
          },
          source_invalid: 0,
          dragClass: false,
          file_error: false,
          maxFileSize: 3153827,
          svg_socials: ['instagram', 'facebook', 'telegram', 'skype', 'vk'],
          week_days: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
          VALID_EMAIL_REG: /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          VALID_WEBSITE_REG: /((http|https):\/\/){0,1}(\w\.){0,1}www\.(.+\.)+[a-zA-Z]{2,}$/,
          VALID_PHONE_REG: /^((-{0,1}\(\d+\)-)|(\(\d+\))){0,1}\d{3,}(-\d+)*$/
        }
      },
      created: function () {
        let p = {}

        p['Тип занятости'] = {}
        p['Тип занятости']['status'] = this.work_type[0] || this.work_type[1] || this.work_type[2] || this.work_type[3]
        p['Тип занятости']['link'] = '#navigation'
        let isValue = 0
        for (let day in this.shifts) {
          for (let shift in this.shifts[day]) {
            if (this.shifts[day][shift]) {
              isValue = 1
              break
            }
          }
        }
        p['График работы'] = {}
        p['График работы']['status'] = isValue
        p['График работы']['link'] = '#work_type'

        p['Цель резюме'] = {}
        p['Цель резюме']['status'] = !!this.goal
        p['Цель резюме']['link'] = '#work_shifts'

        p['Адрес проживания'] = {}
        p['Адрес проживания']['status'] = this.address.country && this.address.state && this.address.city && this.address.street && this.address.index
        p['Адрес проживания']['link'] = '#resume_goal'

        p['Общие сведения'] = {}
        p['Общие сведения']['status'] = !!this.fio
        p['Общие сведения']['link'] = '#index'

        p['Контакты'] = {}
        p['Контакты']['status'] = this.email && this.phone1.code && this.phone1.number
        p['Контакты']['link'] = '#personal_info'
        isValue = 0
        for (let res in this.resources) {
          if (this.resources[res].role && this.resources[res].source) {
            isValue = 1
          }
        }
        p['Доп. ресурсы'] = {}
        p['Доп. ресурсы']['status'] = isValue
        p['Доп. ресурсы']['link'] = '#contacts'

        p['Фотография'] = {}
        p['Фотография']['status'] = !!this.photo
        p['Фотография']['link'] = '#additional_resources'

        this.$emit('formSideMenu', p)
      },
      mounted: function () {
        this.goal_unsaved = this.goal
        this.current_portfolio = this.portfolio_link
        this.current_email = this.email
        if (this.phone1.code) {
          this.phone_codes_local.code1 = this.phone1.code
        }
        if (this.phone2.code) {
          this.phone_codes_local.code2 = this.phone2.code
        }
        if (this.phone1.number) {
          this.phone_numbers_local.phone1 = this.phone1.number
        }
        if (this.phone2.number) {
          this.phone_numbers_local.phone2 = this.phone2.number
        }
        if (this.photo) {
          $('#preview_block').css({'background': 'url("' + this.photo + '") no-repeat 50% 50%', 'background-size': 'contain'})
        }
      },
      methods: {
        get_country_code: function (phoneId) {
          phoneId === 1 ? this.country1 = '' : this.country2 = ''
          let code = $('#phone' + phoneId + '_code').val().trim()
          if (code.indexOf('+') >= 0) {
            code = code.substr(1)
          }
          axios.get('https://restcountries.eu/rest/v2/callingcode/' + code + '?fields=flag')
          .then(response => {
            this.phone_code_invalid['phone' + phoneId] = false
            phoneId === 1 ? this.country1 = response.data[0].flag : this.country2 = response.data[0].flag
          })
          .catch(e => {
            this.phone_code_invalid['phone' + phoneId] = true
          })
        },
        focus_color (el) {
          this.colors['el' + el] = this.current_resource === el ? '#4b92e2' : 'rgba(41, 41, 43, 0.98)'
        },
        set_current (e, index) {
          this.source_invalid = 0
          if (this.current_resource === index) {
            this.current_resource = -1
            for (let i = 0; i < 6; i++) {
              this.focus_color(i)
            }
            e.target.blur()
          } else {
            this.current_resource = index
            for (let i = 0; i < 6; i++) {
              this.focus_color(i)
            }
            this.focus_color(index)
          }
        },
        setShift (day, shift, allDay = false, allShift = false) {
          this.$store.commit('CHANGE_SHIFTS', {
            newDay: day,
            newShift: shift,
            flagAllDay: allDay,
            flagAllShift: allShift
          })
        },
        save_goal () {
          this.$store.commit('CHANGE_GOAL', this.goal_unsaved.trim())
        },
        change_address (field) {
          let val = $('#' + field).val().trim()
          this.$store.commit('CHANGE_HOME_ADDRESS', {
            field,
            content: val
          })
        },
        set_fio () {
          let val = $('#fio').val().trim()
          this.$store.commit('CHANGE_FIO', val)
        },
        update_portfolio_link () {
          this.current_portfolio = $('#portfolio_link').val().trim()
        },
        update_email () {
          this.current_email = $('#email_value').val().trim()
        },
        set_portfolio_link () {
          if (!this.first.portfolio) { this.first.portfolio = true }
          if (this.validatePortfolio) { this.$store.commit('CHANGE_PORTFOLIO_LINK', this.current_portfolio) }
        },
        set_email () {
          if (!this.first.email) { this.first.email = true }
          if (this.validateEmail) { this.$store.commit('CHANGE_EMAIL', this.current_email) }
        },
        processPhone (num) {
          if (!this.phone_code_invalid['phone' + num] && !this.phone_codes_local['phone' + num]) {
            let phoneCode = $('#phone' + num + '_code').val().trim()
            let phoneNumber = $('#phone' + num + '_number').val().trim()
            if (!this.VALID_PHONE_REG.test(phoneNumber)) {
              this.phone_invalid['phone' + num] = true
              return
            } else {
              this.phone_invalid['phone' + num] = false
            }
            if (num === 1) {
              this.$store.commit('CHANGE_PRIMARY_PHONE', {
                code: phoneCode,
                number: phoneNumber
              })
            } else {
              this.$store.commit('CHANGE_SECOND_PHONE', {
                code: phoneCode,
                number: phoneNumber
              })
            }
          } else {
            this.phone_code_invalid['phone' + num] = true
          }
        },
        new_resource () {
          let quantity = 0
          this.current_resource = -1
          // eslint-disable-next-line 
          for (let key in this.resources) {
            quantity++
          }
          for (let i = 0; i < 6; i++) {
            this.focus_color(i)
          }
          if (quantity < 14) {
            if (this.resources['resource' + (quantity - 2)].role.indexOf('custom') === -1) {
              this.$store.commit('CHANGE_ADDITIONAL_RESOURCES', {
                createNew: true,
                newRole: '',
                newSource: ''
              })
            }
            return
          }
          if (quantity < 15 && this.resources.resource14.role) {
            this.$store.commit('CHANGE_ADDITIONAL_RESOURCES', {
              createNew: false,
              newRole: 'custom',
              newSource: ''
            })
          }
        },
        set_resource (updateSource, i) {
          let role = ''
          let source = ''
          role = $('#role_field').val().trim()
          source = $('#link_field').val().trim()
          if (updateSource) {
            for (let key in this.resources) {
              if (this.resources[key].role.indexOf(role) >= 0 && this.resources[key].role.length === role.length) {
                this.source_invalid = 1
              }
            }
          }
          if (!this.source_invalid) {
            this.$store.commit('CHANGE_ADDITIONAL_RESOURCES', {
              createNew: false,
              newRole: role,
              newSource: source,
              index: i
            })
          }
        },
        readAsButton () {
          let reader = new FileReader()
          let input = $('#profileImg_picker')[0].files[0]
          reader.onload = (e) => {
            this.loading = true
            $('#preview_block').css({'background': 'url("' + e.target.result + '") no-repeat 50% 50%', 'background-size': 'contain'})
            this.photo = e.target.result
          }
          if (input.size > this.maxFileSize || (input.type.indexOf('image/png') === -1 && input.type.indexOf('image/jpeg') === -1)) {
            this.file_error = true
          } else {
            this.file_error = false
            reader.readAsDataURL(input)
          }
        },
        fileHandler (e) {
          let reader = new FileReader()
          this.dragClass = false
          let file = e.dataTransfer.files[0]
          reader.onload = (e) => {
            this.loading = true
            $('#preview_block').css({'background': 'url("' + e.target.result + '") no-repeat 50% 50%', 'background-size': 'contain'})
            this.photo = e.target.result
          }
          if (file.size > this.maxFileSize || file.type.indexOf('image/png') === -1 || file.type.indexOf('image/jpeg') === -1) {
            this.file_error = true
          } else {
            this.file_error = false
            reader.readAsDataURL(file)
          }
        }
      },
      computed: {
        work_type: {
          get: function () {
            return this.$store.state.resume.basic.work_type
          },
          set: function (typeIndex) {
            this.$store.commit('CHANGE_WORK_TYPE', typeIndex)
          }
        },
        shifts: {
          get: function () {
            return this.$store.state.resume.basic.shifts
          }
        },
        goal: {
          get: function () {
            return this.goal_unsaved.length ? this.goal_unsaved : this.$store.state.resume.basic.goal
          }
        },
        address: {
          get: function () {
            return this.$store.state.resume.basic.home_address
          }
        },
        sex: {
          get: function () {
            return {
              man: this.$store.state.resume.basic.sex.man,
              woman: this.$store.state.resume.basic.sex.woman
            }
          },
          set: function (value) {
            this.$store.commit('CHANGE_SEX', value)
          }
        },
        fio: {
          get: function () {
            return this.$store.state.resume.basic.fio
          }
        },
        portfolio_link: {
          get: function () {
            return this.$store.state.resume.basic.portfolio_link.value
          }
        },
        email: {
          get: function () {
            return this.$store.state.resume.basic.email
          }
        },
        phone1: {
          get: function () {
            let phoneNumber = {}
            phoneNumber.number = this.phone_numbers_local.phone1 ? this.phone_numbers_local.phone1 : this.$store.state.resume.basic.phone1.number
            phoneNumber.code = this.phone_codes_local.code1 ? this.phone_codes_local.code1 : this.$store.state.resume.basic.phone1.code
            return phoneNumber
          }
        },
        phone2: {
          get: function () {
            let phoneNumber = {}
            phoneNumber.number = this.phone_numbers_local.phone2 ? this.phone_numbers_local.phone2 : this.$store.state.resume.basic.phone2.value.number
            phoneNumber.code = this.phone_codes_local.code2 ? this.phone_codes_local.code2 : this.$store.state.resume.basic.phone2.value.code
            return phoneNumber
          }
        },
        resources: {
          get: function () {
            return this.$store.state.resume.basic.additional
          }
        },
        photo: {
          get: function () {
            return this.$store.state.resume.basic.photo
          },
          set: function (content) {
            this.$store.commit('CHANGE_PHOTO', content)
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
          return 135 - this.goal.length
        },
        validatePortfolio () {
          return this.VALID_WEBSITE_REG.test(this.current_portfolio)
        },
        validateEmail () {
          return this.VALID_EMAIL_REG.test(this.current_email)
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
        span,image{
            cursor: pointer;
        }
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
    span{
        font-family: $Roboto!important;
        font-weight: 700 !important;
        text-transform: uppercase;
    }
}
#additional_resources button{
    vertical-align: top;
    height: 60px;
}
#additional_resources button:not(.new_btn):not(:focus):not(.social_filled):hover{
    background: rgba(204, 204, 209, 0.281);
    cursor: pointer;
}
button.social_filled{
    background:$btn_blue_text;
    border: 1px solid $btn_blue_text;
    color:white;
}
button.social_filled:hover{
    cursor: pointer;
    background: $blue_filled_hover;
    border: 1px solid $blue_filled_hover;
}
#resource_form{
    animation: appear 0.3s forwards;
    overflow: hidden;
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
#link_field{
    margin-left: -1px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    background: white;
}
#link_field:focus{
    border: 1px solid $block_grey_outline
}
.active_link{
    background: $btn_blue_text; 
    border: 1px solid $btn_blue_text; 
}
.active_link~#link_field:focus{
    border: 1px solid $btn_blue_text;
}
.new_btn{
    background: none;
    border: 1px dashed $block_grey_outline;
    color: $paragraphcolor;
    transition: 0.1s;
}
#additional_resources button:focus,
.new_btn:hover{
    cursor: pointer;
    border: 1px solid $btn_blue_outline;
    background: $btn_blue_inactive;
    color:$btn_blue_text;
}
.focused{
    border: 1px solid $btn_blue_outline !important;
    background: $btn_blue_inactive  !important;
    color:$btn_blue_text !important;
}
.new_btn:focus{
    background: white !important;
    border:1px dashed $block_grey_outline !important;
    color: $main_black!important;
    outline:none;
    transition: 0.1s;
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
            top:25%;
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
@keyframes appear{
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}
@keyframes bounce {
   0%{
       top: 0px
   }
   5%{
       top:10px;
   }
   10%{
       top:0px
   }
   15%{
       top:10px
   }
   20%{
       top:0px
   }
   100%{
       top:0px
   }
}
</style>