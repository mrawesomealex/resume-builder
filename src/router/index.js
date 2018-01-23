import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/landing/Lmain'
import Team from '@/components/landing/Team'
import Terms from '@/components/landing/TermOfUse'
import FormTemplate from '@/components/creator-forms/FormTemplate'

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
      component: Landing
    },
    {
      path: '/team',
      name: 'team',
      component: Team
    },
    {
      path: '/terms',
      name: 'terms',
      component: Terms
    },
    {
      path: '/creator',
      name: 'creator',
      component: FormTemplate
    }
  ]
})
