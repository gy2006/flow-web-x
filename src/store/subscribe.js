import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import actions from './actions'

const url = process.env.VUE_APP_API_URL

// config websocket instance
const socket = new SockJS(`${url}/ws`)
const stompClient = Stomp.over(socket)

const events = {
  create: 'NEW_CREATED',
  change: 'STATUS_CHANGE'
}

export default (store) => {

  const onJobChanges = (data) => {
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

  stompClient.debug = function () {
  }

  stompClient.connect({}, function () {
    console.log('connected')

    stompClient.subscribe('/topic/jobs', onJobChanges)
  })
}
