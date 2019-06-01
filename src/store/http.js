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

const handleError = (error) => {
  console.log('[Error]: ' + error)
}

const getAttachment = (response) => {
  const cd = response.headers['content-disposition']

  if (cd === undefined) {
    return null
  }

  // attachment; filename="demo-#107-init.log"
  let index = cd.indexOf("filename=")

  if (index === -1) {
    return null
  }

  return cd.substring(index + "filename=".length)
    .replace("\"", '')
    .replace("\"", '')
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
