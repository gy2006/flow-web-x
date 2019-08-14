import http from '../http'
import md5 from 'blueimp-md5'

const state = {
  items: [] // user list
}

const mutations = {

}

const actions = {
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
