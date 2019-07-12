import axios from 'axios'
import store from './index'

const url = process.env.VUE_APP_API_URL
const token = process.env.VUE_APP_TOKEN

// config axios default instance
const instance = axios.create({
  baseURL: `${url}`,
  timeout: 10000,
  headers: {'Token': token}
})

const code = {
  ok: 200,
  fatal: 500
}

const handleError = (error) => {
  console.log('[ERROR]: ' + error)
  store.dispatch('populateErrors', error).then()
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

export default {
  host: url,
  token: token,
  call: instance,
  code: code,
  get: (url, onSuccess, params) => {
    instance.get(url, {params: params})
      .then((response) => {
        let file = getAttachment(response)
        if (file !== null) {
          onSuccess(response, file)
          return
        }

        const msg = response.data

        if (msg.code === code.ok) {
          onSuccess(msg.data)
          return
        }

        handleError(msg.message)
      })
      .catch((error) => {
        handleError(error)
      })
  },

  // return promise
  post: (url, onSuccess, data) => {
    return instance.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      const msg = response.data

      if (msg.code === code.ok) {
        onSuccess(msg.data)
        return
      }

      handleError(msg)
    }).catch((error) => {
      handleError(error)
    })
  },

  delete: (url, onSuccess) => {
    return instance.delete(url).then((response) => {
      const msg = response.data

      if (msg.code === code.ok) {
        onSuccess(msg.data)
        return
      }

      handleError(msg)
    }).catch((error) => {
      handleError(error)
    })
  }
}
