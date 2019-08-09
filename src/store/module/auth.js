import http from '../http'
import md5 from 'blueimp-md5'
import jwtDecode from 'jwt-decode'
import moment from 'moment'
import code from '@/util/code'

const state = {
  // raw token
  token: null,

  refreshToken: null,

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
  save (state, {token, refreshToken}) {
    try {
      var decoded = jwtDecode(token)
    } catch (error) {
      return
    }

    state.user = {
      email: decoded.jti,
      role: decoded.role,
      issueAt: moment.unix(decoded.iat),
      expireAt: moment.unix(decoded.exp)
    }
    state.token = token
    state.refreshToken = refreshToken
    state.hasLogin = true

    http.setToken(token)
    localStorage.setItem('token', token)
    localStorage.setItem('refreshToken', refreshToken)
  },

  clean (state) {
    reset(state)
  }
}

const actions = {
  async login ({commit}, {username, password}) {
    let passwordOnMd5 = md5(password, null, false)
    let content = btoa(username + ':' + passwordOnMd5)

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + content
      }
    }

    const onSuccess = (tokens) => {
      commit('save', tokens)
    }

    await http.post('auth/login', onSuccess, null, config)
  },

  async logout ({commit}) {
    const onSuccess = () => {
      commit('clean')
    }
    await http.post('auth/logout', onSuccess())
  },

  // load from storage
  async load ({commit}) {
    let token = localStorage.getItem('token')
    let refreshToken = localStorage.getItem('refreshToken')

    if (!token || !refreshToken) {
      throw {
        code: code.error.auth,
        message: 'tokens are not available'
      }
    }

    try {
      jwtDecode(token)
      commit('save', {token, refreshToken})
    } catch (e) {
      throw {
        code: code.error.auth,
        message: 'Invalid token'
      }
    }
  }
}

export const Store = {
  namespaced: true,
  state,
  mutations,
  actions
}
