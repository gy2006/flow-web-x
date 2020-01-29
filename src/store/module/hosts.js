/**
 * Agent host module
 */

import http from '../http'

const state = {
  items: [],
}

const mutations = {
  reload (state, agents) {
    state.items = agents
  }
}

const actions = {
  async list ({commit}) {
    await http.get('hosts', (hosts) => {
      commit('reload', hosts)
    })
  },
}

export const Store = {
  namespaced: true,
  state,
  mutations,
  actions
}
