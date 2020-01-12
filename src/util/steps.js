import moment from 'moment'

const STATUS_PENDING = 'PENDING'
const STATUS_RUNNING = 'RUNNING'
const STATUS_SUCCESS = 'SUCCESS'
const STATUS_SKIPPED = 'SKIPPED'
const STATUS_EXCEPTION = 'EXCEPTION'
const STATUS_KILLED = 'KILLED'
const STATUS_TIMEOUT = 'TIMEOUT'

export class StepWrapper {
  constructor (step, index) {
    this.step = step
    this.stepIndex = index

    let cmdId = atob(this.step.id)
    let dashIndex = cmdId.indexOf('-')
    let slashIndex = cmdId.lastIndexOf('/')

    this.flowName = cmdId.substring(0, dashIndex)
    this.stepName = cmdId.substring(slashIndex + 1)
  }

  get rawInstance () {
    return this.step
  }

  get id () {
    return this.step.id
  }

  get index () {
    return this.stepIndex
  }

  get startAt () {
    if (!this.step.startAt) {
      return '-'
    }
    return moment(this.step.startAt).format('kk:mm:ss SSS')
  }

  get finishAt () {
    if (!this.step.finishAt) {
      return '-'
    }
    return moment(this.step.finishAt).format('kk:mm:ss SSS')
  }

  get flow () {
    return this.flowName
  }

  get name () {
    return this.stepName
  }

  get status () {
    let status = mapping[ this.step.status ]
    return !status ? mapping.default : status
  }

  get duration () {
    const start = moment(this.step.startAt)
    const end = moment(this.step.finishAt)
    return end.diff(start, 'seconds')
  }

  get isPending () {
    return this.step.status === STATUS_PENDING
  }

  get isRunning () {
    return this.step.status === STATUS_RUNNING
  }

  get isFinished () {
    return isStepFinished(this.step)
  }

  set rawStatus (newStatus) {
    this.step.status = newStatus
  }
}

export function isStepFinished (step) {
  return step.status !== STATUS_PENDING && step.status !== STATUS_RUNNING
}

export const mapping = {
  default: {
    icon: 'flow-icon-stopped grey--text',
    text: 'skipped',
    style: {
      fill: '#C6E5FF',
      stroke: '#5B8FF9'
    }
  },

  [ STATUS_PENDING ]: {
    icon: 'flow-icon-pending grey--text',
    text: 'pending',
    style: {
      fill: '#EEEEEE',
      stroke: '#BDBDBD'
    }
  },

  [ STATUS_RUNNING ]: {
    icon: 'mdi-settings rotate blue--text',
    text: 'running',
    style: {
      fill: '#E1F5FE',
      stroke: '#B3E5FC'
    }
  },

  [ STATUS_SUCCESS ]: {
    icon: 'flow-icon-check green--text',
    text: 'success',
    style: {
      fill: '#C8E6C9',
      stroke: '#81C784'
    }
  },

  [ STATUS_SKIPPED ]: {
    icon: 'flow-icon-stopped grey--text',
    text: 'skipped',
    style: {
      fill: '#B0BEC5',
      stroke: '#546E7A'
    }
  },

  [ STATUS_EXCEPTION ]: {
    icon: 'flow-icon-failure red--text',
    text: 'failure',
    style: {
      fill: '#EF9A9A',
      stroke: '#EF5350'
    }
  },

  [ STATUS_KILLED ]: {
    icon: 'flow-icon-stopped grey--text',
    text: 'killed',
    style: {
      fill: '#B0BEC5',
      stroke: '#546E7A'
    }
  },

  [ STATUS_TIMEOUT ]: {
    icon: 'flow-icon-timeout orange--text',
    text: 'pending',
    style: {
      fill: '#FFE0B2',
      stroke: '#FFB74D'
    }
  }
}
