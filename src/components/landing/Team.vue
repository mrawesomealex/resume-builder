<template>
    <div class="container-fluid">
       <unreg-head></unreg-head> 
       <div id="message" class="row">
            <div class="container">
                <h1 class="mb-4 col-12 px-xl-5 px-lg-5 px-md-5 px-sm-0 px-1 ">Вас привествуют строители резюме!</h1>
                <p class=" offset-xl-1 offset-lg-1 offset-md-1 offset-sm-0 offset-xs-0 col-xl-10 col-lg-10 col-md-10 col-sm-12 col-12 px-xl-5 px-lg-5 px-md-0 px-sm-0 px-0">
                    Мы - это команда энтузиастов, стоящая за созданием комфортного инструмента, которым вы можете пользоваться уже сегодня. Процесс создания идеального инструмента для вас всегда находиться в процессе улучшения.
                    Уже совсем скоро мы откроем набор сотрудников для расширения возможностей нашего сервиса. Будь в курсе, присоединяйся к нам в соцсетях, будь частью команды ResumeBuilder!
                </p>
            </div>
       </div>
       <div id="jobs" class="row py-5 block_neutral">
           <ul class="container">
               <li id="nothing" v-if="!this.jobs.length">
                   <img src="../../assets/images/job-search-icon.svg" class="mx-auto pt-5 pb-4 d-block col-xl-1 col-lg-1 col-md-2 col-sm-2 col-2">
                   <p id="nothing-p">На данный момент вакансий не обнаружено</p>
                </li>
               <li v-for="(i,job) in this.jobs" :key="i">
                   {{job}}
               </li>
           </ul>
       </div>
    </div>
</template>

<script>
import UnregHead from "@/components/UnregHead"

export default {
  name: "team",
  data: function () {
      return {
          jobs: []
      }
  },
  components: {
    UnregHead
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

#message{
    display: flex;
    align-items: center;
    text-align: center;
    padding-top: 10vh;
    height: 50vh;
}
#jobs{
    height: 35vh;
    border-radius: 0px;
}
h1 {
  font-family: $Playfair;
  font-weight: 700;
  font-size: 2.7vw;
  transition: 0.3s;
}
ul{
    list-style: none;
    padding: 0;
}
#nothing{
    align-items: center;
    text-align: center;
    #nothing-p{
        font-weight: 600;
        opacity: .5;
    }
}
@media (max-width: 1500px) {
  p,
  p > a {
    font-size: 1.2vw;
  }
}
@media (max-width: 990px) {
        h1 {
      font-size: 3.4vw;
    }
      p,
  p > a {
    font-size: 1.5vw;
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
}
@media (max-width: 570px) {
    #message{
      padding-top: 30px; 
       height: 70vh; 
    }
   h1 {
      margin-top: 5vh;
      font-size: 5.5vw;
    }
      p,
  p > a {
    font-size: 3.4vw;
  }
}
</style>