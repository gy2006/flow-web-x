import axios from 'axios'

const url = process.env.VUE_APP_API_URL
const token = process.env.VUE_APP_TOKEN

const contentType = {
  json: 'application/json',
  text: 'text/plain'
}

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

const handleError = (error) => {
  console.log(error)
}

export default {
  host: url,
  token: token,
  call: instance,
  code: code,
  get: (url, onSuccess, params) => {
    instance.get(url, {params: params})
      .then((response) => {
        // handle standard json message response
        if (response.headers['content-type'].startsWith(contentType.json)) {
          const msg = response.data

          if (msg.code === code.ok) {
            onSuccess(msg.data)
            return
          }

          handleError(msg.message)
          return
        }

        // handle text/plain message response
        if (response.headers['content-type'].startsWith(contentType.text)) {
          onSuccess(response.data)
        }
      })
      .catch((error) => {
        handleError(error)
      })
  },
  post: (url, onSuccess, data) => {
    instance.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        const msg = response.data

        if (msg.code === code.ok) {
          onSuccess(msg.data)
        }

        handleError(msg.message)
      })
      .catch((error) => {
        handleError(error)
      })
  }
}
