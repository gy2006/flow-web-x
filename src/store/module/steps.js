// store for steps of selected job

import http from '../http'

const state = {
  flow: null,
  buildNumber: null,
  items: [],
  change: {}, // status change object needs to watch
}

const mutations = {
  setJob(state, {flow, buildNumber}) {
    state.flow = flow
    state.buildNumber = buildNumber
  },

  setSteps(state, steps) {
    state.items = steps
  },

  updateStep(state, newStep) {
    for (let i = 0; i < state.items.length; i++) {
      if (state.items[i].id === newStep.id) {
        state.items[i] = newStep
        state.change = newStep
        return
      }
    }
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
  update({commit}, executedCmd) {
    commit('updateStep', executedCmd)
  }
}

export const Store = {
  namespaced: true,
  state,
  mutations,
  actions
}
