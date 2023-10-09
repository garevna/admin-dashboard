import { openDB } from '../openDB'

const [route, action] = ['customers', 'engineering']

export const getEngineering = async () => {
  const { status, result: db } = await openDB()

  if (status !== 200) return { status, result: db, route, action }

  const transaction = db.transaction(['customers', 'services'], 'readwrite')
  const customerStore = transaction.objectStore('customers')

  const customers = {}
  const services = []

  return new Promise((resolve) => {
    customerStore.openCursor().onsuccess = async (event) => {
      const cursor = event.target.result
      if (cursor) {
        const customer = cursor.value
        if (Array.isArray(customer.services) && customer.services.length) {
          customers[customer._id] = {
            uniqueCode: customer.uniqueCode,
            address: customer.address,
            resellerId: customer.resellerId
          }

          services.push(...customer.services.map(service => ({
            id: service.id,
            customerId: customer._id,
            status: service.status,
            Login: {
              PPPOE: service.connectionData && service.connectionData.Login ? service.connectionData.Login.PPPOE : '',
              IPoE: service.connectionData && service.connectionData.Login ? service.connectionData.Login.IPoE : ''
            },
            PWD: {
              PPPOE: service.connectionData && service.connectionData.PWD ? service.connectionData.PWD.PPPOE : '',
              IPoE: service.connectionData && service.connectionData.PWD ? service.connectionData.PWD.IPoE : ''
            },
            'Speed In': service.connectionData ? service.connectionData['Speed In'] : '',
            'Speed Out': service.connectionData ? service.connectionData['Speed Out'] : '',
            IP: service.connectionData ? service.connectionData.IP : '',
            'Routed subnet': service.connectionData ? service.connectionData['Routed subnet'] : '',
            'VLAN DGtek': service.connectionData ? service.connectionData['VLAN DGtek'] : '',
            'VLAN RSP': service.connectionData ? service.connectionData['VLAN RSP'] : ''
          })))
        }

        cursor.continue()
      } else {
        resolve({ status: 200, route, action, result: { customers, services } })
      }
    }
  })
}
