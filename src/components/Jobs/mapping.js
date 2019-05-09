export default {

  // job status mapping
  status: {
    'QUEUED': {
      icon: 'flow-icon-pending',
      color: 'green--text'
    },

    'RUNNING': {
      icon: 'flow-icon-running',
      color: 'blue--text'
    },

    'SUCCESS': {
      icon: 'flow-icon-check',
      color: 'green--text'
    },

    'FAILURE': {
      icon: 'flow-icon-failure',
      color: 'red--text'
    },

    'CANCELLED': {
      icon: 'flow-icon-stopped',
      color: 'grey--text'
    },

    'TIMEOUT': {
      icon: 'flow-icon-timeout',
      color: 'orange--text'
    }
  },

  // job trigger mapping
  trigger: {
    'PUSH': {
      text: 'push',
      icon: 'flow-icon-repo-push'
    },

    'PR_OPEN': {
      text: 'pull request open',
      icon: 'flow-icon-git-merge'
    },

    'PR_CLOSE': {
      text: 'pull request close',
      icon: 'flow-icon-git-merge'
    },

    'TAG': {
      text: 'tag',
      icon: 'flow-icon-tag'
    },

    'MANUAL': {
      text: 'manual',
      icon: 'flow-icon-drag'
    },

    'API': {
      text: 'api',
      icon: 'flow-icon-code'
    },

    'SCHEDULER': {
      text: 'scheduler',
      icon: 'flow-icon-stopwatch'
    }
  }
}
