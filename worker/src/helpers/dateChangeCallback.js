import { getServicesToUpdateStatus } from './db/customers'

const [route, action] = ['schedule', 'updated']

export const dateChangeCallback = async () => {
  const { result: services } = await getServicesToUpdateStatus()

  await Promise.all(services.map(service => self.updateCustomerServiceStatus({
    customerId: service.customerId,
    serviceId: service.serviceId,
    status: service.newStatus
  })))

  self.postMessage({ status: 200, route, action, result: (await self.refreshSchedule()).result })
}
