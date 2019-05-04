import axios from 'axios'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

const url = process.env.VUE_APP_API_URL
const token = process.env.VUE_APP_TOKEN

const socket = new SockJS(`${url}/ws`)
const stompClient = Stomp.over(socket)
const instance = axios.create({
  baseURL: `${url}`,
  timeout: 1000,
  headers: {'Token': token}
})

const code = {
  ok: 200,
  fatal: 500
}

// disable debug log
stompClient.debug = function () {
}

export default {
  host: url,
  token: token,
  call: instance,
  socket: stompClient,
  code: {
    ok: 200,
    fatal: 500
  },
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
