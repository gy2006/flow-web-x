import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Jobs from '@/view/Jobs/Index'
import Yml from '@/view/Yml/Index'
import JobDetail from '@/view/JobDetail/Index'
import PersonalSetting from '@/view/Admin/PersonalSetting/Index'
import SystemManagement from '@/view/Admin/SystemManagement/Index'
import Credentials from '@/view/Admin/SystemManagement/Credentials/Index'
import Flow from '@/view/Admin/SystemManagement/Flow/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/flows/:id/jobs',
      name: 'Jobs',
      component: Jobs
    },
    {
      path: '/flows/:id/yml',
      name: 'Yml',
      component: Yml
    },
    {
      path: '/flows/:id/jobs/:num',
      name: 'JobDetail',
      component: JobDetail
    },
    {
      path: '/admin/personalsetting',
      name: 'PersonalSetting',
      component: PersonalSetting
    },
    {
      path: '/admin/systemmanagement',
      name: 'SystemManagement',
      component: SystemManagement,
      children: [
        {
          path: 'credentials',
          component: Credentials
        },
        {
          path: 'flow',
          component: Flow
        }
      ]
    }
  ]
})
