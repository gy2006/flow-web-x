/**
 * Agent host module
 */

import http from '../http'

const state = {
  items: [],
  loaded: null
}

const mutations = {
  reload (state, hosts) {
    state.items = hosts
  },

  loaded (state, host) {
    state.loaded = host
  },

  add (state, newOrUpdated) {
    for (let host of state.items) {
      if (host.id === newOrUpdated.id) {
        Object.assign(host, newOrUpdated)
        return
      }
    }
    state.items.push(newOrUpdated)
  },

  remove (state, deletedHost) {
    for (let i = 0; i < state.items.length; i++) {
      if (state.items[i].id === deletedHost.id) {
        state.items.splice(i, 1)
        return;
      }
    }
  },
}

const actions = {
  async list ({commit}) {
    await http.get('hosts', (hosts) => {
      commit('reload', hosts)
    })
  },

  async createOrUpdate ({commit}, obj) {
    await http.post('hosts/ssh', (host) => {
      commit('add', host)
    }, obj)
  },

  async get ({commit}, name) {
    await http.get(`hosts/${name}`, (host) => {
      commit('loaded', host)
    })
  }
}

export const Store = {
  namespaced: true,
  state,
  mutations,
  actions
}
