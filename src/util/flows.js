import { mapping } from './jobs'
import vars from './vars'

export class FlowWrapper {
  constructor (flow) {
    this.flow = flow
    this.statusIcon = 'home'
    this.statusClass = ''
    this.latestJob = undefined
    this.sshObj = {
      privateKey: '',
      publicKey: ''
    }
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
    return this.flow.variables[vars.flow.webhook] || ''
  }

  get gitUrl () {
    return this.flow.variables[vars.flow.gitUrl] || ''
  }

  get ssh () {
    return this.sshObj
  }

  set name (name) {
    this.flow.name = name
  }

  set gitUrl (url) {
    this.flow.variables[vars.flow.gitUrl] = url
  }

  set ssh (sshObj) {
    this.sshObj = sshObj
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
