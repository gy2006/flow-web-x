import Vue from 'vue'
import Router from 'vue-router'
import FlowSettings from '@/view/Flow/Settings'
import JobDetail from '@/view/Job/Detail'
import JobList from '@/view/Job/List'

import SettingsHome from '@/view/Settings/Home'
import SettingsProfile from '@/view/Settings/Profile'
import SettingsSecurity from '@/view/Settings/Security'

import SettingsAgent from '@/view/Settings/Agent'
import SettingsAgentEdit from '@/view/Settings/AgentEdit'

import SettingsCredential from '@/view/Settings/Credential'
import SettingsCredentialNew from '@/view/Settings/CredentialNew'
import SettingsCredentialEdit from '@/view/Settings/CredentialEdit'

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
      path: '/settings',
      name: 'Settings',
      component: SettingsHome,
      children: [
        {
          path: 'profile',
          component: SettingsProfile
        },
        {
          path: 'security',
          component: SettingsSecurity
        },
        
        {
          path: 'agents',
          component: SettingsAgent
        },
        {
          path: 'agents/:category',
          component: SettingsAgentEdit
        },
        {
          path: 'agents/:category/:name',
          component: SettingsAgentEdit
        },

        {
          path: 'credentials',
          component: SettingsCredential
        },
        {
          path: 'credentials/new/:category',
          component: SettingsCredentialNew
        },
        {
          path: 'credentials/edit/:name',
          component: SettingsCredentialEdit
        }
      ]
    }
  ]
})
