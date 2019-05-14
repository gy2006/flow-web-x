import vars from '@/util/vars'
import moment from 'moment'

export class JobWrapper {
  constructor (job) {
    this.job = job
  }

  get rawInstance() {
    return this.job
  }

  get commitId() {
    return this.job.context[vars.git.commit.id]
  }

  get commitMsg() {
    return this.job.context[vars.git.commit.message]
  }

  get fromNow() {
    return moment(this.job.createdAt).fromNow()
  }

  get branch () {
    return this.job.context[vars.git.branch]
  }

  get buildNumber () {
    return this.job.buildNumber
  }

  get trigger () {
    return mapping.trigger[this.job.trigger]
  }

  get status () {
    if (!this.job.status) {
      return mapping.status.default
    }

    let status = mapping.status[this.job.status]

    if (!status) {
      return mapping.status.default
    }

    return status
  }

  get contextAsList() {
    const contextAsPairList = []
    const context = this.job.context

    if (!context) {
      return contextAsPairList
    }

    Object.keys(context).forEach(key => {
      contextAsPairList.push({key: key, value: context[key]})
    })

    return contextAsPairList
  }
}

export const mapping = {

  // job status mapping
  status: {
    default: {
      icon: 'flow-icon-loading1',
      class: ['grey--text', 'rotate']
    },

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