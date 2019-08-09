import axios from 'axios'
import store from './index'
import jwtDecode from 'jwt-decode'
import moment from 'moment'

const url = process.env.VUE_APP_API_URL
const token = process.env.VUE_APP_TOKEN

// config axios default instance
const instance = axios.create({
  baseURL: `${url}`,
  timeout: 10000
})

const code = {
  ok: 200,
  fatal: 500,
  error: {
    default: 400,
    auth: 401,
    args: 402,
    permission: 403,
    not_found: 404,
    not_available: 405,
    duplicate: 406,
    illegal_status: 421,
    json_or_yml: 430
  }
}

const requestConfig = {
  headers: {
    'Token': token,
    'Content-Type': 'application/json'
  }
}

const helper = {
  getAttachment: (response) => {
    const cd = response.headers['content-disposition']

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
      if (helper.isTokenRefreshRequest(config)) {
        return config
      }

      if (helper.isLoginRequest(config)) {
        return config
      }

      // cancel and rise 401 error if request needs a token but not provided
      if (!helper.hasToken(config)) {
        store.commit('err/set', {code: code.error.auth, message: 'token is missing on request'})
        return false
      }

      if (helper.tokenHasExpired(config)) {
        console.log('token is expired before request')
      }

      return config
    },

    (error) => {
      console.log(axios.isCancel(error))
    }
)

/**
 * Interceptor to handle the response data
 */
instance.interceptors.response.use(
    // on response
    (response) => {
      console.log('response===')
      console.log(response)

      let fileName = helper.getAttachment(response)

      if (fileName) {
        return {
          data: response.data,
          file: fileName
        }
      }

      const apiMsg = response.data

      if (apiMsg.code !== code.ok) {
        const err = {
          code: apiMsg.code,
          message: apiMsg.message
        }

        // commit to error store for global error handling
        if (apiMsg.code === code.error.auth) {
          store.commit('err/set', Object.assign({}, err))
          return {data: {}}
        }

        return Promise.reject(err)
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
    return instance.get(url, config).then((r) => { handleResponse(r, onSuccess) })
  },

  post: (url, onSuccess, body, config) => {
    if (!config) {
      config = requestConfig
    }
    return instance.post(url, body, config).then((r) => { handleResponse(r, onSuccess) })
  },

  delete: (url, onSuccess, body) => {
    const config = Object.assign({}, requestConfig)
    if (body) {
      config.data = body
    }
    return instance.delete(url, config).then((r) => { handleResponse(r, onSuccess) })
  }
}

export default http
