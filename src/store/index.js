import Vue from 'vue'
import Vuex from 'vuex'

import { Store as FlowStore } from './module/flows'
import { Store as JobStore } from './module/jobs'
import { Store as StepStore } from './module/steps'
import { Store as LogStore } from './module/logs'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    'flows': FlowStore,
    'jobs': JobStore,
    'steps': StepStore,
    'logs': LogStore
  }
})

export default store
