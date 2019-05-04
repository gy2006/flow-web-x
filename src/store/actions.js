import { Actions as FlowAction } from './module/flows'
import { Actions as SocketAction } from './module/socket'
import { Actions as JobsStatus } from './module/jobs'

export default {
  flow: {
    list: 'flows/list',
    select: 'flows/select'
  },

  'Flows': {
    ...FlowAction
  },
  'Socket': {
    ...SocketAction
  },
  'Jobs': {
    ...JobsStatus
  }

}
