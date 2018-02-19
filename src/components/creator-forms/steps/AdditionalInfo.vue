<template>
    <div class="container step">
      <h5>Рекомендации</h5>
      <h6>Лица, которые могут составить мнения о ваших професиональных качествах</h6>
      <div id="recommendators" class="row input-group">
        <div  v-for="(person, key, index) in recommendations" :key="key" :class="['container-fluid list-item p-0 ref mb-2',{'mt-0' : index > 0},{open:statuses['status'+index]}]">
            <header class="row p-4" :class="[{errorColor: status.step5.error && !person.not_required && (!person.fullName || (!person.email && !person.phone.code && !person.phone.number))}]">
              <simple-svg class="d-xl-inline-block d-lg-inline-block d-md-inline-block d-sm-inline-block d-none mx-3" :stroke="'none'" :fill="status.step5.error && !person.not_required && (!person.fullName || (!person.email && !person.phone.code && !person.phone.number))?'#ef4136' : '#4b92e2'" :filepath="require('@/assets/step_icons/university.svg')"  :width="'25px'" :height="'25px'"/>
              <label for="person_name" class="ml-xl-0 ml-lg-0 ml-md-0 ml-sm-0 ml-3" @click="changeCurrent(index)">
                <span v-if="person.fullName">{{ person.fullName }}</span>
                <span v-if="!person.fullName">{{'Новая рекомендация'}}</span>
                <simple-svg :class="['d-xl-inline-block d-lg-inline-block d-md-inline-block d-sm-inline-block d-none', {'rotated ml-3 mb-2': statuses['status'+index]},{'ml-2 mr-3': !statuses['status'+index]}]" :stroke="'none'" :fill="status.step5.error && !person.not_required && (!person.fullName || (!person.email && !person.phone.code && !person.phone.number))?'#ef4136' : '#4b92e2'" :filepath="require('@/assets/images/arrow.svg')"  :width="'12px'" :height="'12px'"/>
              </label>
                <div :class="['ml-auto mr-3 my-auto']" @click="$emit('remove',{step:'additional',property:'reference'+index})">
                <simple-svg :stroke="'none'" :fill="status.step5.error && !person.not_required && (!person.fullName || (!person.email && !person.phone.code && !person.phone.number))?'#ef4136' : '#4b92e2'" :filepath="require('@/assets/step_icons/cancel.svg')"  :width="'25px'" :height="'25px'"/>
                </div>
            </header>
            <transition name="open-window">
                <div v-if="statuses['status'+index]" class="container-fluid newRef_form p-4">
                  <div class="container-fluid">
                      <div class="row align-middle mb-4">
                          <div class="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 pl-0 pr-xl-3 pr-lg-3 pr-md-0 pr-sm-0 pr-0">
                              <input id="person_name" type="text" placeholder="ФИО рекомендующего" :class="['block_neutral col-12 pl-4 py-3 mb-xl-0 mb-lg-0 mb-md-4 mb-sm-4 mb-4',{error : status.step5.error && !person.not_required && !person.fullName}]" 
                              :value="person.fullName" @input="changeRef($event,'fullName',index)"/>
                          </div>    
                          <div class="d-flex col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 text-right mr-0 pr-0 pl-xl-3 pl-lg-3 pl-md-0 pl-sm-0 pl-0 " >
                              <input class="d-none" id="can_call" type="checkbox" value="0" :checked="person.canCall" @change="changeRef($event,'canCall',index)"/>
                              <label class="d-block ml-xl-auto ml-lg-auto ml-md-0 mb-0" for="can_call">
                                  <div class="checkbox block_neutral mr-3"></div>
                                  <span>Можно связаться с данным человеком</span>
                              </label>                        
                          </div>
                      </div>
                  </div>
                  <div class="container-fluid ">
                      <div class="row">
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 text-right mr-0 pr-0 pl-0 mb-4" id="email">
                          <input id="email_value" type="email" placeholder="Укажите email" :class="['block_neutral col-12 pl-4 py-3',{error: !validateEmail['email'+index] || (status.step5.error && !person.not_reqired && (!person.email && !person.phone.code && !person.phone.number))}]" :value="bufEmail ? bufEmail : person.email" @blur="buffEmail = ''" @input="updateEmail($event, index)" @change="changeRef($event,'email',index)"/>
                        </div>
                        <phone :phoneData="{phone: person.phone, i: index}" :errorStatus="status.step5.error && !person.not_reqired && (!person.email && !person.phone.code && !person.phone.number)" @changePhone="passPhone"></phone>
                      </div>
                  </div>
                </div>
            </transition>
        </div>
        <div id="newRefBtn" :class="['new_btn container-fluid button text-center py-4 mb-2 px-0 mt-4',{error: errorMessage2}]" @click="addNewRef"><span>+ Добавить</span></div>
        <h6 v-if="this.errorMessage2" class="mb-4 error_message">{{errorMessage2}}</h6>   
      </div>
      <h5>Добавьте сертификаты и лицензии</h5>
      <h6>Документ должен быть в формате PDF или картинкой ( JPEG, PNG ) и менее 3Мб</h6>
      <div id="certificates" class="row input-group">
        <div  v-for="(doc, key, index) in docs" :key="key" :class="['container-fluid list-item p-3 mb-1',{'mt-0' : index > 0}]">
          <div class="row"> 
            <div class="col-xl-1 col-lg-1 col-md-1 pl-1 mb-xl-0 mb-lg-0 mb-md-0 mb-sm-3 mb-3">
              <div @click="$emit('remove',{step:'additional',property:'doc'+index})">
                <simple-svg class=" d-inline-block  pl-xl-3 pl-lg-3 pl-md-1 pl-sm-2 pl-2 pr-xl-4 pr-lg-3 pr-md-3 pr-sm-2  pr-2 removeBtn" :stroke="'none'" :fill="(status.step5.error && !doc.not_required && (!doc.name || !doc.file)) ? '#ef4136' : '#4b92e2'" :filepath="require('@/assets/step_icons/cancel.svg')"  :width="'25px'" :height="'25px'"/>
              </div>
            </div>
            <div class="col-xl-11 col-lg-11 col-md-11 col-sm-12 col-12 pr-0">
              <div class="row ml-2">
                <div class="input-wrap col-xl-7 col-lg-7 col-md-10 col-sm-12 col-12 pl-xl-0 pl-lg-0 pl-md-2 pl-sm-2 pl-2 row mb-xl-0 mb-lg-0 mb-md-0 mb-sm-3 mb-3">
                    <input type="text" placeholder="Введите название сертификата или лецензии" :class="['block_neutral col-12  py-3',{error: status.step5.error && !doc.not_required && !doc.name}]" 
                    :value="doc.name ? doc.name : ''" @input="changeDocName($event, index)"/>
                </div>
                <div class="col-xl-5 col-lg-5 col-md-2 col-sm-12 col-12 pl-xl-4 pl-lg-4 pl-md-4 pl-sm-0 pl-xl-0 pl-lg-0 pl-md-2 pl-sm-2 pl-2 align-middle pr-xl-0 pr-lg-0 pr-md-0 row">  
                  <input id="doc_picker" class="d-none" type="file" accept=".png, .jpg, application/pdf" @change="readAsButton($event, index)">
                  <label id="drop-zone"  :class="['block_neutral text-left container-fluid mb-0 py-3 ',{error : file_errors['error' + index] || (!doc.not_required && status.step5.error &&  (!doc.name || !doc.file))}]" for="doc_picker">
                    <div class="row">
                      <simple-svg :stroke="'none'" class="d-flex mt-0 mx-3" :fill="(file_errors['error' + index] && !doc.not_required) ? '#ef4136' : 'rgba(41, 41, 43, 0.98)' " :filepath="require('@/assets/step_icons/photo.svg')" :width="'30px'" :height="'30px'" />
                      <h6 v-if="!file_errors['error' + index] && !doc.file " class="mb-0 d-xl-flex d-lg-flex d-md-none d-sm-flex d-flex">Нажмите или перетяните файл</h6>
                      <h6 v-if="file_errors['error' + index]" class="mb-0 d-xl-flex d-lg-flex d-md-none d-sm-flex d-flex">{{ file_errors['error' + index] }}</h6>
                      <h6 v-if="doc.file" class="mb-0 d-xl-flex d-lg-flex d-md-none d-sm-flex d-flex">Файл загружен!</h6>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>   
        </div>
        <div id="newSkillBtn" :class="['new_btn container-fluid button text-center py-4 mb-2 px-0 mt-4',{error: errorMessage1}]" @click="addNewDoc"><span>+ Добавить</span></div>
        <h6 v-if="this.errorMessage1" class="mb-4 error_message">{{errorMessage1}}</h6>
      </div>
      <div class="mt-0">
        <h5>Расскажите о себе</h5>
        <h6>Составьте о себе первоначальное мнение, не привязываясь к местам работы и учебы</h6>
      </div>
      <div class="row input-group pragraph-block">
        <textarea id="aboutMe" placeholder="Ваш текст напишите здесь" maxlength="500" :class="['block_neutral pl-4 py-3 col-12 mr-3 mb-4']" @input="changeAbout($event)" :value="about"></textarea>
        <div class="max-length text-center py-1">{{charactersLeft}}/ 500</div>
      </div>
    </div>
</template>

<script>
import Vue from 'vue'
import Phone from '@/components/creator-forms/steps/Phone'
export default {
  props: ['status'],
  data: function () {
    return {
      errorMessage1: '',
      errorMessage2: '',
      current: '',
      bufEmail: '',
      maxFileSize: 3153827,
      file_errors: {},
      validateEmail: {},
      VALID_EMAIL_REG: /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }
  },
  methods: {
    changeCurrent (i) {
      this.current = this.current === i ? -1 : i
    },
    changeDocName (e, i) {
      this.$store.commit('CHANGE_CERTIFICATE_NAME', {
        num: i,
        val: e.target.value
      })
    },
    readAsButton (e, index) {
      let reader = new FileReader()
      let input = $(e.target)[0].files[0]
      reader.onload = e => {
        this.$store.commit('CHANGE_CERTIFICATES', {
          num: index,
          val: e.target.result
        })
      }
      if (
        input.size > this.maxFileSize ||
        (input.type.indexOf('image/png') === -1 &&
          input.type.indexOf('image/jpeg') === -1 &&
          input.type.indexOf('application/pdf') === -1)
      ) {
        Vue.set(
          this.file_errors,
          'error' + index,
          input.size > this.maxFileSize
            ? 'Файл больше 3МБ!'
            : 'Неккоректный формат файла'
        )
        this.$store.commit('CHANGE_CERTIFICATES', {
          num: index,
          val: ''
        })
      } else {
        Vue.set(this.file_errors, 'error' + index, '')
        reader.readAsDataURL(input)
      }
      this.$forceUpdate()
    },
    addNewDoc () {
      for (let key in this.docs) {
        if (!this.docs[key].name || !this.docs[key].file.length) {
          this.errorMessage1 = 'У вас уже существует пустой блок'
          return
        }
      }
      this.$store.commit('ADD_NEW_CERTIFICATE')
    },
    updateEmail (e, index) {
      if (this.bufEmail) {
        this.$store.commit('CHANGE_REFERENCE_INFO', {
          index: index,
          property: 'email',
          val: ''
        })
      }
      this.bufEmail = e.target.value
      if (!this.VALID_EMAIL_REG.test(e.target.value)) {
        this.validateEmail['email' + index] = false
      } else {
        this.validateEmail['email' + index] = true
      }
      this.$forceUpdate()
    },
    passPhone (value) {
      this.$store.commit('CHANGE_REFERENCE_INFO', {
        index: value.num,
        property: 'phone',
        val: value.phone
      })
    },
    changeRef (e, field, index) {
      if (this.validateEmail['email' + index]) {
        let value =
          field.indexOf('canCall') >= 0
            ? !this.recommendations['reference' + index].canCall
            : e.target.value
        this.bufEmail = ''
        this.$store.commit('CHANGE_REFERENCE_INFO', {
          index: index,
          property: field,
          val: value
        })
      }
    },
    addNewRef () {
      this.$store.commit('ADD_NEW_REFERENCE')
    },
    changeAbout (e) {
      this.$store.commit('CHANGE_ABOUTME', e.target.value)
    }
  },
  computed: {
    about: function () {
      return this.$store.state.resume.additional.aboutMe.val
    },
    charactersLeft: function () {
      return (
        500 -
        (this.$store.state.resume.additional.aboutMe.val.length > 0
          ? this.$store.state.resume.additional.aboutMe.val.length
          : 0)
      )
    },
    docs: {
      get: function () {
        let p = this.$store.state.resume.additional.docs
        return p
      }
    },
    recommendations: {
      get: function () {
        let p = this.$store.state.resume.additional.references
        for (let i = 0; i < Object.keys(p).length; i++) {
          this.file_errors['error' + i] = ''
          this.validateEmail['email' + i] = true
        }
        return p
      }
    },
    statuses: function () {
      let list = {}
      for (let k = 0; k < Object.keys(this.recommendations).length; k++) {
        if (k === this.current) {
          list['status' + k] = true
        } else {
          list['status' + k] = false
        }
      }
      return list
    }
  },
  components: {
    Phone
  }
}
</script>

<style lang='scss' scoped>
@import "../../../assets/styles/global";
input[type="radio"]:checked ~ label > div,
input[type="checkbox"]:checked ~ label > div {
  background: $btn_blue_text url("../../../assets/step_icons/checked.svg")
    no-repeat;
  background-size: contain;
  border: 1px solid $btn_blue_text;
}
.simple-svg-wrapper {
  transition: 0.3s;
}
#doc_picker ~ label {
  background: none !important;
}
label[for="doc_picker"] {
  background: none;
  border: 1px dashed $block_grey_outline;
  span {
    color: $main_black;
  }
}
label[for="doc_picker"]:hover {
  overflow: hidden;
  border: 1px solid $btn_blue_text;
  background: $btn_blue_inactive;
  h6,
  h6 {
    color: $btn_blue_text;
    transition: 0.2s;
  }
}
#aboutMe {
  height: 20vh;
}
</style>