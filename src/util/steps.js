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
}
