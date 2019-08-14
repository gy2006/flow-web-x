import http from '../http'
import md5 from 'blueimp-md5'

const state = {
  items: [], // user list
  total: 0
}

const mutations = {
  list (state, page) {
    state.items = page.content
    state.total = page.totalElements
  }
}

const actions = {
  listAll ({commit}, {page, size}) {
    const onSuccess = (page) => {
      commit('list', page)
    }
    return http.get('users', onSuccess, {page: page - 1, size})
  },

  async changePassword ({commit}, {old, newOne, confirm}) {
    const onSuccess = () => {}
    await http.post('users/change/password', onSuccess, {
      old: md5(old, null, false),
      newOne: md5(newOne, null, false),
      confirm: md5(confirm, null, false)
    })
  }
}

export const Store = {
  namespaced: true,
  state,
  mutations,
  actions
}
