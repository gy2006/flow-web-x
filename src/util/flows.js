import { mapping } from './jobs'

export class FlowWrapper {
  constructor (flow) {
    this.flow = flow
    this.statusIcon = 'home'
    this.statusClass = ''
    this.latestJob = undefined
  }

  get rawInstance() {
    return this.flow
  }

  get id () {
    return this.flow.id
  }

  get name () {
    return this.flow.name
  }

  get icon () {
    return this.statusIcon
  }

  get iconClass () {
    return this.statusClass
  }

  // latest job
  set job (latestJob) {
    this.latestJob = latestJob
    this.statusIcon = mapping.status[latestJob.status].icon
    this.statusClass = mapping.status[latestJob.status].class
  }
}
