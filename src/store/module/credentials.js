import http from '../http'

const state = {
  items: [],
  loaded: {}
}

const mutations = {
  list (state, credentials) {
    state.items = credentials
  }
}

const actions = {
  list ({commit}) {
    http.get('credentials', (credentials) => {
      commit('list', credentials)
    })
  }
}

export const Store = {
  namespaced: true,
  state,
  mutations,
  actions
}