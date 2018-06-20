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

export default {
  state,
  mutations,
  actions
}
