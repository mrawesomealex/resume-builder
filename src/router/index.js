import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/landing/Lmain'
import Team from '@/components/landing/Team'
import Terms from '@/components/landing/TermOfUse'

//  Forms
import FormTemplate from '@/components/creator-forms/FormTemplate'

import Preferences from '@/components/creator-forms/steps/Preferences'
import Basic from '@/components/creator-forms/steps/BasicInfo'
import Education from '@/components/creator-forms/steps/Education'
import Skills from '@/components/creator-forms/steps/Skills'
import Experience from '@/components/creator-forms/steps/Experience'
import Additional from '@/components/creator-forms/steps/AdditionalInfo'

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
      component: FormTemplate,
      children: [
        {
          path: 'preferences',
          component: Preferences
        },
        {
          path: 'basic',
          component: Basic
        },
        {
          path: 'education',
          component: Education
        },
        {
          path: 'skills',
          component: Skills
        },
        {
          path: 'experience',
          component: Experience
        },
        {
          path: 'additional',
          component: Additional
        }
      ]
    }
  ]
})
