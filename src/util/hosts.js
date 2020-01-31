export const HOST_TYPE_SSH = 'SSH'

export class HostWrapper {

  constructor (host) {
    this.host = host || {
      tags: [],
      maxSize: 10,
      maxIdleSeconds: 3600,
      maxOfflineSeconds: 600
    }
    this.agents = []
  }

  get rawInstance () {
    return this.host
  }

  get id () {
    return this.host.id
  }

  get name () {
    return this.host.name
  }

  get tags () {
    return this.host.tags
  }

  get children () {
    return this.agents
  }

  get credential () {
    return this.host.credential
  }

  get user () {
    return this.host.user
  }

  get ip () {
    return this.host.ip
  }

  get maxSize () {
    return this.host.maxSize
  }

  get maxIdle () {
    return this.host.maxIdleSeconds / 60
  }

  get maxOffline () {
    return this.host.maxOfflineSeconds / 60
  }

  get icon () {
    return 'mdi-server'
  }

  set name (val) {
    this.host.name = val
  }

  set tags (tags) {
    this.host.tags = tags
  }

  set children (val) {
    this.agents = val
  }

  set credential (val) {
    this.host.credential = val
  }

  set user (val) {
    this.host.user = val
  }

  set ip (val) {
    this.host.ip = val
  }

  set maxSize (val) {
    this.host.maxSize = val * 60
  }

  set maxIdle (val) {
    this.host.maxIdleSeconds = val * 60
  }

  set maxOffline (val) {
    this.host.maxOfflineSeconds = val * 60
  }
}