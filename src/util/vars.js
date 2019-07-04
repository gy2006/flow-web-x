export default {

  app: {
    url: 'FLOWCI_SERVER_URL',
  },

  flow: {
    name: 'FLOWCI_FLOW_NAME',
    webhook: 'FLOWCI_FLOW_WEBHOOK',
    gitUrl: 'FLOWCI_GIT_URL'
  },

  job: {
    status: 'FLOWCI_JOB_STATUS',
    trigger: 'FLOWCI_JOB_TRIGGER',
    build_number: 'FLOWCI_JOB_BUILD_NUM'
  },

  credential: {
    ssh: 'FLOWCI_CREDENTIAL_SSH_RSA'
  },

  git: {
    source: 'FLOWCI_GIT_SOURCE',
    event: 'FLOWCI_GIT_EVENT',
    author: 'FLOWCI_GIT_AUTHOR',
    branch: 'FLOWCI_GIT_BRANCH',
    compare_url: 'FLOWCI_GIT_COMPARE_URL',
    commit: {
      id: 'FLOWCI_GIT_COMMIT_ID',
      message: 'FLOWCI_GIT_COMMIT_MESSAGE',
      time: 'FLOWCI_GIT_COMMIT_TIME',
      url: 'FLOWCI_GIT_COMMIT_URL'
    },
  }
}
