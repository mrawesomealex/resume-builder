<template>
    <div class="container-fluid">
        <creator-header></creator-header>
        <div id="content" class="row">
           <div class="container pt-5">
                <nav class="white_block row ">
                    <router-link 
                        @click.native="Change(key)"
                        v-for="(item,key) in nav_links" :key="key"
                        :class="['col-2', current[key] ? 'current' : '', done[key] ? 'done' : '', error[key] ? 'form_error' : '']"  
                        :to="item.path">
                        <div v-if="!done[key]" :class="item.class"></div>
                        <img v-if="done[key]" src="../../assets/step_icons/check.svg"/>
                        <span class="d-xl-inline d-lg-inline d-md-inline d-sm-none d-none">{{item.content}}</span>
                    </router-link >
                </nav>
                <div id="form" class="row white_block pt-4">
                    <h3  v-for="(item,key) in nav_links" :key="key" v-if="current[key]" class="pt-3 pb-4 container-fluid d-xl-none d-lg-none d-md-none d-sm-block d-block">{{item.content}}</h3>
                    <router-view></router-view>
                    <div id="controls" class="container-fluid py-4">
                        <router-link tag="button" :disabled="current[0] ? true : false" to="" class="button blue"><a>Предыдущий шаг</a></router-link>
                        <router-link tag="button" :disabled="current[5] ? true : false" to="" class="button blue"><a>Перейти далее</a></router-link>
                    </div>
                </div>   
           </div>  
        </div>
    </div>
</template>

<script>
import CreatorHeader from '@/components/creator-forms/UnregAppHead'

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
      ]
    }
  },
  methods: {
    Change: function (k) {
      for (let i = 0; i < this.nav_links.length; i++) {
        if (i === k) {
          this.$store.commit('CHANGE_STEP', i)
        }
      }
    }
  },
  computed: {
    current () {
      return this.$store.state.builder.currentStage
    },
    done () {
      return this.$store.state.builder.done
    },
    error () {
      return this.$store.state.builder.error
    }
  },
  components: {
    CreatorHeader
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

$button-grey: #fcfcfc;
    h3{
        font-family: $Roboto;
        text-align: center;
        font-weight: 400;
        color:$btn_blue_text
    }
    a{
        font-family: $Roboto;
        color: $paragraphcolor;
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
    nav{
        display: flex;
        height: 8.5vh;
        margin-bottom: 2vh;
        margin-top: 5vh;

        a{
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.3s;
        }
        a:not(:last-child){
            border-right: 1px solid $grey;
        }
        a:before{
            content: '';
            left:-100%;
            position: absolute;
            height: 4px;
            width:100%;   
            transition: left 0.3s cubic-bezier(.33,.99,.48,1.01) ;                 
        }
        a:hover{
            background: $button-grey;
        }
        div{
            height: 50px;
            width: 40px;
        }

        .current{
            color: $btn_blue_text;

            .suitcase{
                background: url('../../assets/step_icons/bsuitcase.svg') no-repeat;
            }
            .dialogue{
                background: url('../../assets/step_icons/bdialogue.svg') no-repeat;    
            }
            .graduate{
                background: url('../../assets/step_icons/bgraduate.svg') no-repeat;
            }
            .star{
                background: url('../../assets/step_icons/bstar.svg') no-repeat;
            }
            .time{
                background: url('../../assets/step_icons/btime.svg') no-repeat;
            }
            .plus{
                background: url('../../assets/step_icons/bplus.svg') no-repeat;    
            }            
        }
        .current:before{
            background:  $btn_blue_text;
            top:0;  
            left:0;
        }
        .current:hover{
            background: $btn_blue_inactive ;
        }
        .form_error{
            color: $active;

            .suitcase{
                background: url('../../assets/step_icons/rsuitcase.svg') no-repeat;
            }
            .dialogue{
                background: url('../../assets/step_icons/rdialogue.svg') no-repeat;    
            }
            .graduate{
                background: url('../../assets/step_icons/rgraduate.svg') no-repeat;
            }
            .star{
                background: url('../../assets/step_icons/rstar.svg') no-repeat;
            }
            .time{
                background: url('../../assets/step_icons/rtime.svg') no-repeat;
            }
            .plus{
                background: url('../../assets/step_icons/rplus.svg') no-repeat;    
            }            
        }
        .form_error:before{
            background:  $active;
            top:0;  
            left:0;
        }
        .form_error:hover{
            background: $btn_red_inactive;
        }
        a.done{
            color: $done;
            background:$button-grey ;
        }
        .done:before{
            top:0; 
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
        box-shadow: $shadow_light;
    }
    #controls{
        display: flex;
        align-items: center;
        background: $button-grey;
        border-top: 1px solid $grey;
        .blue:last-child{
            font-family: $Roboto;
            margin-left: auto
        }
        .blue{
            a{
               color:$btn_blue_text;
            }
        }
        .blue:hover{
            a{
                color: white;
            }
        }
        .blue[disabled = "disabled"]{
            a{
             color: $paragraphcolor;
             cursor: default;
            }
        }
    }
    @media (max-width: 1200px){
        nav{
            font-size: 10pt;
        }
    }
    @media (max-width:992px) and (min-width: 768px) {
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
            margin-top: 10vh;
            box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
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
            top:3.9vh;
            z-index: 2;
            box-shadow: 0 2px 5px 0px rgba($color: #000000, $alpha: 0.05);
        }
    }
    @media (max-width: 320px){
        nav{
            a{
                padding: 0;
            }
        }
    }
</style>