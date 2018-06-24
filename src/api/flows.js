import Config from './config'
import Vue from 'vue'

const rootUrl = `${Config.host}/flows`

const state = {
  items: [],
  error: null
}

const mutations = {
  list (state) {
    const url = `${rootUrl}`
    Vue.http.get(url).then(
      (response) => {
        state.items = response.body
      },
      (error) => {
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
