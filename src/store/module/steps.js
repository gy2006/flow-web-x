// store for steps of selected job

import http from '../http'
import { LogWrapper } from '@/util/logs'

const DefaultLogPageSize = 1000

const state = {
  flow: null,
  buildNumber: null,
  items: [],
  change: {}, // latest updated object needs to watch
  logs: [] // LogWrapper list been loaded
}

const mutations = {
  setJob (state, {flow, buildNumber}) {
    state.flow = flow
    state.buildNumber = buildNumber
  },

  setSteps (state, steps) {
    state.items = steps
  },

  updateStep (state, newStep) {
    for (let i = 0; i < state.items.length; i++) {
      if (state.items[ i ].id === newStep.id) {
        state.items[ i ] = newStep
        state.change = newStep
        return
      }
    }
  },

  updateLogs (state, logs) {
    state.logs = logs
  }
}

const actions = {

  /**
   * Get steps for job
   */
  get ({commit}, {flow, buildNumber}) {
    commit('setJob', {flow, buildNumber})

    let url = 'jobs/' + flow + '/' + buildNumber + '/steps'

    http.get(url, (steps) => {
      commit('setSteps', steps)
    })
  },

  /**
   * Update step instance (step == executedCmd)
   */
  update ({commit}, executedCmd) {
    commit('updateStep', executedCmd)
  },

  loadLogs ({commit}, {cmdId, row}) {
    let url = 'jobs/logs/' + cmdId

    http.get(url, (logPage) => {
      let logs = []

      logPage.content.forEach((data) => {
        logs.push(new LogWrapper(cmdId, data))
      })

      commit('updateLogs', logs)
    }, {page: 0, size: DefaultLogPageSize})
  }
}

export const Store = {
  namespaced: true,
  state,
  mutations,
  actions
}
