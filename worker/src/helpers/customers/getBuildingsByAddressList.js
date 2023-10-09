let list = []

let handler = null

const [route, action] = ['customers', 'buildings']

const getBuildings = buildings => {
  const result = list.map(address => buildings.find(building => building.address === address))

  if (handler) return handler(result)

  self.postMessage({
    route,
    action,
    status: 200,
    result
  })
}

export const getBuildingsByAddressList = async (addressList, callback = null) => {
  list = addressList
  handler = callback
  self.getBuildingsByStatus('lit', await getBuildings)
}
