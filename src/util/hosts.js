export class HostWrapper {

  constructor (host) {
    this.host = host
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
}