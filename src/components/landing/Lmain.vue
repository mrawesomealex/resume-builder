
<template>
    <div class="container-fluid">
         <unreg-head></unreg-head>
         <div id="mainblock" class="row">
             <img id="chart" class="d-xl-block d-lg-block d-md-block d-sm-none d-none" src="../../assets/images/charts.svg">
             <img id="connect" class="d-xl-block d-lg-block d-md-block d-sm-none d-none" src="../../assets/images/connect.svg">
             <img id="trophy" class="d-xl-block d-lg-block d-md-block d-sm-none d-none" src="../../assets/images/trophy.svg">
             <img id="table" class="d-xl-block d-lg-block d-md-block d-sm-none d-none" src="../../assets/images/table.svg">
             <div class="container">
                <h1 class="mb-4 col-12 px-xl-5 px-lg-5 px-md-5 px-sm-0 px-1">Резюме - ваша визитная карточка, ваше первое представление работодателю </h1>
                <p class=" offset-xl-1 offset-lg-1 offset-md-1 offset-sm-0 offset-xs-0 col-xl-10 col-lg-10 col-md-10 col-sm-12 col-12 px-xl-5 px-lg-5 px-md-0 px-sm-0 px-0">Resume Builder – современный, удобный в использовании конструктор резюме. Простой, но также одновременно многофункциональный и отвечающий всем требованиям, сервис позволит Вам выделиться среди прочих соискателей. От работы Вашей мечты Вас отделяют лишь несколько минут, которые Вы потратите на заполнение необходимых форм. Структурируйте Ваше образование, поделитесь опытом работы – и работодатель сам предоставит Вам возможность заниматься любимым делом. Помните, работа по призванию, не мечта, а реальность!</p>
                <button class="mt-5 button">СОЗДАТЬ РЕЗЮМЕ<img  class=" d-xl-inline d-lg-inline d-md-inline d-sm-inline d-none"  src="../../assets/images/up-arrow_white.svg"></button>
             </div>   
         </div>
         <div class="ad_back row">
                <div id="ad_wrap" class="container mx-auto p-0">
                    <div id="advantages" class="ml-0 pl-xl-0 pl-lg-0 pl-md-0 pl-sm-5 pl-5 col-xl-6 offset-lg-2 col-lg-8 offset-md-1 col-md-10 offset-sm-0 col-sm-12 offset-0 col-12">
                        <h3 class="mb-3"><img src="../../assets/images/responsive.svg">УДОБНЫЙ ИНТЕРФЕЙС</h3>
                        <p class="mb-5">Приятное и интуитивно понятное оформление сервиса позволит без труда составить резюме. Заполните необходимые поля – и результат не заставит себя долго ждать</p>
                        <h3 class="mb-3"><img src="../../assets/images/market.svg">СИСТЕМА ЛИЧНОГО УЧЕТА</h3>
                        <p class="mb-5">Следите за всеми изменениями Вашего резюме, просматривайте статистику – всё это вам предоставит сервис Resume Builder.</p>
                        <h3 class="mb-3"><img src="../../assets/images/doc.svg">БОЛЬШОЙ ВЫБОР ШАБЛОНОВ</h3>
                        <p class="">Выделяйтесь из серой массы. Благодаря широкому ассортименту готовых шаблонов, Ваша креативность и нетривиальный подход несомненно будет оценён работодателем.</p>
                    </div>
                    <div class="adv-img col-6 d-xl-flex d-lg-none d-md-none d-sm-none d-none"></div>
                </div>  
         </div>
         <div id="begin" class="row">
            <div class="container py-5">
              <div class="row">
                <div class="col-xl-9 col-lg-9 col-md-9 col-sm-8 col-6 pl-0 pl-xl-0 pl-lg-0 pl-md-0 pl-sm-0 pl-5">
                    <h3 class="text-left d-xl-flex d-lg-flex d-md-flex d-sm-flex d-none">Необходимо срочно создать резюме? </h3>
                    <p>Приступай к созданию без регистрации прямо сейчас</p>
                </div>
                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-5 pr-0 text-right">
                    <button id="btn-second_create" class="my-0 button">СОЗДАТЬ РЕЗЮМЕ<img class=" d-xl-inline d-lg-inline d-md-inline d-sm-inline d-none" src="../../assets/images/up-arrow_white.svg"></button>
                </div>
               </div> 
            </div>
         </div>
         <div id="reviews" class="py-5 row">
            <div class="container pl-0">
              <div class="row">
                <div @click="ChangeSlide" id="controls" class="col-1 d-xl-block d-lg-block d-md-block d-sm-none d-none pl-0 text-center ">
                    <img id="up" src="../../assets/images/up-arrow.svg"/>
                    <h3  id="label" class="p-0">ПОКАЗАТЬ ЕЩЕ</h3>
                    <img id="down" src="../../assets/images/up-arrow.svg"/>
                </div>
                <div id="review" class=" offset-xl-1 offset-lg-1 offset-md-1 offset-sm-0 col-xl-10 col-lg-10 col-md-10 col-sm-12 col-12 row pl-5">
                    <div :class="['d-xl-block d-lg-block d-md-block d-md-block d-sm-block d-none col-3 ',reviews[currentSlide].class]"></div>
                    <div class="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-12 pl-5 pr-0">
                        <h1>{{reviews[currentSlide].name}}</h1>
                        <h3 class="mb-4">
                            <span>{{reviews[currentSlide].age}}</span>
                            <span class="divider">.</span>
                            <span id="occupation">{{reviews[currentSlide].occupation}}</span>
                        </h3>
                        <p class="">{{reviews[currentSlide].text}}</p>
                    </div>
                </div>
              </div>  
             </div> 
         </div>
    </div>
</template>

<script>
import UnregHead from '@/components/UnregHead'
export default {
  name: 'landing',
  components: {
    UnregHead
  },
  data: function () {
    return {
      currentSlide: 1,
      interval: null,
      reviews: [
        {
          class: 'anna',
          name: 'Анна Иванова',
          age: '41',
          occupation: 'педагог',
          text: `Я – педагог по образованию. Благодаря сервису Resume Builder я смогла перейти на новый уровень в моей карьере.
                     Спустя несколько дней после формирования резюме, я получила приглашения от престижной гимназии нашего города.`
        },
        {
          class: 'arcadii',
          name: 'Аркадий Петров',
          age: '22',
          occupation: 'повар',
          text: `Всем известно, что соискатель без опыта работы, не самый желанный работник. Однако, благодаря Resume Builder моё
                     резюме и без этого имеет приличный вид, что произвело впечатление на HR достаточно известного ресторана. `
        },
        {
          class: 'maria',
          name: 'Мария Новикова',
          age: '27',
          occupation: 'дизайнер интерьеров',
          text: `После сокращения передо мной стала проблема поиска нового места работы. Resume Builder помог мне сократить время 
                     на составления резюме для его поиска. Особенно порадовал широкий выбор готовых шаблонов.`
        },
        {
          class: 'maxim',
          name: 'Максим Солнцев',
          age: '55',
          occupation: 'адвокат',
          text: `Выйдя на пенсию, я решил подработать. Первым этапом в поиске работы для меня стало составление резюме. 
                     Достаточно сложно скомпоновать многолетний опыт самому, поэтому я с радостью воспользовался данным сервисом.`
        }
      ]
    }
  },
  mounted: function () {
    this.interval = setInterval(() => {
      this.NextSlide()
    }, 5000)
  },
  methods: {
    ChangeSlide: function () {
      clearInterval(this.interval)
      this.NextSlide()
      setTimeout(() => {
        this.interval = setInterval(() => {
          this.NextSlide()
        }, 5000)
      }, 5000)
    },
    NextSlide: function () {
      // eslint-disable-next-line  
      $('#review').css({ opacity: '0' })
      setTimeout(() => {
        if (this.currentSlide === 3) {
          this.currentSlide = 0
        } else {
          this.currentSlide++
        }
      }, 300)
      setTimeout(() => {
        // eslint-disable-next-line  
        $('#review').css({ opacity: '1' })
      }, 600)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/styles/global";

$grey_color: #fcfcfc;

#down {
  transform: rotate(-180deg);
}

a,
.divider,
h3 {
  font-family: $Roboto;
  font-weight: 700;
  font-size: 0.8vw;
  color: $main_black;
  text-align: center;
  transition: 0.2s;
  letter-spacing: 1.1px;
}

button {
  position: relative;
  background: $active;
  color: white;
  border: 1px solid $active;
  transition: 0.3s;

  img {
    right: -15%;
    position: absolute;
    transform: rotate(90deg);
    transition: 0.3s;
  }
}
button:hover {
  padding: 15px 35px 15px 25px;
  background: $active_hover;
  border: 1px solid $active_hover;
  img {
    right: 0%;
  }
}

#mainblock {
  display: flex;
  align-items: center;
  text-align: center;
  height: 100vh;
  padding-top: 9vh;

  button {
    font-weight: 700;
    letter-spacing: 0.3px;
    font-family: $Roboto;
  }
  h1 {
    font-family: $Playfair;
    font-weight: 700;
    font-size: 2.7vw;
    transition: 0.3s;
  }
  img {
    transition:0.3s;
    position: absolute;
  }
  #chart {
    top: 20%;
    left: 4%;
    transform: rotate(15deg);
    width: 9vw;
  }
  #trophy {
    top: 55%;
    right: 12%;
    transform: rotate(-25deg);
    width: 10vw;
  }
  #connect {
    top: 24%;
    right: 2%;
    width: 10vw;
  }
  #table {
    top: 60%;
    left: 7%;
    transform: rotate(-25deg);
    width: 10vw;
  }
}
#reviews{
    min-height: 350px;
} 
@media (max-width: 1700px) {
  #mainblock {
    height: 100vh;
    h1 {
      padding: 0px 140px;
      font-size: 2.9vw;
    }
  }
}
@media (max-width: 1500px) {
  p,
  p > a {
    font-size: 1.2vw;
  }
  #ad_wrap {
    p {
      font-size: 1vw;
    }
  }
  h3 {
    font-size: 1vw;
  }
  #mainblock { 
    #trophy {
      top: 75%;
      right: 12%;
    }
  }
}
@media (max-width: 1200px) {
 #mainblock { 
  #trophy {
    top: 75%;
    right: 12%;
  }
 }
  a {
    font-size: 0.9vw;
  }
  #ad_wrap {
    p {
      font-size: 1.2vw;
    }
  }

}
@media (max-width: 990px) {
  #mainblock {
    h1 {
      font-size: 3.4vw;
    }
    #chart {
    top: 17%;
    left: 4%;
  }
  #trophy {
    top: 70%;
    right: 12%;
  }
  #connect {
    top: 24%;
    right: 2%;
  }
  #table {
    top: 80%;
    left: 7%;
  }
  }
  p,
  p > a {
    font-size: 1.5vw;
  }
  #ad_wrap {
    p {
      font-size: 1.5vw;
    }
  }
  h3 {
    font-size: 1.3vw;
  }
  #btn-second_create {
    padding: 15px 15px;
  }
}
@media (max-width: 767px) {
  #mainblock {
    h1 {
      margin-top: 5vh;
      font-size: 4vw;
    }
  }
  p,
  p > a {
    font-size: 2.3vw;
  }
  #ad_wrap {
    p {
      font-size: 2vw;
    }
  }
  h3 {
    font-size: 2.1vw;
  }

}
@media (max-width: 570px) {
  #mainblock {
    padding-bottom: 50px;
    h1 {
      margin-top: 5vh;
      font-size: 5.5vw;
    }
  }
  h3 {
    font-size: 3vw;
  }
  p,
  p > a {
    font-size: 3.4vw;
  }
  #ad_wrap {
    p {
      font-size: 2.8vw;
    }
  }
  #btn-second_create {
    padding: 15px 10px;
  }
  
  #reviews{
      min-height: 410px;
  }
}
.ad_back {
  border-top: 1px solid $block_grey_outline;
  background: $grey_color;
}
#advantages {
  border-radius: 6px 0px 0px 6px;
  padding: 50px;
  h3 {
    text-align: left;
  }
  .divider {
    color: $active;
  }
}
.adv-img {
  background: url("../../assets/images/chair_and_table_img.jpg") no-repeat;
  background-size: cover;
}
#ad_wrap {
  display: flex;
}
#label {
  margin: 65px 0px;
  text-align: center;
  transform: rotate(-90deg);
}
.block_neutral {
  background: $grey_color;
}
#controls {
  user-select: none;
}
#controls:hover {
  #label {
    margin: 70px 0px 60px;
    color: $active;
  }
}
#begin {
  border-top: 1px solid $block_grey_outline;

  button {
    font-weight: 700;
    letter-spacing: 0.2px;
    font-family: $Roboto;
  }
  h3 {
    font-family: $Roboto;
    text-transform: uppercase;
  }
}
#reviews {
  border-top: 1px solid $block_grey_outline;
  background: $grey_color;
}
#review {
  transition: 0.3s;
  .anna {
    background: url("../../assets/images/reviewers/anna.png") no-repeat;
    background-size: contain;
  }
  .arcadii {
    background: url("../../assets/images/reviewers/arcadii.png") no-repeat;
    background-size: contain;
  }
  .maria {
    background: url("../../assets/images/reviewers/maria.png") no-repeat;
    background-size: contain;
  }
  .maxim {
    background: url("../../assets/images/reviewers/maxim.png") no-repeat;
    background-size: contain;
  }
  p {
    text-align: justify !important;
  }
  h1 {
    font-family: $Playfair;
    font-weight: 700;
    color:$main_black;
  }
  h3 {
    text-align: left;
  }
  #occupation,
  .divider {
    color: $active;
  }
  #occupation {
    text-transform: uppercase;
  }
}
</style>
