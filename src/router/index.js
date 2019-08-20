import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/view/Home/Login'
import Home from '@/view/Home/Index'

import FlowSettings from '@/view/Flow/Settings'

import JobDetail from '@/view/Job/Detail'
import JobList from '@/view/Job/List'

import SettingsHome from '@/view/Settings/Home'
import SettingsProfileHome from '@/view/Settings/Profile/Index'

import SettingsUsersHome from '@/view/Settings/Users/Index'
import SettingsUsersNew from '@/view/Settings/Users/New'
import SettingsUsersEdit from '@/view/Settings/Users/Edit'

import SettingsAgentHome from '@/view/Settings/Agent/Index'
import SettingsAgentEdit from '@/view/Settings/Agent/Edit'

import SettingsCredentialHome from '@/view/Settings/Credential/Index'
import SettingsCredentialNew from '@/view/Settings/Credential/New'
import SettingsCredentialEdit from '@/view/Settings/Credential/Edit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
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
          name: 'SettingsProfileHome',
          component: SettingsProfileHome
        },
        {
          path: 'users',
          name: 'SettingsUsersHome',
          component: SettingsUsersHome
        },
        {
          path: 'users/new',
          name: 'SettingsUsersNew',
          component: SettingsUsersNew
        },
        {
          path: 'users/edit',
          name: 'SettingsUsersEdit',
          component: SettingsUsersEdit,
          props: true
        },
        {
          path: 'agents',
          name: 'SettingsAgentHome',
          component: SettingsAgentHome
        },
        {
          path: 'agents/:category',
          name: 'SettingsAgentEdit',
          component: SettingsAgentEdit
        },
        {
          path: 'agents/:category/:name',
          name: 'SettingsAgentEdit',
          component: SettingsAgentEdit
        },

        {
          path: 'credentials',
          name: 'SettingsCredentialHome',
          component: SettingsCredentialHome
        },
        {
          path: 'credentials/new',
          name: 'SettingsCredentialNew',
          component: SettingsCredentialNew,
          props: true
        },
        {
          path: 'credentials/edit/:name',
          name: 'SettingsCredentialEdit',
          component: SettingsCredentialEdit,
          props: true
        }
      ]
    }
  ]
})
