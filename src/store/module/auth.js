import http from '../http'
import md5 from 'blueimp-md5'

const mutations = {

}

const state = {

}

const actions = {
  async login ({commit}, {username, password}) {
    let passwordOnMd5 = md5(password, null, false)
    let content = btoa(username + ":" + passwordOnMd5)

    const config = {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Basic " + content
      }
    }

    const onSuccess = (token) => {
      console.log(token)
    }

    await http.post('auth/login', onSuccess, null, config)
  },

  refresh ({commit}) {

  },

  logout ({commit}) {

  }
}

export const Store = {
  namespaced: true,
  state,
  mutations,
  actions
}
