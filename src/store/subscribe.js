import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import actions from './actions'

const url = process.env.VUE_APP_API_URL

// config websocket instance
const socket = new SockJS(`${url}/ws`)
const stompClient = Stomp.over(socket)

stompClient.debug = function () {
}

const events = {
  create: 'NEW_CREATED',
  change: 'STATUS_CHANGE'
}

const registerBeforeConnected = []

function subscribe (topic, callback) {
  if (stompClient.connected) {
    stompClient.subscribe(topic, callback)
    return
  }

  registerBeforeConnected.push({topic: topic, callback: callback})
}

stompClient.connect({}, function () {
  console.log('connected')

  registerBeforeConnected.forEach((item) => {
    stompClient.subscribe(item.topic, item.callback)
    console.log('subscribe: ' + item.topic)
  })
})

export const subsribeTopic = {
  // subscribe job changes
  jobs (store) {
    subscribe('/topic/jobs', (data) => {
      let message = JSON.parse(data.body)

      // job created
      if (events.create === message.event) {
        store.dispatch(actions.jobs.create, message.body).then()
        return
      }

      // job status changed
      if (events.change === message.event) {
        store.dispatch(actions.jobs.statusUpdate, message.body).then()
      }
    })
  },

  // subscribe step changes
  steps (jobId, store) {
    subscribe('/topic/steps/' + jobId, (data) => {
      let message = JSON.parse(data.body)

      if (events.change !== message.event) {
        return
      }

      let executedCmd = message.body
      store.dispatch(actions.jobs.steps.update, executedCmd)
    })
  }
}
