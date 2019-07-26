export default {
  flows: {
    reset: 'flows/reset',
    exist: 'flows/exist',
    create: 'flows/create',
    createSshRsa: 'flows/createSshRsa',
    confirm: 'flows/confirm',
    list: 'flows/list',
    listByCredential: 'flows/listByCredential',
    select: 'flows/select',
    delete: 'flows/delete',
    yml: {
      load: 'flows/loadYml',
      save: 'flows/saveYml'
    },
    gitTestStart: 'flows/gitTestStart',
    gitTestUpdate: 'flows/gitTestUpdate',
    gitBranches: 'flows/gitBranches'
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
    get: 'agents/get',
    createOrUpdate: 'agents/createOrUpdate',
    delete: 'agents/delete',
    list: 'agents/list',
    update: 'agents/update',
    select: 'agents/select'
  },

  credentials: {
    create: 'credentials/create',
    list: 'credentials/list',
    get: 'credentials/get'
  }
}
