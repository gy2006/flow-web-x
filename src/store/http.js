import axios from 'axios'
import store from './index'

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

const getAttachment = (response) => {
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
}

instance.interceptors.response.use(
  // on response
  (response) => {
    let fileName = getAttachment(response)

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

export default {
  host: url,
  token: token,
  call: instance,
  code: code,

  setToken: (token) => {
    requestConfig.headers.Token = token
  },

  get: (url, onSuccess, params) => {
    const config = Object.assign({params: params}, requestConfig)
    return instance.get(url, config).then(({data, file}) => {
      if (file) {
        onSuccess(data, file)
        return
      }
      onSuccess(data)
    })
  },

  post: (url, onSuccess, body, config) => {
    if (!config) {
      config = requestConfig
    }
    return instance.post(url, body, config).then(({data}) => onSuccess(data))
  },

  delete: (url, onSuccess, body) => {
    const config = Object.assign({}, requestConfig)
    if (body) {
      config.data = body
    }
    return instance.delete(url, config).then(({data}) => onSuccess(data))
  }
}
