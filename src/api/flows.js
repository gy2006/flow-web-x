import Config from './config'
import axios from 'axios'

const rootUrl = `${Config.host}/flows`
const state = {
  items: [],
  error: null,
  name: '',
  editor: ''
}

const mutations = {
  list (state, res) {
    state.items = res
  },
  name (state, res) {
    state.name = res
  },
  editor (state, res) {
    state.editor = res
  },
  delete (state, u) {
    const url = `${rootUrl}/${u}`
    axios.delete(url).then(
      (response) => {
        return response
      },
      (error) => {
        return error
      }
    )
  }
}

const actions = {
  list ({commit}) {
    const url = `${rootUrl}`
    return new Promise(async (resolve, reject) => {
      const res = await axios.get(url)
      if (res === null) return
      commit('list', res.data.data)
      resolve()
    })
  },
  editor ({commit}, args) {
    commit('editor', args)
  },
  name ({commit}, args) {
    commit('name', args)
  },
  delete ({commit}, args) {
    commit('delete', args)
  }
}

/**
 * Export action in text
 */
export const Actions = {
  'List': 'flows/list',
  'Delete': 'flows/delete',
  'Name': 'flows/name',
  'Editor': 'flows/editor'
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
