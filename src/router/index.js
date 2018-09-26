import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import CreateFlow from '@/components/CreateFlow/Index'
import Jobs from '@/components/Jobs/Index'
import Yml from '@/components/Yml/Index'
import JobDetail from '@/components/JobDetail/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/flows/create',
      name: 'CreateFlow',
      component: CreateFlow
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
    }
  ]
})
