import vars from '@/util/vars'
import moment from 'moment'

// status
const STATUS_QUEUED = 'QUEUED'
const STATUS_RUNNING = 'RUNNING'
const STATUS_SUCCESS = 'SUCCESS'
const STATUS_FAILURE = 'FAILURE'
const STATUS_CANCELLED = 'CANCELLED'
const STATUS_TIMEOUT = 'TIMEOUT'

// triggers
const TRIGGER_PUSH = 'PUSH'
const TRIGGER_PR_OPEN = 'PR_OPEN'
const TRIGGER_PR_CLOSE = 'PR_CLOSE'
const TRIGGER_TAG = 'TAG'
const TRIGGER_MANUAL = 'MANUAL'
const TRIGGER_API = 'API'
const TRIGGER_SCHEDULER = 'SCHEDULER'

export class JobWrapper {
  constructor (job) {
    this.job = job
  }

  get rawInstance () {
    return this.job
  }

  get commitId () {
    return this.job.context[ vars.git.commit.id ]
  }

  get commitMsg () {
    return this.job.context[ vars.git.commit.message ]
  }

  get fromNow () {
    return moment(this.job.createdAt).fromNow()
  }

  get branch () {
    return this.job.context[ vars.git.branch ]
  }

  get buildNumber () {
    return this.job.buildNumber
  }

  get trigger () {
    return mapping.trigger[ this.job.trigger ]
  }

  get status () {
    if (!this.job.status) {
      return mapping.status.default
    }

    let status = mapping.status[ this.job.status ]

    if (!status) {
      return mapping.status.default
    }

    return status
  }

  get contextAsList () {
    const contextAsPairList = []
    const context = this.job.context

    if (!context) {
      return contextAsPairList
    }

    Object.keys(context).forEach(key => {
      contextAsPairList.push({key: key, value: context[ key ]})
    })

    return contextAsPairList
  }
}

export function isJobFinished (job) {
  return job.status !== STATUS_QUEUED && job.status !== STATUS_RUNNING
}

export const mapping = {

  // job status mapping
  status: {
    default: {
      icon: 'flow-icon-loading1',
      class: [ 'grey--text', 'rotate' ]
    },

    [ STATUS_QUEUED ]: {
      icon: 'flow-icon-pending',
      class: 'green--text'
    },

    [ STATUS_RUNNING ]: {
      icon: 'flow-icon-running',
      class: [ 'blue--text', 'rotate' ]
    },

    [ STATUS_SUCCESS ]: {
      icon: 'flow-icon-check',
      class: 'green--text'
    },

    [ STATUS_FAILURE ]: {
      icon: 'flow-icon-failure',
      class: 'red--text'
    },

    [ STATUS_CANCELLED ]: {
      icon: 'flow-icon-stopped',
      class: 'grey--text'
    },

    [ STATUS_TIMEOUT ]: {
      icon: 'flow-icon-timeout',
      class: 'orange--text'
    }
  },

  // job trigger mapping
  trigger: {
    [ TRIGGER_PUSH ]: {
      text: 'push',
      icon: 'flow-icon-repo-push'
    },

    [ TRIGGER_PR_OPEN ]: {
      text: 'pull request open',
      icon: 'flow-icon-git-merge'
    },

    [ TRIGGER_PR_CLOSE ]: {
      text: 'pull request close',
      icon: 'flow-icon-git-merge'
    },

    [ TRIGGER_TAG ]: {
      text: 'tag',
      icon: 'flow-icon-tag'
    },

    [ TRIGGER_MANUAL ]: {
      text: 'manual',
      icon: 'flow-icon-drag'
    },

    [ TRIGGER_API ]: {
      text: 'api',
      icon: 'flow-icon-code'
    },

    [ TRIGGER_SCHEDULER ]: {
      text: 'scheduler',
      icon: 'flow-icon-stopwatch'
    }
  }
}
