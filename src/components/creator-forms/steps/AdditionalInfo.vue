<template>
    <div class="container step">
      <h5>Рекомендации</h5>
      <h6>Лица, которые могут составить мнения о ваших професиональных качествах</h6>
      <div id="recommendators" class="row input-group">
        <div  v-for="(person, key, index) in recommendations" :key="key" :class="['container-fluid list-item p-0 ref mb-2',{'mt-0' : index > 0},{open:statuses['status'+index]}]">
            <header class="row p-4" :class="[{errorColor: status.step5.error }]">
              <simple-svg class="d-xl-inline-block d-lg-inline-block d-md-inline-block d-sm-inline-block d-none mx-3" :stroke="'none'" :fill="'#4b92e2'" :filepath="require('@/assets/step_icons/university.svg')"  :width="'25px'" :height="'25px'"/>
              <label for="person_name" class="ml-xl-0 ml-lg-0 ml-md-0 ml-sm-0 ml-3" @click="changeCurrent(index)">
                <span v-if="person.fullName">{{ person.fullName }}</span>
                <span v-if="!person.fullName">{{'Новая рекомендация'}}</span>
                <simple-svg :class="['d-xl-inline-block d-lg-inline-block d-md-inline-block d-sm-inline-block d-none', {'rotated ml-3 mb-2': statuses['status'+index]},{'ml-2 mr-3': !statuses['status'+index]}]" :stroke="'none'" :fill="'#4b92e2'" :filepath="require('@/assets/images/arrow.svg')"  :width="'12px'" :height="'12px'"/>
              </label>
                <div :class="['ml-auto mr-3 my-auto']" @click="$emit('remove',{step:'additional',property:'reference'+index})">
                <simple-svg :stroke="'none'" :fill="'#4b92e2'" :filepath="require('@/assets/step_icons/cancel.svg')"  :width="'25px'" :height="'25px'"/>
                </div>
            </header>
            <transition name="open-window">
                <div v-if="statuses['status'+index]" class="container-fluid newRef_form p-4">
                  <div class="container-fluid">
                      <div class="row align-middle mb-4">
                          <div class="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 pl-0 pr-xl-3 pr-lg-3 pr-md-0 pr-sm-0 pr-0">
                              <input id="person_name" type="text" placeholder="ФИО рекомендующего" :class="['block_neutral col-12 pl-4 py-3 mb-xl-0 mb-lg-0 mb-md-4 mb-sm-4 mb-4',{error : status.step5.error && !person.fullName}]" 
                              :value="person.fullName" @input="changeRefence()"/>
                          </div>    
                          <div class="d-flex col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 text-right mr-0 pr-0 pl-xl-3 pl-lg-3 pl-md-0 pl-sm-0 pl-0 " >
                              <input class="d-none" id="can_call" type="checkbox" value="0" :checked="person.canCall" @change="changeCall()"/>
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
                          <input id="email_value" type="email" placeholder="Укажите email" :class="['block_neutral col-12 pl-4 py-3',{error: !validateEmail['email'+index] && status.step5.error}]" :value="person.email" @change="set_email(index)" @input="update_email(index)"/>
                        </div>
                        <phone :phoneData="person.phone"></phone>
                      </div>
                  </div>
                </div>
            </transition>
        </div>
        <div id="newSkillBtn" :class="['new_btn container-fluid button text-center py-4 mb-2 px-0 mt-4',{error: errorMessage2}]" @click="addNewRef"><span>+ Добавить</span></div>
        <h6 v-if="this.errorMessage2" class="mb-4 error_message">{{errorMessage2}}</h6>   
      </div>
      <h5>Добавьте сертификаты и лицензии</h5>
      <h6>Документ загрузите в формате PDF или картинкой ( JPEG, PNG )</h6>
      <div id="certificates" class="row input-group">
        <div  v-for="(doc, key, index) in docs" :key="key" :class="['container-fluid list-item p-3 mb-1',{'mt-0' : index > 0}]">
          <div class="row"> 
            <div class="col-xl-1 col-lg-1 col-md-1 pl-1 mb-xl-0 mb-lg-0 mb-md-0 mb-sm-3 mb-3">
              <div @click="$emit('remove',{step:'additional',property:'doc'+index})">
                <simple-svg class=" d-inline-block  pl-xl-3 pl-lg-3 pl-md-1 pl-sm-2 pl-2 pr-xl-4 pr-lg-3 pr-md-3 pr-sm-2  pr-2 removeBtn" :stroke="'none'" :fill="status.step5.error && !doc.name ? '#ef4136' : '#4b92e2'" :filepath="require('@/assets/step_icons/cancel.svg')"  :width="'25px'" :height="'25px'"/>
              </div>
            </div>
            <div class="col-xl-11 col-lg-11 col-md-11 col-sm-12 col-12 pr-0">
              <div class="row ml-2">
                <div class="input-wrap col-xl-7 col-lg-7 col-md-10 col-sm-12 col-12 pl-xl-0 pl-lg-0 pl-md-2 pl-sm-2 pl-2 row mb-xl-0 mb-lg-0 mb-md-0 mb-sm-3 mb-3">
                    <input type="text" placeholder="Введите название сертификата или лецензии" :class="['block_neutral col-12  py-3',{error: status.step5.error && !doc.name}]" 
                    :value="doc.name ? doc.name : ''" @input="changeDocName($event, index)"/>
                </div>
                <div class="col-xl-5 col-lg-5 col-md-2 col-sm-12 col-12 pl-xl-4 pl-lg-4 pl-md-4 pl-sm-0 pl-xl-0 pl-lg-0 pl-md-2 pl-sm-2 pl-2 align-middle pr-xl-0 pr-lg-0 pr-md-0 row">  
                  <input id="doc_picker" class="d-none" type="file" accept=".png, .jpg, application/pdf" @change="readAsButton()">
                  <label @dragover.stop.prevent="dragClass=true" @dragleave.stop.prevent="dragClass=false" @drop.stop.prevent="fileHandler($event)" id="drop-zone"  :class="['block_neutral text-left container-fluid mb-0 py-3 ',{drag_zone: dragClass},{error : file_error || (!doc.file && status.step5.error)}]" for="doc_picker">
                    <div class="row">
                      <simple-svg :stroke="'none'" class="d-flex mt-0 mx-3" :fill="dragClass ? '#64a4ee' : 'rgba(41, 41, 43, 0.98)' " :filepath="require('@/assets/step_icons/photo.svg')" :width="'30px'" :height="'30px'" />
                      <h6 @dragover.stop.prevent="dragClass=true"  @drop.stop.prevent="fileHandler($event)" class="mb-0 d-xl-flex d-lg-flex d-md-none d-sm-flex d-flex">Нажмите или перетяните файл</h6>
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
        <!-- @input="changeWorkplace($event,'duties',index)"    
            && !work.duties   
            :value="work.duties" 
            {{charactersLeft1}} / 900-->
        <textarea id="aboutMe" placeholder="Ваш текст напишите здесь" maxlength="500" :class="['block_neutral pl-4 py-3 col-12 mr-3 mb-4',{error : status.step5.error}]"></textarea>
        <div class="max-length text-center py-1">/ 500</div>
      </div>
    </div>
</template>

<script>
import Phone from '@/components/creator-forms/steps/Phone'
    export default {
      props: ['status'],
      data: function () {
        return {
          dragClass: false,
          errorMessage1: '',
          errorMessage2: '',
          file_error: '',
          current: '',
        }
      },
      methods: {
        changeCurrent (i) {
          this.current = this.current === i ? -1 : i
        },
        changeDocName (e,i) {
          
        },
        readAsButton () {

        },
        fileHandler (e) {
          
        },
        addNewDoc () {

        },
        changeReference () {

        },
        update_email (i) {

        },
        addNewRef () {

        },
        changeCall () {

        }
      },
      computed: {
        docs: {
          get: function () {
            let p = this.$store.state.resume.additional.docs
            delete p.not_required
            return p
          },
          set: function (newFlag) {

          }
        },
        recommendations:{
          get: function () {
            let p = this.$store.state.resume.additional.references
            delete p.not_required
            return p
          },
          set: function (newFlag) {

          }
        },
        validateEmail: {
          get: function () {
            let p = {}
            let length = Object.keys(this.recommendations).length
            for ( let i = 0; i < length; i++) {
              p['email' + i] = false
            }
            return p
          }
        },
        statuses: function () {
          let list = {}
          for (let k = 0; k <  Object.keys(this.recommendations).length; k++) {
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
#doc_picker ~label{
  background: none !important;
}
label[for="doc_picker"]{
    background: none;
    border: 1px dashed $block_grey_outline;
    span{
        color: $main_black
    }
}
label[for="doc_picker"]:hover{
    overflow: hidden;
    border: 1px solid $btn_blue_text;
    background: $btn_blue_inactive;
    h6, h6{
        color:$btn_blue_text;
        transition: 0.2s;
    }
}
#aboutMe{
  height: 20vh;
}
</style>