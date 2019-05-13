export default {

  // job status mapping
  status: {
    'QUEUED': {
      icon: 'flow-icon-pending',
      class: 'green--text'
    },

    'RUNNING': {
      icon: 'flow-icon-running',
      class: ['blue--text', 'rotate']
    },

    'SUCCESS': {
      icon: 'flow-icon-check',
      class: 'green--text'
    },

    'FAILURE': {
      icon: 'flow-icon-failure',
      class: 'red--text'
    },

    'CANCELLED': {
      icon: 'flow-icon-stopped',
      class: 'grey--text'
    },

    'TIMEOUT': {
      icon: 'flow-icon-timeout',
      class: 'orange--text'
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
