import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/landing/Lmain'
import Team from '@/components/landing/Team'
import Terms from '@/components/landing/TermOfUse'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: to => {
        return '/'
      }
    },
    {
      path: '/',
      name: 'landing',
      component: Landing,
    },
    {
      path:'/team', 
      name:'team',
      component: Team
    },
    {
      path: '/terms',
      name:'terms',
      component:Terms
    }
  ]
})
