import http from '../http'

const state = {
  items: [],
  editor: '',
  selected: {obj: {}, yml: ''},
  created: undefined, // created flow object with pending status
  sshRsa: {publicKey: '', privateKey: ''}, // created ssh-rsa
  isExist: undefined, // result from action 'exist'
  gitTestMessage: undefined,  // git test message update
  gitBranches: [],
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

  updateGitBranches (state, branchList) {
    state.gitBranches = branchList
  },

  select (state, flow) {
    state.selected.obj = flow
  },

  setYml (state, yml) {
    state.selected.yml = yml
  },

  list (state, items) {
    state.items = items
  },

  add (state, newFlow) {
    state.items.push(newFlow)
  },

  delete (state, name) {
    state.items = state.items.filter((val, _index, _array) => {
      return val.name !== name
    })
  },

  editor (state, res) {
    state.editor = res
  }
}

const actions = {
  async create ({commit}, name) {
    await http.post(`flows/${name}`, (flow) => {
      commit('updateCreated', flow)
    })
  },

  async createSshRsa ({commit, state}, email) {
    await http.post('credentials/rsa/only', (rsaKeyPair) => {
      commit('updateSshRsa', rsaKeyPair)
    }, {name: email})
  },

  async gitTestStart ({commit}, wrapper) {
    const url = `flows/${wrapper.name}/git/test`
    await http.post(url,
      () => {
      },
      {
        gitUrl: wrapper.gitUrl,
        privateKey: wrapper.ssh ? wrapper.ssh.privateKey : '',
        credential: wrapper.credential
      })
  },

  async confirm ({commit}, wrapper) {
    const promiseArray = []

    if (wrapper.hasGitUrl) {
      promiseArray.push(http.post(
        `flows/${wrapper.name}/variables`,
        () => {
          console.log('[DONE]: add variables')
        },
        wrapper.variables
        )
      )
    }

    if (wrapper.hasSSH) {
      promiseArray.push(http.post(
        `flows/${wrapper.name}/credential/rsa`,
        () => {
          console.log('[DONE]: setup credential')
        },
        wrapper.ssh
        )
      )
    }

    promiseArray.push(http.post(
      `flows/${wrapper.name}/confirm`,
      (flow) => {
        console.log('[DONE]: confirmed')
        commit('add', flow)
      }
      )
    )

    await Promise.all(promiseArray)
  },

  async delete ({commit, state}, name) {
    await http.delete(`flows/${name}`, () => {
      commit('delete', name)
      commit('select', {obj: {}, yml: ''})
    })
  },

  gitBranches ({commit}, name) {
    const url = `flows/${name}/git/branches`
    http.get(url, (branches) => {
      commit('updateGitBranches', branches)
    });
  },

  exist ({commit}, name) {
    http.get(`flows/${name}/exist`, (boolVal) => {
      commit('updateExist', boolVal)
    })
  },

  reset ({commit}) {
    commit('updateExist', undefined)
  },

  select ({commit, state}, name) {
    for (let flow of state.items) {
      if (name === flow.name) {
        commit('select', flow)
        return
      }
    }

    http.get(`flows/${name}`, (flow) => {
      commit('select', flow)
    })
  },

  list ({commit}) {
    http.get('flows', (list) => {
      commit('list', list)
    })
  },

  gitTestUpdate ({commit}, gitTestMessage) {
    commit('updateGitTest', gitTestMessage)
  },

  loadYml ({commit, state}, name) {
    if (!name) {
      return
    }

    http.get(`flows/${name}/yml`, (base64Yml) => {
      commit('setYml', atob(base64Yml))
    })
  },

  saveYml ({commit, state}, {name, yml}) {
    if (!name || !yml) {
      return
    }

    http.post(`flows/${name}/yml`,
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
