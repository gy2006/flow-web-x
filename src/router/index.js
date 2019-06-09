import Vue from 'vue'
import Router from 'vue-router'
import FlowSettings from '@/view/Flow/Settings'
import JobDetail from '@/view/Job/Detail'
import JobList from '@/view/Job/List'
import PersonalSetting from '@/view/Admin/PersonalSetting/Index'
import SystemManagement from '@/view/Admin/SystemManagement/Index'
import Credentials from '@/view/Admin/SystemManagement/Credentials/Index'
import Flow from '@/view/Admin/SystemManagement/Flow/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/flows/:id/jobs',
      name: 'Jobs',
      component: JobList
    },
    {
      path: '/flows/:id/settings',
      name: 'FlowSettings',
      component: FlowSettings
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
