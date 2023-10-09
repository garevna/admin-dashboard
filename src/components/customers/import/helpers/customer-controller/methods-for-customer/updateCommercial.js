export function updateCommercial (propName, propValue) {
  if (!propName) this.commercial = null
  else {
    this.commercial = this.commercial || {}
    Object.assign(this.commercial, { [propName]: propValue })
  }

  this.emitEvent()
}
