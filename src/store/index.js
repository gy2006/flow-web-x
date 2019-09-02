import Vue from 'vue'
import Vuex from 'vuex'

import { Store as AuthStore } from './module/auth'
import { Store as ErrorStore } from './module/error'
import { Store as FlowStore } from './module/flows'
import { Store as JobStore } from './module/jobs'
import { Store as StepStore } from './module/steps'
import { Store as LogStore } from './module/logs'
import { Store as AgentStore } from './module/agents'
import { Store as CredentialStore } from './module/credentials'
import { Store as UserStore } from './module/users'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    'auth': AuthStore,
    'err': ErrorStore,
    'flows': FlowStore,
    'jobs': JobStore,
    'steps': StepStore,
    'logs': LogStore,
    'agents': AgentStore,
    'credentials': CredentialStore,
    'users': UserStore
  }
})

export default store

export function errorCommit (code, message, data) {
  store.commit('err/set', {
    code,
    message,
    data
  })
}

export function newTokenCommit (newToken, refreshToken) {
  store.commit('auth/save', {token: newToken, refreshToken: refreshToken})
}
