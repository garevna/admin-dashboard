import { simpleProps } from './simpleProps'
import { createServices } from '@/components/customers/import/helpers/customer-controller/createServices'

export function clear () {
  this.index = undefined

  for (const propName of simpleProps) this[propName] = ''

  this.commercial = null
  this.services = createServices()
}
