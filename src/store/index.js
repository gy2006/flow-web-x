import Vue from 'vue'
import Vuex from 'vuex'

import { Store as FlowStore } from './module/flows'
import { Store as SocketStore } from './module/socket'
import { Store as JobsStatus } from './module/jobs'
import { Store as JobStepsStatus } from './module/steps'

import subscribe from './subscribe'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    'flows': FlowStore,
    'socket': SocketStore,
    'jobs': JobsStatus,
    'steps': JobStepsStatus
  }
})

subscribe(store)

export default store
