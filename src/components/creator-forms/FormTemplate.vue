<template>
    <div class="container-fluid">
        <creator-header @RequestMain="OpenMain"></creator-header>
        <confirm-window @closeRemoveWindow ="CancelRemove()" :removeItem="rItem"  v-if="confirmOpen"></confirm-window> 
        <div id="content" class="row">
           <div class="container pt-5">
                 <nav id="navigation" class="white_block row ">
                    <a @click="Change(key, step, 1)"
                        v-for="(item,key) in nav_links" :key="key"
                        :class="['col-2', { current: steps['step'+key].current && $router.history.current.path.search('print')  !== -1, 
                                            done: steps['step'+key].done, 
                                            form_error: steps['step'+key].error,
                                            'no-border': steps['step'+(key+1)] ? (((steps['step'+key].error &&  steps['step'+(key+1)].error) || (steps['step'+key].done &&  steps['step'+(key+1)].done)) && !steps['step'+key].current && !steps['step'+(key+1)].current) || $router.history.current.path.search('print')  !== -1: false
                    }]">
                        <div v-if="!steps['step'+key].done" :class="item.class"></div>
                        <img v-if="steps['step'+key].done" src="../../assets/step_icons/check.svg"/>
                        <span class="d-xl-inline d-lg-inline d-md-inline d-sm-none d-none">{{item.content}}</span>
                    </a>                                         
                </nav>
                <div id="wrap"></div>
                <div id="form" class="row white_block">
                    <h3 @click="Open_Menu()"  v-for="(item,key) in nav_links" :key="key" v-if="steps['step'+key].current && $router.history.current.path.search('print')  === -1" :class="['container-fluid d-xl-none d-lg-none d-md-none d-sm-flex d-flex text-left py-0', {menuOpen: mobile_subMenu},{fixed: fixedSub}]">
                        <header class="container-fluid d-flex  px-3 pt-sm-2 py-4 align-middle">
                            <simple-svg class="d-flex open-menu ml-3 mr-2" :stroke="'none'" fill="#4b92e2" :filepath="require('@/assets/step_icons/menu.svg')" :width="'25px'" :height="'25px'"/>
                            <span class="d-flex ml-0">{{item.content}}</span>
                        </header>
                        <ul v-if="$router.history.current.path.search('print') === -1" id="mobile_anchors" class="pl-5 ml-4 pt-2">
                                <li :class="['row py-2 pl-4', {current: (!steps['step'+step].error && steps['step'+step].current) || (steps['step'+step].current && point.status)}, {done: steps['step'+step].done && point.status}, {errorLink: steps['step'+step].error && !point.status}]" v-for="(point, key) in list" :key="key" >
                                    <a class="col-12" v-scroll-to="point.link"><span v-if="steps['step'+step].error && !point.status">! </span>{{key}}</a>
                                    <ul class="pt-2 pb-3" v-if="Object.keys(point).length" :key="key">
                                        <li v-if="skey !== 'link' && skey !== 'status'" :class="['row py-2 pl-4', {current: (!steps['step'+step].error && steps['step'+step].current) || (steps['step'+step].current && item.status)}, {done: steps['step'+step].done && item.status}, {errorLink: steps['step'+step].error && !item.status}]" 
                                            v-for="(item, skey) in point" :key="skey">
                                            <a v-scroll-to="item.link"><span v-if="steps['step'+step].error && !item.status">! </span>{{skey}}</a>
                                        </li>                                    
                                    </ul>
                                </li>
                        </ul>
                    </h3>
                    <div :class="['d-flex pt-xl-0 pt-lg-0 pt-md-0 mt-xl-0 mt-lg-0 mt-md-0',  $router.history.current.path.search('print')  === -1 ? 'pt-sm-5 pt-5 mt-sm-5 mt-5' : 'pt-sm-0 pt-0 mt-sm-0 mt-0']">
                        <input v-if="$router.history.current.path.search('print')  === -1" id="open-menu" class="d-none" type="checkbox">
                        <div v-if="$router.history.current.path.search('print')  === -1" id="menu-trigger" :class="['d-xl-flex d-lg-flex d-md-flex d-sm-none d-none',
                                                       {menu_current : steps['step'+step].current && !steps['step'+step].error && !steps['step'+step].done },
                                                       {menu_complete: steps['step'+step].done},{menu_error: steps['step'+step].error}]" @click.self="ForceClose()"> 
                            <label id="btn-open" for="open-menu">
                                <simple-svg class="d-flex" :stroke="'none'" :fill="menu_btn_status" :filepath="require('@/assets/step_icons/menu.svg')" :width="'25px'" :height="'25px'"/>
                            </label>
                            <ul id="anchors" class="container-fluid ml-3">
                                <li :class="['row py-2 pl-xl-4 pl-lg-4 pl-md-2', {current: (!steps['step'+step].error && steps['step'+step].current) || (steps['step'+step].current && point.status)}, {done: steps['step'+step].done && point.status}, {errorLink: steps['step'+step].error && !point.status}]" v-for="(point, key) in list" :key="key" >
                                    <a v-scroll-to="point.link"><span v-if="steps['step'+step].error && !point.status">! </span>{{key}}</a>
                                    <ul v-if="Object.keys(point).length" :key="key">
                                        <li v-if="skey !== 'link' && skey !== 'status'" :class="['row py-2 pl-4', {current: (!steps['step'+step].error && steps['step'+step].current) || (steps['step'+step].current && item.status)}, {done: steps['step'+step].done && item.status}, {errorLink: steps['step'+step].error && !item.status}]" 
                                            v-for="(item, skey) in point" :key="skey">
                                            <a v-scroll-to="item.link"><span v-if="steps['step'+step].error && !item.status">! </span>{{skey}}</a>
                                        </li>                                    
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <router-view @click.native="ForceClose()" @remove="Confirmation($event)" @formSideMenu="SideMenuGenerator" :status="steps" class="pt-5 pl-xl-5 pl-lg-4 pl-md-4 pr-5 pl-sm-4 pl-4 "></router-view>
                    </div>
                    <div id="controls" class="container-fluid py-4">
                        <button v-if="$router.history.current.path.search('print')  === -1" :disabled="steps.step0.current ? true : false" @click="Change(previous, step, 1)" class="button blue"><a>Предыдущий шаг</a></button>
                        <button v-if="!steps.step5.current && $router.history.current.path.search('print')  === -1" @click="Change(next,step, 0)" class="button blue"><a>Перейти далее</a></button>
                        <router-link
                            :to="!steps.step0.done ||  !steps.step1.done || !steps.step2.done || !steps.step3.done || !steps.step4.done || !steps.step5.done ? '' : '/creator/print'"
                            tag="button"
                            v-if="steps.step5.current && $router.history.current.path.search('print')  === -1"
                            :disabled="!steps.step0.done ||  !steps.step1.done || !steps.step2.done || !steps.step3.done || !steps.step4.done || !steps.step5.done"
                            @click="Change(next,step, 0)"
                            class="button blue">
                        <a>Создать резюме</a>
                        </router-link>
                        <div v-if="$router.history.current.path.search('print')  > -1" class="container col-xl-5 col-lg-6 col-md-8 ">
                            <button class="ml-auto button blue"><a>Напечатать резюме</a></button>
                            <button id="PDFExport" class="button blue"><a>Экспорт в PDF</a></button>
                        </div>
                    </div>
                </div>   
           </div>  
        </div>
    </div>
</template>

<script>
import CreatorHeader from '@/components/creator-forms/UnregAppHead'
import ConfirmWindow from '@/components/creator-forms/Confirmation'

export default {
  data: function () {
    return {
      nav_links: [
          {class: 'suitcase', content: 'Предпочтения', path: '/creator/preferences'},
          {class: 'dialogue', content: 'Основное', path: '/creator/basic'},
          {class: 'graduate', content: 'Образование', path: '/creator/education'},
          {class: 'star', content: 'Навыки', path: '/creator/skills'},
          {class: 'time', content: 'Опыт работы', path: '/creator/experience'},
          {class: 'plus', content: 'Прочее', path: '/creator/additional'}
      ],
      confirmOpen: false,
      rItem: '',
      mobile_subMenu: false,
      fixedSub: false,
      list: {}
    }
  },
  methods: {
    CancelRemove: function () {
      this.confirmOpen = !this.confirmOpen
      this.rItem = ''
    },
    Confirmation: function (arg) {
      this.rItem = arg
      this.confirmOpen = !this.confirmOpen
    },
    Change: function (k, last, type) {
      let isValidated
      let firstError = -1
      if (k === last) { return }
      if (k < last) {
        isValidated = this.Validate(last)
      }
      for (let i = k - 1; i >= 0; i--) {
        isValidated = this.Validate(i)
        if (!isValidated) {
          firstError = i
        }
      }
      if ((isValidated && firstError === -1) || type) {
        this.$store.commit('CHANGE_STEP', {
          from: last,
          next: k
        })
        this.$router.replace(this.nav_links[k].path)
      } else {
        this.$store.commit('CHANGE_STEP', {
          from: last,
          next: firstError
        })
        this.$router.replace(this.nav_links[firstError].path)
      }
      this.$scrollTo('#content')
    },
    Validate: function (k) {
      let step = this.nav_links[k].path.substr(9)
      this.$store.commit('VALIDATE_STEP', step)
      if (this.$store.state.resume[step].validated) {
        this.$store.commit('CHANGE_DONE', k)
        return true
      } else {
        this.$store.commit('CHANGE_ERROR', k)
        return false
      }
    },
    OpenMain: function () {
      if (!this.$store.state.user.current) {
        this.Change(0, this.steps, 1)
      }
    },
    ForceClose: function () {
      if (document.getElementById('open-menu')) {
        if (document.getElementById('open-menu').checked) {
          document.getElementById('open-menu').checked = false
        }
      }
    },
    Open_Menu: function () {
      this.mobile_subMenu = !this.mobile_subMenu
    },
    SideMenuGenerator: function (list) {
      this.list = list
    }
  },
  beforeCreate: function () {
    // для незарегистрированных пользователей
    this.$router.replace('/creator/preferences')
  },
  created: function () {
    window.addEventListener('scroll', () => {
      this.fixedSub = false
      let scroll = $(window).scrollTop()
      if (scroll >= 137 && $(window).width() > 575) {
        let width = $('#form').width()
        $('#form>h3').width(width)
        this.fixedSub = true
      } else {
        if (scroll > 1500 && $(window).width() < 575 && !$('#form>h3').hasClass('hideBlock')) {
          $('#form>h3').addClass('hideBlock')
        } else if (scroll < 1500 && $('#form>h3').hasClass('hideBlock')) {
          $('#form>h3').removeClass('hideBlock')
        }
        this.fixedSub = false
      }
      scroll >= 140 ? $('#btn-open').addClass('fixed') : $('#btn-open').removeClass('fixed')
    })
    // TEST DATA
    this.$store.commit('INPUT_TEST')
    this.$router.replace('/creator/print')
  },
  computed: {
    step: function () {
      return this.$store.state.builder.currentStep
    },
    steps: function () {
      return this.$store.state.builder.steps
    },
    previous: function () {
      return this.$store.state.builder.currentStep ? this.$store.state.builder.currentStep - 1 : 0
    },
    next: function () {
      return this.$store.state.builder.currentStep < Object.getOwnPropertyNames(this.steps).length - 1 ? this.$store.state.builder.currentStep + 1 : 0
    },
    last: function () {
      return this.$store.state.builder.lastStep
    },
    menu_btn_status () {
      if (this.steps['step' + this.step].current && !this.steps['step' + this.step].error && !this.steps['step' + this.step].done) {
        return '#4b92e2'
      }
      if (this.steps['step' + this.step].error) {
        return '#ef4136'
      }
      if (this.steps['step' + this.step].done) {
        return '#43b27a'
      }
    }
  },
  components: {
    CreatorHeader,
    ConfirmWindow
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

#PDFExport{
    float: right;
}
#anchors{
    opacity: 0;
    transition: 0.3s;
    width: 14vw;
    visibility: hidden;
    height: 480px;
    ul{
        font-size: 10pt;
        padding: 0;
        li.current{
            a{ color: $btn_blue_text }
        }
    }
            li.done{
         a {color: $done!important;}
        }
}
#anchors::-webkit-scrollbar{
    width: 0px;
}
#mobile_anchors{
    position: absolute;
    opacity: 0;
    transition: opacity 0.2s;
    margin-top: 90px;
    font-size: 14pt;
    ul{
        font-size: 10pt;
    }
    li.current{
            a{ color: $btn_blue_text }
    }
    li.errorLink{
            a {color: $active!important;}
    }
    li.done{
         a {color: $done!important;}
    }
}
#anchors,
#mobile_anchors{
    list-style-type: none;
    font-family: $Roboto;
    a:hover{
      transition: opacity 0s;
      opacity: .6;
    }
}
$button-grey: #fcfcfc;
.hideBlock{
    top: 141.031px;
    animation: top 0.3s forwards;
}
.open-menu{
    justify-self:flex-end; 
    transition: 0.3s;
}
#menu-trigger{
    flex-direction: column;
    z-index: 3;
    min-width:5%;
    border-top-left-radius: 6px; 
    transition: 0.2s;
    overflow: hidden;
    cursor: pointer;
    label{
        cursor: pointer;
        height: 55px;
        width:55px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    box-shadow:none;
}
input[type="checkbox"]:checked~#menu-trigger{
    min-width: 20%;
    #anchors{
        opacity: 1;
        transition-delay: 0.2s;
        visibility:visible;
    }
}
.menu_error{
   background: $btn_red_inactive;
}
.menu_current{
   background: $btn_blue_inactive;
}

.menu_complete{
   background: #f3f8f5;
}

.fixed{
    position: fixed;
    top: 83px;
    height: 100%;
    transition: min-width 0s;
}
.fixed~#anchors{
    position: fixed;
    top: 148px;
    overflow-y: scroll;
    overflow-x: hidden;
}
h3{
    flex-direction: column
}
h3.fixed{
    height: 100px;
    transition: 0.3s;
}
h3.menuOpen{
  #mobile_anchors{
    opacity: 1;
  }
}
h3.fixed.menuOpen{
    width:inherit;
    height: 270px;
    overflow-y: scroll;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
}

    h3{
        position: absolute;
        z-index: 3;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        font-family: $Exo;
        text-align: center;
        font-weight: 400;
        height: 100px;
        color:$btn_blue_text;
        padding : 7% 0px;
        border-bottom: 1px solid $divider;
        background:$button-grey; 
        transition: 0.3s;
        header{
            height: 110.63px !important;
            margin-right: 32.5vw !important;
            width:inherit;
            span{
                animation: appear 0.3s forwards;
            }
        }
        .simple-svg-wrapper{
            padding: 15px;
            border-radius: 100%;
        }
    }
    h3.menuOpen:not(.fixed){
        height: 84vh;
        header{
            height: 25%;
            transition-delay: 0.3s;
        }
    }
    a:hover{
        text-decoration: none;
    }
    #content{
        transition: all 0.3s;
        padding:25px 0px;
        display: flex;
        align-items: center;
        min-height: 100vh;
        background: $back;
    }
    nav.white_block{
        border: 1px solid $block_grey_outline
    }

    nav{
        position: relative;
        display: flex;
        overflow: hidden;
        height: 8.5vh;
        margin-bottom: 2vh;
        margin-top: 5vh;
        z-index: 10;
        a{
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.3s;
            font-family: $Roboto;
            font-weight: 400;
            background-size: contain;
        }
        a:not(.current):not(.form_error){
            color: $paragraphcolor;
        }
        a:not(:last-child){
            border-right: 1px solid $grey;
        }
        a:before{
            content: '';
            left:-100%;
            top:0;
            position: absolute;
            height: 4px;
            width:100%;   
            transition: left 0.3s cubic-bezier(.33,.99,.48,1.01) ;                 
        }
        a:hover{
            background: $button-grey;
        }
        div,
        img{
            height: 50px;
            width: 40px;
        }

        .no-border{
            border-right: none !important;
        }
        .form_error{
            span{        
                color: $active !important;
            }
            .suitcase{
                background: url('../../assets/step_icons/rsuitcase.svg') no-repeat !important;
            }
            .dialogue{
                background: url('../../assets/step_icons/rdialogue.svg') no-repeat !important;    
            }
            .graduate{
                background: url('../../assets/step_icons/rgraduate.svg') no-repeat !important;
            }
            .star{
                background: url('../../assets/step_icons/rstar.svg') no-repeat !important;
            }
            .time{
                background: url('../../assets/step_icons/rtime.svg') no-repeat !important;
            }
            .plus{
                background: url('../../assets/step_icons/rplus.svg') no-repeat !important;    
            }            
        }
        .form_error:before{
            background:  $active;
            left:0;
        }
        .form_error:hover{
            background: $btn_red_inactive;
        }
        a.current{
            span{
                color: $btn_blue_text !important;
            }
            .suitcase{
                background: url('../../assets/step_icons/bsuitcase.svg') no-repeat !important;
            }
            .dialogue{
                background: url('../../assets/step_icons/bdialogue.svg') no-repeat !important;    
            }
            .graduate{
                background: url('../../assets/step_icons/bgraduate.svg') no-repeat !important;
            }
            .star{
                background: url('../../assets/step_icons/bstar.svg') no-repeat !important;
            }
            .time{
                background: url('../../assets/step_icons/btime.svg') no-repeat !important;
            }
            .plus{
                background: url('../../assets/step_icons/bplus.svg') no-repeat !important;   
            }            
        }
        .current:before{
            background:  $btn_blue_text;  
            left:0;
        }
        .current:hover{
            background: $btn_blue_inactive ;
        }
        a.done{
            span{ 
                color: $done !important;
            }
            background:$button-grey ;
        }
        .done:before{
            left:0;
            background: $done;
        }
        .done:hover{
            background: rgb(252, 255, 252);
        }
        .check_line{
              stroke-dasharray: 5;
              stroke-dashoffset: 3;
        }
        .suitcase{
            background: url('../../assets/step_icons/suitcase.svg') no-repeat;
        }
        .dialogue{
            background: url('../../assets/step_icons/dialogue.svg') no-repeat;    
        }
        .graduate{
            background: url('../../assets/step_icons/graduate.svg') no-repeat;
        }
        .star{
            background: url('../../assets/step_icons/star.svg') no-repeat;
        }
        .time{
            background: url('../../assets/step_icons/time.svg') no-repeat;
        }
        .plus{
            background: url('../../assets/step_icons/plus.svg') no-repeat;    
        }
    }
    #form{
        display: flex;
        flex-direction: column;
        position: relative;
        overflow-x: hidden;
        min-height: 70vh;
        border: 1px solid $block_grey_outline;
        box-shadow: $shadow_light;
    }
    #controls{
        display: flex;
        align-items: center;
        background: $block_grey_fill;
        border-top: 1px solid $grey;
        .blue:last-child{
            font-family: $Roboto;
            margin-left: auto
        }
        .blue{
            background: $btn_blue_text;
            border: 1px solid $btn_blue_text;
            a{
               color: white;
            }
        }
        .blue:hover{
            background: $blue_filled_hover
        }
        .blue[disabled = "disabled"]{
            background: $grey;
            border: 1px solid $block_grey_outline;
            a{   
             color: $paragraphcolor;
             cursor: default;
            }
        }
    }
    #wrap{
        position: absolute;
        background: rgba(90, 90, 121, 0.062);
        z-index: 0;
        width:100%;
        height: 25vh;
        left:0;
        top:0px;
    }
    li.current{
        a, a:hover{
          color: $btn_blue_text;
        }
    }
    li.done{
        a, a:hover{
          color: $done;
        }  
    }
    #anchors li.errorLink{
        a, a:hover{
          color: $active;
        }  
    }
    @media (min-width: 1600px) {
        #anchors{
            width: 12vw;
            padding-left: 0px;
        }    
    }
    @media (max-width: 1200px){
        nav{
            font-size: 10pt;
        }
        #menu-trigger{
            min-width:6%;
        }
        #anchors{
            width: 16vw;
        }
    }
    @media (max-width:992px) and (min-width: 768px) {
    #anchors{
        list-style-type: none;
        width: 12vw;
        font-size: 10pt;
        ul{
            font-size: 8pt;
        }
        li{
            margin-top: 20px;
        }
    }
    #menu-trigger{
      min-width:8%;
    }
        nav{
            line-height: 2px;
            a{
                display: flex;
                flex-direction: column;
                padding-bottom: 15px;
            }
            div{
                width: 32px;
            }
        }
    }
    @media (max-width: 768px){

        nav{
            div{
                width: 32px;
            }
        }
    }

    @media (max-width: 575px){
        .white_block{
            border-radius: 0px;
        }
        #form{ 
            margin-top: 8vh;
            box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
        }
        .step{
           margin-top: 6vh; 
        }
        #controls{
            display: flex;
            flex-direction:column;
            height:28%;
            .blue{
                margin: 20px;
                width:100%;
            }
            .blue:last-child{
                margin: 0;
            }
        }
        nav{
            position: fixed;
            width: 100%;
            top:4vh;
            z-index: 4;
            border-top: none !important;
            border-left:none !important;
            border-right: none !important;
            box-shadow: 0 1px 10px 0px rgba($color: #000000, $alpha: 0.1);
        }
        h3{
            position: fixed;
            left:0px
        }
    }
    @media (max-width: 320px){
        nav{
            a{
                padding: 0;
            }
        }
    }
    @keyframes appear {
        0%{
            opacity: 0;
        }
        100%{
            width: 100%;
            opacity: 1;
        }
    }
    @keyframes top {
        0%{
           top: 141.031px;
        }
        100%{ 
            top: 65px;
        }
    }
</style>