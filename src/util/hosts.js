export class HostWrapper {

  constructor (host) {
    this.host = host || {
      tags: []
    }
    this.agents = []
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
}