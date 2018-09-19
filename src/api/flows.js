import Config from './config'
import axios from 'axios'

const rootUrl = `${Config.host}/flows`
const state = {
  items: [],
  error: null,
  name: ''
}

const mutations = {
  list (state, res) {
    state.items = res
  },
  name (state, res) {
    state.name = res
  },
  create (state, u) {
    const url = `${rootUrl}/${u}`
    axios.post(url).then(
      (response) => {
        return response
      },
      (error) => {
        return error
      }
    )
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
  name ({commit}, args) {
    commit('name', args)
  },
  create ({commit}, args) {
    commit('create', args)
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
  'Create': 'flows/create',
  'Delete': 'flows/delete',
  'Name': 'flows/name'
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
