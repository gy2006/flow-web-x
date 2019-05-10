import { Actions as FlowAction } from './module/flows'
import { Actions as SocketAction } from './module/socket'
import { Actions as JobsStatus } from './module/jobs'

export default {
  flows: {
    list: 'flows/list',
    select: 'flows/select'
  },

  jobs: {
    start: 'jobs/start',
    create: 'jobs/create',
    list: 'jobs/list'
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
