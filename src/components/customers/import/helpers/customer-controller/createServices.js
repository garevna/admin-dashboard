import { connectionDataFields } from './connectionDataFields'

export function createServices () {
  return [
    {
      id: null,
      serviceName: 'Unknown',
      status: 'Active',
      activationDate: null,
      connectionData: JSON.parse(JSON.stringify(connectionDataFields)),
      log: { [Date.now().toString()]: 'Active' },
      modified: Date.now(),
      discount: {
        units: 'sum',
        value: 0,
        period: [null, null]
      }
    }
  ]
}
