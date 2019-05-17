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

const pendingFuncs = []

stompClient.connect({}, function () {
  console.log('connected')

  pendingFuncs.forEach((item) => {
    stompClient.subscribe(item.topic, item.callback)
    console.log("subscribe: " + item.topic)
  })
})

export const subsribeTopic = {
  // subscribe job changes
  jobs(store) {
    let topic = '/topic/jobs'

    let callback = (data) => {
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
    }

    if (!stompClient.connected) {
      pendingFuncs.push({
        topic: topic,
        callback: callback
      })

      return
    }

    stompClient.subscribe(topic, callback)
  },

  // subscribe step changes
  steps (jobId, store) {
    let topic = '/topic/steps/' + jobId

    let callback = (data) => {
      let message = JSON.parse(data.body)

      if (events.change !== message.event) {
        return
      }

      let executedCmd = message.body
      store.dispatch(actions.jobs.steps.update, executedCmd)
    }

    if (!stompClient.connected) {
      pendingFuncs.push({
        topic: topic,
        callback: callback
      })

      return
    }

    stompClient.subscribe(topic, callback)
  }
}
