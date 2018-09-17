import Config from './config'
// import Vue from 'vue'
import axios from 'axios'

const rootUrl = `${Config.host}/flows`
const state = {
  items: [],
  error: null
}

const mutations = {
  list (state) {
    const url = `${rootUrl}`
    axios({
      method: 'get',
      url: url,
      headers: { 'Token': 'helloflowciadmin' }
    }).then(
      (response) => {
        console.log(response)
        state.items = response.body
      },
      (error) => {
        console.log(error)
        state.error = error
      }
    )
  }
}

const actions = {
  list ({commit}) {
    commit('list')
  }
}

/**
 * Export action in text
 */
export const Actions = {
  'List': 'flows/list'
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
