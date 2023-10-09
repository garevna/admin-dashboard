import { getCustomerServicesToSave } from './getCustomerServicesToSave'

export function getServicesToSave () {
  return getCustomerServicesToSave(this.getValue())
}
