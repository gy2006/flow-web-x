import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import actions from './actions'

const url = process.env.VUE_APP_API_URL

// config websocket instance
const socket = new SockJS(`${url}/ws`)
const stompClient = Stomp.over(socket)

// remove debug log
stompClient.debug = function () {
}

// event type from server
const events = {
  create: 'NEW_CREATED',
  change: 'STATUS_CHANGE'
}

// subscribe topic and callback method before connect
const subscribeBeforeConnected = []

// to record subscribed topic
const subscribed = {}

function subscribe (topic, callback) {
  if (subscribed[topic]) {
    return
  }

  subscribed[topic] = true

  if (stompClient.connected) {
    stompClient.subscribe(topic, callback)
    return
  }

  subscribeBeforeConnected.push({topic: topic, callback: callback})
}

stompClient.connect({}, function () {
  console.log('connected')

  subscribeBeforeConnected.forEach((item) => {
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
