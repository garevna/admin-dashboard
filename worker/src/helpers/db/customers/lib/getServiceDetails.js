const getAllSpecialFields = service => ({
  IP: service.connectionData?.IP,
  'Login.PPPOE': service.connectionData?.Login?.PPPOE,
  'PWD.PPPOE': service.connectionData?.PWD?.PPPOE,
  'Login.IPoE': service.connectionData?.Login?.IPoE,
  'PWD.IPoE': service.connectionData?.PWD?.IPoE,
  'Speed In': service.connectionData ? service.connectionData['Speed In'] : '',
  'Speed Out': service.connectionData ? service.connectionData['Speed Out'] : '',
  'Routed subnet': service.connectionData ? service.connectionData['Routed subnet'] : '',
  'VLAN DGtek': service.connectionData ? service.connectionData['VLAN DGtek'] : '',
  'VLAN RSP': service.connectionData ? service.connectionData['VLAN RSP'] : ''
})

export const getServiceDetails = (serviceList, specialFields, service) => {
  const result = {
    Service: serviceList[service.id],
    status: service.status,
    activated: service.activationDate,
    canceled: service.canceledDate
  }

  const connectionData = getAllSpecialFields(service)

  for (const field of Object.keys(connectionData)) {
    if (specialFields.includes(field)) Object.assign(result, { [field]: connectionData[field] })
  }

  return result
}
