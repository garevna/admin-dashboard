export class BaseController {
  constructor (type) {
    this.type = type
    this.items = []
  }

  clear () {
    this.items = []
    this.emitEvent()
  }

  add (data) {
    data && (Array.isArray(data) ? this.items.push(...data) : this.items.push(data))
  }

  removeAllCustomerRecords (customerIndex) {
    this.items = this.items.filter(record => record.index !== customerIndex)
  }

  remove (index, propName, key) {
    const errorIndex = this.items.findIndex(item => item.index === index && item.propName === propName && item.key === key)

    if (errorIndex !== -1) this.items.splice(errorIndex, 1)
  }

  get () {
    return this.items
  }

  emitEvent (eventName) {
    window[Symbol.for('vue.instance')].$emit(eventName || `${this.type}-updated`, this.items)
  }

  length () {
    return this.items?.length
  }
}
