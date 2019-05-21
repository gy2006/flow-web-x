import { Actions as FlowAction } from './module/flows'
import { Actions as SocketAction } from './module/socket'
import { Actions as JobsStatus } from './module/jobs'

export default {
  flows: {
    list: 'flows/list',
    select: 'flows/select',
    yml: {
      load: 'flows/loadYml',
      save: 'flows/saveYml'
    }
  },

  jobs: {
    start: 'jobs/start',
    create: 'jobs/create',
    list: 'jobs/list',
    statusUpdate: 'jobs/statusUpdate',
    select: 'jobs/select',
    steps: {
      get: 'steps/get',
      update: 'steps/update'
    }
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
