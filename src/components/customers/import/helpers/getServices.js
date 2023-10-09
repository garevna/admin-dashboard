import { getConnectionData } from './'
import { parseDate } from '@/helpers'

const status = 'Active'

export const getServices = customer => {
  let { customerCreationDate, activationDate } = customer

  activationDate = parseDate(activationDate || customerCreationDate)
  const modified = activationDate ? Date.parse(activationDate) : Date.now()

  return [
    {
      serviceName: customer.serviceName,
      status,
      activationDate,
      connectionData: getConnectionData(customer),
      log: { [modified.toString()]: status },
      modified,
      discount: {
        units: 'sum',
        value: 0,
        period: [modified, null]
      }
    }
  ]
}
