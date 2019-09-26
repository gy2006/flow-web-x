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
export const TRIGGER_PUSH = 'PUSH'
export const TRIGGER_PR_OPEN = 'PR_OPEN'
export const TRIGGER_PR_CLOSE = 'PR_CLOSE'
export const TRIGGER_TAG = 'TAG'
export const TRIGGER_MANUAL = 'MANUAL'
export const TRIGGER_API = 'API'
export const TRIGGER_SCHEDULER = 'SCHEDULER'

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

  get commitUrl () {
    return this.job.context[ vars.git.commit.url ]
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
    return this.job.trigger
  }

  get triggerText () {
    return mapping.trigger[ this.job.trigger ].text
  }

  get triggerIcon () {
    return mapping.trigger[ this.job.trigger ].icon
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

  get duration () {
    if (this.job.startAt && this.job.finishAt) {
      return moment(this.job.finishAt).diff(moment(this.job.startAt), 'milliseconds')
    }

    return '-'
  }

  get finishedAt () {
    if (this.job.finishAt) {
      return moment(this.job.finishAt).fromNow()
    }

    return '-'
  }

  get agentInfo () {
    return this.job.agentInfo || {
      name: '-',
      os: '-',
      cpu: '-',
      memory: '-'
    }
  }

  get triggerBy () {
    return this.job.context[ vars.job.triggerBy ] || '-'
  }

  get prTitle () {
    return this.job.context[ vars.git.pr.title ]
  }

  get prMessage () {
    return this.job.context[ vars.git.pr.message ]
  }

  get prUrl () {
    return this.job.context[ vars.git.pr.url ]
  }

  get prNumber () {
    return this.job.context[ vars.git.pr.number ]
  }

  get prHeadRepo () {
    return this.job.context[ vars.git.pr.head_repo ]
  }

  get prHeadBranch () {
    return this.job.context[ vars.git.pr.head_branch ]
  }

  get prBaseRepo () {
    return this.job.context[ vars.git.pr.base_repo ]
  }

  get prBaseBranch () {
    return this.job.context[ vars.git.pr.base_branch ]
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
      class: [ 'grey--text', 'rotate' ],
      text: ''
    },

    [ STATUS_QUEUED ]: {
      icon: 'flow-icon-pending',
      class: 'green--text',
      text: STATUS_QUEUED
    },

    [ STATUS_RUNNING ]: {
      icon: 'flow-icon-running',
      class: [ 'blue--text', 'rotate' ],
      text: STATUS_RUNNING
    },

    [ STATUS_SUCCESS ]: {
      icon: 'flow-icon-check',
      class: 'green--text',
      text: STATUS_SUCCESS
    },

    [ STATUS_FAILURE ]: {
      icon: 'flow-icon-failure',
      class: 'red--text',
      text: STATUS_FAILURE
    },

    [ STATUS_CANCELLED ]: {
      icon: 'flow-icon-stopped',
      class: 'grey--text',
      text: STATUS_CANCELLED
    },

    [ STATUS_TIMEOUT ]: {
      icon: 'flow-icon-timeout',
      class: 'orange--text',
      text: STATUS_TIMEOUT
    }
  },

  // job trigger mapping
  trigger: {
    [ TRIGGER_PUSH ]: {
      text: 'push',
      icon: 'flow-icon-git-commit'
    },

    [ TRIGGER_PR_OPEN ]: {
      text: 'pull request open',
      icon: 'flow-icon-git-pull-request'
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
