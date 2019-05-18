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

  get flow () {
    return this.flowName
  }

  get name () {
    return this.stepName
  }

  get status () {
    let status = mapping[this.step.status]
    return !status ? mapping.default : status
  }

  set rawStatus(newStatus) {
    this.step.status = newStatus
  }
}

export const mapping = {
  default: {
    icon: 'flow-icon-stopped grey--text',
    text: 'skipped'
  },

  PENDING: {
    icon: 'flow-icon-pending grey--text',
    text: 'pending'
  },

  RUNNING: {
    icon: 'flow-icon-running rotate blue--text',
    text: 'running'
  },

  SUCCESS: {
    icon: 'flow-icon-check green--text',
    text: 'success'
  },

  SKIPPED: {
    icon: 'flow-icon-stopped grey--text',
    text: 'skipped'
  },

  EXCEPTION: {
    icon: 'flow-icon-failure red--text',
    text: 'failure'
  },

  KILLED: {
    icon: 'flow-icon-stopped grey--text',
    text: 'killed'
  },

  TIMEOUT: {
    icon: 'flow-icon-timeout orange--text',
    text: 'pending'
  }
}
