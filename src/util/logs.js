export class LogWrapper {
  constructor (cmdId, body) {
    this.cmdId = cmdId
    this.body = body

    let index = this.body.indexOf('#')
    this.stdType = this.body.substring(0, index)

    let rest = this.body.substring(index + 1)
    index = rest.indexOf('#')

    this.rowNum = rest.substring(0, index)
    this.rawLog = rest.substring(index + 1)
  }

  get id () {
    return this.cmdId
  }

  get log () {
    return this.rawLog
  }

  get std () {
    return this.stdType
  }

  get row () {
    return this.rowNum
  }
}
