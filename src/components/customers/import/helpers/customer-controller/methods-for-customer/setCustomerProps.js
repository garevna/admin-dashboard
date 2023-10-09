import { simpleProps } from './simpleProps'

export function setCustomerProps (data) {
  for (const propName of simpleProps) this[propName] = data[propName] || ''

  if (data.services) this.services = JSON.parse(JSON.stringify(data.services))

  this.commercial = data.commercial || null
}
