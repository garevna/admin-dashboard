import { warningsController } from '@/components/customers/import/controllers'

export function updateConnectionData (propName, propValue) {
  if (this.serviceIndex === -1) return this.showError('Update service connection data failed')

  const [prop, key] = propName.split('.')
  if (key) Object.assign(this.services[this.serviceIndex].connectionData[prop], { [key]: propValue })
  else Object.assign(this.services[this.serviceIndex].connectionData, { [propName]: propValue })

  warningsController.testCustomer(this.getValue(), this.getIndex())
}
