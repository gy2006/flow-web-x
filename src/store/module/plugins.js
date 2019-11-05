import http from '../http'

const state = {
  items: [],
  readme: {}
}

const mutations = {
  setItems (state, items) {
    state.items = items
  },

  setReadMe (state, {name, content}) {
    state.readme[name] = content
  },
}

const actions = {
  async list({commit}) {
    await http.get('plugins', (plugins) => {
      commit('setItems', plugins)
    })
  },

  async readme({commit}, name) {
    await http.get(`plugins/${name}/readme`, (contentInBase64) => {
      let content = atob(contentInBase64)
      commit('setReadMe', {name, content})
    })
  }
}

export const Store = {
  namespaced: true,
  state,
  mutations,
  actions
}
