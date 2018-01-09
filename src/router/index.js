import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/landing/Lmain'

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
    }
  ]
})
