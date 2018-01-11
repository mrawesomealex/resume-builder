<template>
<div class="container-fluid">
    <footer class="row px-5 py-4 text-center">
                <ul class="order-2 col-xl-2 col-lg-2 col-md-2 col-sm-6 col-12  text-left pl-xl-5 ">
                    <router-link  tag='li' to='/'><a v-scroll-to="'#mainblock'">О Продукте</a></router-link>
                    <router-link  tag='li' to='/'><a href='/' v-scroll-to="'#advantages'">Приемущества</a></router-link>
                    <router-link tag='li' to='/team'><a>Команда</a></router-link>
                    <router-link  tag='li' to='/'><a href='/' v-scroll-to="'#reviews'">Отзывы</a></router-link>
                </ul>
                <ul class="pl-xl-0 pl-lg-0 pl-md-0 pl-sm-0 pl-3 order-xl-1 order-lg-1 order-md-1 order-sm-3 order-3 col-3 col-xl-2 col-lg-3 col-md-3 col-sm-6 col-12 text-left ">
                    <router-link tag='li' to=''><a>Инструкция пользователя</a></router-link>
                    <router-link tag='li' to='/terms'><a>Условия пользования</a></router-link>
                    <li><a href="https://firebase.google.com/docs/hosting/">Наш хостинг</a></li>
                    <router-link tag='li' to='/team'><a>Открытые вакансии</a></router-link>
                </ul>
                <span id="copyright" class="order-xl-3 order-lg-3 order-md-3 order-sm-1 col-4 col-xl-4 col-lg-2 col-md-2 col-sm-12 col-12 mt-2 mb-5 order-1 pr-md-5">RESUMEBUILDER &#169; 2018</span>
                <ul class="order-5 contacts col-xl-2 col-lg-2 col-md-2 col-sm-6 col-6 text-left mr-lg-0 pl-xl-5 pl-lg-5  pl-md-2 ">
                    <li class="name"><img src="../assets/images/phone.svg" class="pr-2">Контакты</li>
                    <li>+38050-748-78-10</li>
                    <li>+38067-145-98-12</li>
                    <li>+38063-874-11-36</li>
                </ul>
                <ul class="order-6 socials col-xl-2 col-lg-3 col-md-3 col-sm-6 col-6 text-left pl-xl-5 pl-lg-5  pl-md-5 ">
                    <li><img src="../assets/images/facebook.svg" class="pr-2">ResumeBuilderTeam</li>
                    <li><img src="../assets/images/telegram.svg" class="pr-2">@ResumeBuilder</li>
                    <li><img src="../assets/images/skype.svg" class="pr-2">ResumeBuilder</li>
                    <li><img src="../assets/images/envelope.svg" class="pr-2">RBhelp@gmail.com</li>
                </ul>
    </footer>
</div>    
</template>

<script>
    export default {
      name: 'myfooter'
    }
</script>

<style lang="scss" scoped>
@import "../assets/styles/global";

$footer_color: #838383;

footer {
  background: #2f3030;
  color: $footer_color;
  a {
    color: $footer_color;
    font-family: $Raleway;
    font-weight: 400;
    transition: 0s;
    transition: 0.2s;
    letter-spacing: 1.1px;
  }
  span {
    font-family: $Roboto;
    font-weight: 700;
    letter-spacing: 1px;
    color: white;
  }
  li:hover a {
    color: white;
  }
  ul {
    list-style: none;
    padding: 0;
    font-family: $Roboto;
    font-weight: 300;

    li {
      padding: 5px 0px;
    }
  }
  .contacts {
    font-family: $Roboto;
    font-weight: 300;
  }
  .name,
  .socials {
    font-weight: 300;
    color: white;
  }
  a{
    text-decoration: none;
  }
}
@media (max-width: 1700px) {
  ul:first-child a,
  ul:nth-child(2) a {
    font-size: 0.9vw;
  }
  .socials {
    font-size: 0.9vw;
  }
  .contacts img {
    width: 25px;
  }
  .contacts {
    font-size: 1.017vw;
  }
}
@media (max-width: 1500px) {
  ul:first-child a,
  ul:nth-child(2) a {
    font-size: 1.1vw;
  }
  .socials img {
    width: 25px;
  }
  .socials {
    font-size: 1.017vw;
  }
}
@media (max-width: 1200px) {
  a {
    font-size: 0.9vw;
  }
  #copyright {
    font-size: 0.94vw;
  }
  ul:first-child a,
  ul:nth-child(2) a {
    font-size: 1.3vw;
  }
  .contacts{
    font-size: 1.25vw;
  }
  .socials, .contacts .name{
    font-size: 1.4vw;
  }
}
@media (max-width: 990px) {
  a {
    font-size: 1.2vw;
  }
  ul:first-child a,
  ul:nth-child(2) a {
    font-size: 1.2vw;
  }
  .socials {
    font-size: 1.3vw;
  }
  #copyright {
    font-size: 0.8vw;
  }
}
@media (max-width: 767px) {
  ul{
    padding:4% 0% !important;
    border-top: 0.2px solid rgb(59, 59, 59);
  }
  ul:first-child a,
  ul:nth-child(2) a {
    font-size: 2vw;
  }
  .socials img {
    width: 25px;
  }
  .socials,
  .socials, .contacts .name,
  .contacts {
    font-size: 2vw;
  }

  #copyright {
    font-size: 1.5vw;    
  }
}
@media (max-width: 570px) {
  #copyright {
    font-size: 2vw;
  }  
  ul:first-child a,
  ul:nth-child(2) a,
  .socials,
  .contacts,
  .contacts .name {
    font-size: 3vw;
  }
}
</style>