import { parseDate, getConnectionData, getKey } from './'

export const getServices = customer => {
  const findKey = getKey.bind(null, Object.keys(customer))
  const [
    serviceNameKey,
    statusKey,
    creationDateKey,
    activationDateKey,
    canceledDateKey,
    suspendedDateKey
  ] = [
    findKey(['service', 'name']),
    findKey(['status']),
    findKey(['creation', 'date']),
    findKey(['activation', 'date']),
    findKey(['cancel', 'date']),
    findKey(['suspend', 'date']) || findKey(['suspension', 'date'])
  ]

  const sourceActivationDate = customer[activationDateKey] || customer[creationDateKey]

  const [status, activationDate, canceledDate, suspendedDate] = [
    customer[statusKey] || 'Active',
    sourceActivationDate ? parseDate(sourceActivationDate) : null,
    customer[canceledDateKey] ? parseDate(customer[canceledDateKey]) : null,
    customer[suspendedDateKey] ? parseDate(customer[suspendedDateKey]) : null
  ]

  const modified = activationDate ? Date.parse(activationDate) : Date.now()

  return [
    {
      serviceName: customer[serviceNameKey],
      status,
      activationDate,
      canceledDate,
      suspendedDate,
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
