import http from '../http'

const state = {
  items: [],
  loaded: {
    name: '',
    privateKey: '',
    publicKey: ''
  }
}

const mutations = {
  add (state, credential) {
    state.items.push(credential)
  },

  list (state, credentials) {
    state.items = credentials
  },

  loaded (state, credential) {
    state.loaded = credential
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
  },

  get ({commit}, name) {
    http.get(`credentials/${name}`, (c) => {
      commit('loaded', c)
    })
  }
}

export const Store = {
  namespaced: true,
  state,
  mutations,
  actions
}