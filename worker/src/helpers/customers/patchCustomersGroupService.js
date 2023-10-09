import { sendNotification } from '../updates'

const [route, action] = ['customers', 'patch-group']

export const patchCustomersGroupService = async function (data) {
  for (const record of data) {
    const { customerId, id: serviceId, ...connectionData } = record

    const { services } = (await self.getCustomer(customerId)).result

    const index = services.findIndex(service => service.id === serviceId)
    if (index === -1) continue

    services[index].connectionData = {
      Login: connectionData.Login,
      PWD: connectionData.PWD,
      'Speed In': connectionData['Speed In'],
      'Speed Out': connectionData['Speed Out'],
      'Routed subnet': connectionData['Routed subnet'],
      IP: connectionData.IP,
      'VLAN DGtek': connectionData['VLAN DGtek'],
      'VLAN RSP': connectionData['VLAN RSP']
    }
    const { status, result } = await self.patchCustomer(customerId, { services })
    status === 200 && await sendNotification(result.resellerId, 'customer', result._id)
  }

  return {
    status: 200,
    route,
    action,
    result: 'OK',
    message: true,
    messageType: 'result.address',
    messageText: 'Customers details were succesfully updated'
  }
}
