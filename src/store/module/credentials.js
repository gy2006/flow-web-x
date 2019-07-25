import http from '../http'

const state = {
  items: [],
  loaded: {}
}

const mutations = {
  add (state, credential) {
    state.items.push(credential)
  },

  list (state, credentials) {
    state.items = credentials
  }
}

const actions = {
  list ({commit}) {
    http.get('credentials', (c) => {
      commit('list', c)
    })
  },

  async create ({commit}, credential) {
    await http.post('credentials/rsa', (c) => {
      commit('add', c)
    }, credential)
  }
}

export const Store = {
  namespaced: true,
  state,
  mutations,
  actions
}