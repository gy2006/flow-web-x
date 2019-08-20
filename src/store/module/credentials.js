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

  remove (state, credential) {
    for (let i = 0; i < state.items.length; i++) {
      if (state.items[i].id === credential.id) {
        state.items.splice(i, 1)
        return
      }
    }
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

  listNameOnly ({commit}) {
    http.get('credentials/list/name', (c) => {
      commit('list', c)
    })
  },

  async create ({commit}, {name, pair}) {
    await http.post('credentials/rsa', (c) => {
      commit('add', c)
    }, {
      name,
      publicKey: pair.publicKey,
      privateKey: pair.privateKey
    })
  },

  async delete ({commit}, credential) {
    await http.delete(`credentials/${credential.name}`, (c) => {
      commit('remove', c)
    })
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
