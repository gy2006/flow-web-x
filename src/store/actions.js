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
    get: 'jobs/get',
    start: 'jobs/start',
    create: 'jobs/create',
    list: 'jobs/list',
    statusUpdate: 'jobs/statusUpdate',
    select: 'jobs/select',
    steps: {
      get: 'steps/get',
      update: 'steps/update'
    },
    logs: {
      load: 'logs/load',
      download: 'logs/download'
    }
  },

  agents: {
    list: 'agents/list'
  }
}
