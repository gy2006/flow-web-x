import http from '../http'
import md5 from 'blueimp-md5'
import jwtDecode from 'jwt-decode'
import moment from 'moment'

const state = {
  // raw token
  token: null,

  // decoded from token
  user: {},

  hasLogin: false
}

const reset = (state) => {
  state.user = {}
  state.token = null
  state.hasLogin = false

  http.setToken('')
  localStorage.removeItem('token')
}

const mutations = {
  save (state, token) {
    try {
      var decoded = jwtDecode(token)
    } catch (error) {
      return
    }

    let user = {
      email: decoded.jti,
      role: decoded.role,
      issueAt: moment.unix(decoded.iat),
      expireAt: moment.unix(decoded.exp)
    }

    // error:
    if (user.expireAt.isBefore(moment())) {
      console.log('Token has expired')
      reset(state)
      return
    }

    state.user = user
    state.token = token
    state.hasLogin = true

    http.setToken(token)
    localStorage.setItem('token', token)
  },

  clean (state) {
    reset(state)
  }
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
      commit('save', token)
    }

    await http.post('auth/login', onSuccess, null, config)
  },

  async refresh ({commit}) {
    const onSuccess = (token) => {
      commit('save', token)
    }
    await http.post('auth/refresh', onSuccess())
  },

  async logout ({commit}) {
    const onSuccess = () => {
      commit('clean')
    }
    await http.post('auth/logout', onSuccess())
  },

  load({commit}) {
    let token = localStorage.getItem('token')
    if (!token) {
      return
    }
    commit('save', token)
  }
}

export const Store = {
  namespaced: true,
  state,
  mutations,
  actions
}
