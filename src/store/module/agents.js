import http from '../http'

const state = {
  items: []
}

const mutations = {
  update (state, agents) {
    state.items = agents
  }
}

const actions = {
  list ({commit}) {
    http.get('agents', (agents) => {
      commit('update', agents)
    })
  }
}

export const Store = {
  namespaced: true,
  state,
  mutations,
  actions
}
