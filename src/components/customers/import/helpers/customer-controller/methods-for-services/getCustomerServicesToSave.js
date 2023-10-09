const serviceProps = [
  'id',
  'status',
  'activationDate',
  'cancelDate',
  'canceledDate',
  'resumeDate',
  'resumedDate',
  'suspendDate',
  'suspendedDate',
  'installation',
  'log',
  'lots',
  'discount',
  'connectionData',
  'modified'
]

export function getCustomerServicesToSave () {
  return this.services.map(service => Object.assign({}, ...serviceProps.map(key => ({ [key]: service[key] }))))
}
