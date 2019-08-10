import axios from 'axios'
import store from './index'
import jwtDecode from 'jwt-decode'
import moment from 'moment'
import code from '../util/code'

const url = process.env.VUE_APP_API_URL
const token = process.env.VUE_APP_TOKEN

// config axios default instance
const instance = axios.create({
  baseURL: `${url}`,
  timeout: 10000
})

const requestConfig = {
  headers: {
    'Token': token,
    'Content-Type': 'application/json'
  }
}

const helper = {
  getAttachment: (response) => {
    const cd = response.headers[ 'content-disposition' ]

    if (cd === undefined) {
      return null
    }

    // attachment; filename="demo-#107-init.log"
    let index = cd.indexOf('filename=')

    if (index === -1) {
      return null
    }

    return cd.substring(index + 'filename='.length)
      .replace('"', '')
      .replace('"', '')
  },

  isTokenRefreshRequest: (config) => {
    return config.url === 'auth/refresh'
  },

  isLoginRequest: (config) => {
    return config.url === 'auth/login'
  },

  hasToken: (config) => {
    let token = config.headers.Token
    return !!(token && token.length > 0)
  },

  tokenHasExpired: (config) => {
    let token = config.headers.Token
    let decoded = jwtDecode(token)
    let expAt = moment.unix(decoded.exp)
    return expAt.isBefore(moment())
  }
}

/**
 * Interceptor to handle token expired or missing
 */
instance.interceptors.request.use(
  (config) => {
    console.log('[http] request to : ' + config.url)

    if (helper.isTokenRefreshRequest(config)) {
      return config
    }

    if (helper.isLoginRequest(config)) {
      return config
    }

    // cancel and rise 401 error if request needs a token but not provided
    if (!helper.hasToken(config)) {
      const error = {
        code: code.error.auth,
        message: '[http] token is missing on request'
      }
      store.commit('err/set', error)
      return false
    }

    if (helper.tokenHasExpired(config)) {
      const error = {
        code: code.error.auth,
        message: '[http] token is expired'
      }
      store.commit('err/set', error)
      return false
    }

    return config
  }
)

/**
 * Interceptor to handle the response data
 */
instance.interceptors.response.use(
  // on response
  (response) => {
    let fileName = helper.getAttachment(response)

    if (fileName) {
      return {
        data: response.data,
        file: fileName
      }
    }

    const apiMsg = response.data

    if (apiMsg.code !== code.ok) {
      return Promise.reject({
        code: apiMsg.code,
        message: apiMsg.message
      })
    }

    return {data: apiMsg.data}
  },

  // on error which not with 200
  (error) => {
    store.commit('err/set', {
      code: code.fatal,
      message: error.message
    })
  }
)

const handleResponse = (r, onSuccess) => {
  if (!r) {
    return
  }

  let {data, file} = r
  file ? onSuccess(data, file) : onSuccess(data)
}

const http = {
  host: url,
  token: token,
  call: instance,
  code: code,

  setToken: (token) => {
    requestConfig.headers.Token = token
  },

  get: (url, onSuccess, params) => {
    const config = Object.assign({params: params}, requestConfig)
    return instance.get(url, config).then((r) => {
      handleResponse(r, onSuccess)
    })
  },

  post: (url, onSuccess, body, config) => {
    if (!config) {
      config = requestConfig
    }
    return instance.post(url, body, config).then((r) => {
      handleResponse(r, onSuccess)
    })
  },

  delete: (url, onSuccess, body) => {
    const config = Object.assign({}, requestConfig)
    if (body) {
      config.data = body
    }
    return instance.delete(url, config).then((r) => {
      handleResponse(r, onSuccess)
    })
  }
}

export default http
