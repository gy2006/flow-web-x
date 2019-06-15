import { mapping } from './jobs'
import vars from './vars'

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

  get webhook () {
    return this.flow[vars.flow.webhook]
  }

  get gitUrl () {
    return this.flow[vars.flow.gitUrl]
  }

  set name (name) {
    this.flow.name = name
  }

  set gitUrl (url) {
    this.flow[vars.flow.gitUrl] = url
  }

  // latest job
  set job (latestJob) {
    this.latestJob = latestJob
    this.icon = mapping.status[latestJob.status].icon
    this.iconClass = mapping.status[latestJob.status].class
  }

  set icon (icon) {
    this.statusIcon = icon
  }

  set iconClass (iconClass) {
    this.statusClass = iconClass
  }
}
