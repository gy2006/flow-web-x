export default {
  app: {
    showSnackbar: 'g/show'
  },

  auth: {
    load: 'auth/load',
    login: 'auth/login',
    logout: 'auth/logout'
  },

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
    users: {
      list: 'flows/listUsers',
      add: 'flows/addUser',
      remove: 'flows/removeUser'
    },
    vars: {
      add: 'flows/addVar',
      remove: 'flows/removeVar'
    },
    yml: {
      load: 'flows/loadYml',
      save: 'flows/saveYml'
    },
    gitTestStart: 'flows/gitTestStart',
    gitTestUpdate: 'flows/gitTestUpdate',
    gitBranches: 'flows/gitBranches'
  },

  jobs: {
    latest: 'jobs/latest',
    start: 'jobs/start',
    create: 'jobs/create',
    cancel: 'jobs/cancel',
    list: 'jobs/list',
    statusUpdate: 'jobs/statusUpdate',
    select: 'jobs/select',
    getYml: 'jobs/getYml',
    reports: {
      list: 'jobs/listReport',
      fetch: 'jobs/fetchReport'
    },
    artifacts: {
      list: 'jobs/listArtifact',
      download: 'jobs/downloadArtifact'
    },
    steps: {
      get: 'steps/get',
      update: 'steps/update'
    },
    logs: {
      load: 'logs/load',
      download: 'logs/download'
    },
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
    createRsa: 'credentials/createRsa',
    createAuth: 'credentials/createAuth',
    list: 'credentials/list',
    listNameOnly: 'credentials/listNameOnly',
    get: 'credentials/get',
    delete: 'credentials/delete'
  },

  users: {
    listAll: 'users/listAll',
    create: 'users/create',
    changePassword: 'users/changePassword',
    changeRole: 'users/changeRole'
  },

  stats: {
    list: 'stats/list',
    total: 'stats/total',
    metaType: 'stats/metaType',
    metaTypeList: 'stats/metaTypeList'
  },

  plugins: {
    list: 'plugins/list',
    readme: 'plugins/readme',
    icon: 'plugins/icon'
  },

  hosts: {
    get: 'hosts/get',
    list: 'hosts/list',
    createOrUpdate: 'hosts/createOrUpdate',
    delete: 'hosts/delete',
    test: 'hosts/test',
    updated: 'hosts/updated'
  }
}
