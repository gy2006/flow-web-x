
const state = {
  SocketClient: null
}

const mutations = {
  SocketClient (state, res) {
    state.SocketClient = res
  }
}

const actions = {
  SocketClient ({commit}, args) {
    commit('SocketClient', args)
  }
}

/**
 * Export action in text
 */
export const Actions = {
  'SocketClient': 'socket/SocketClient'
}

/**
 * Export Vuex store object
 */
export const Store = {
  namespaced: true,
  state,
  mutations,
  actions
}
