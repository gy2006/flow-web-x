import axios from 'axios'

const url = process.env.VUE_APP_API_URL
const token = process.env.VUE_APP_TOKEN

// config axios default instance
const instance = axios.create({
  baseURL: `${url}`,
  timeout: 1000,
  headers: {'Token': token}
})

const code = {
  ok: 200,
  fatal: 500
}

export default {
  host: url,
  token: token,
  call: instance,
  code: code,
  get: (url, onSuccess, onError, params) => {
    instance.get(url, {params: params})
      .then((response) => {
        const msg = response.data

        if (msg.code === code.ok) {
          onSuccess(msg.data)
          return
        }

        onError(msg.message)
      })
      .catch((error) => {
        onError(error)
      })
  }
}
