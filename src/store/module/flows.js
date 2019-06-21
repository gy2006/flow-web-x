import http from '../http'

const state = {
  items: [],
  editor: '',
  selected: {
    name: undefined,
    yml: ''
  },
  created: undefined, // created flow object with pending status
  sshRsa: {publicKey: '', privateKey: ''}, // created ssh-rsa
  isExist: undefined, // result from action 'exist'
  gitTestMessage: undefined  // git test message update
}

const mutations = {
  updateExist (state, isExist) {
    state.isExist = isExist
  },

  updateCreated (state, flow) {
    state.created = flow
  },

  updateSshRsa (state, rsaKeyPair) {
    state.sshRsa = rsaKeyPair
  },

  updateGitTest (state, gitTestMessage) {
    state.gitTestMessage = gitTestMessage
  },

  select (state, name) {
    state.selected.name = name
  },

  setYml (state, yml) {
    state.selected.yml = yml
  },

  list (state, items) {
    state.items = items
  },

  editor (state, res) {
    state.editor = res
  }
}

const actions = {
  async create ({commit}, name) {
    await http.post('flows/' + name, (flow) => {
      commit('updateCreated', flow)
    })
  },

  async createSshRsa ({commit, state}, email) {
    await http.post('credentials/rsa/only', (rsaKeyPair) => {
      commit('updateSshRsa', rsaKeyPair)
    }, {name: email})
  },

  exist ({commit}, name) {
    http.get('flows/' + name + '/exist', (boolVal) => {
      commit('updateExist', boolVal)
    })
  },

  reset ({commit}) {
    commit('updateExist', undefined)
  },

  select ({commit}, flow) {
    commit('select', flow.name)
  },

  list ({commit}) {
    http.get('flows', (list) => {
      commit('list', list)
    })
  },

  async gitTestStart ({commit}, flow) {
    await http.post('flows/' + flow.name + '/git/test',
      () => {
      },
      {
        gitUrl: flow.gitUrl,
        privateKey: flow.ssh.privateKey
      })
  },

  gitTestUpdate ({commit}, gitTestMessage) {
    commit('updateGitTest', gitTestMessage)
  },

  loadYml ({commit, state}, name) {
    if (!name) {
      return
    }

    http.get('flows/' + name + '/yml', (base64Yml) => {
      commit('setYml', atob(base64Yml))
    })
  },

  saveYml ({commit, state}, {name, yml}) {
    if (!name || !yml) {
      return
    }

    http.post('flows/' + name + '/yml',
      () => {
        commit('setYml', yml)
      },
      {
        data: btoa(yml)
      })
  },

  editor ({commit}, args) {
    commit('editor', args)
  }
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
