import http from '../http'

const state = {
  items: [],
  updated: {}, // updated agent received
  selected: {}
}

const mutations = {
  reload (state, agents) {
    state.items = agents
  },

  update (state, updatedAgent) {
    state.updated = updatedAgent

    for (let agent of state.items) {
      if (agent.id !== updatedAgent.id) {
        continue
      }

      Object.assign(agent, updatedAgent)
      break
    }
  },

  select (state, agent) {
    state.selected = agent
  }
}

const actions = {
  list ({commit}) {
    http.get('agents', (agents) => {
      commit('reload', agents)
    })
  },

  update ({commit}, agent) {
    commit('update', agent)
  },

  select ({commit}, agent) {
    commit('select', agent)
  }
}

export const Store = {
  namespaced: true,
  state,
  mutations,
  actions
}
