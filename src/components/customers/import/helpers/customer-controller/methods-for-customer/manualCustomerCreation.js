import { connectionDataFields } from '../connectionDataFields'

export const manualCustomerCreation = resellerId => {
  return {
    customerCreationDate: new Date().toISOString().slice(0, 10),
    commercial: null,
    resellerId,
    buildingId: null,
    uniqueCode: '',
    address: 'Unknown',
    apartmentNumber: '',
    firstName: 'Unknown',
    lastName: 'Unknown',
    primaryEmail: '',
    alternativeEmail: '',
    phoneMobile: '',
    phoneWork: '',
    postCode: '',
    services: [
      {
        id: null,
        serviceName: 'Unknown',
        status: 'Active',
        activationDate: new Date().toISOString().slice(0, 10),
        connectionData: JSON.parse(JSON.stringify(connectionDataFields)),
        log: { [Date.now().toString()]: 'Active' },
        modified: Date.now(),
        discount: {
          units: 'sum',
          value: 0,
          period: [Date.now(), null]
        }
      }
    ]
  }
}
