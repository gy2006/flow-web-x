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

  add (state, agent) {
    state.items.push(agent)
  },

  remove (state, deletedAgent) {
    for (let i = 0; i < state.items.length; i++) {
      if (state.items[i].id === deletedAgent.id) {
        state.items.splice(i, 1)
        return;
      }
    }
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
  async create({commit}, {name, tags}) {
    await http.post('agents', (agent) => {
      commit('add', agent)
    }, {name: name, tags: tags})
  },

  async delete({commit}, agent) {
    await http.delete('agents', (agent) => {
     commit('remove', agent)
    }, {token: agent.token})
  },

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
