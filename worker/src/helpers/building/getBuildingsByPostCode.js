const { getBuildingsByPostcodeErrors } = require('../../errors').errors
const { notValid, requestFailed } = getBuildingsByPostcodeErrors

const [route, action] = ['channel', 'table']

let postalCode

let resolve = response => console.log(response)

const callback = event => {
  const { route, action, status, result: buildings } = event.data

  if (route !== 'channel' || action !== 'table') {
    console.warn('Unknown response from map.worker', route, action, status, buildings)
    resolve(requestFailed)
  }

  const result = buildings.filter(building => building.addressComponents.postCode === postalCode)

  resolve({ status, route: 'building', action: 'get-buildings-by-postcode', result })
}

export const getBuildingsByPostCode = async (postCode, handler) => {
  if (!postCode) return notValid

  self.channelPort.onmessage = callback

  resolve = handler
  postalCode = postCode

  const promises = [
    new Promise(resolve => self.channelPort.postMessage({ route, action, key: 'lit' })),
    new Promise(resolve => self.channelPort.postMessage({ route, action, key: 'footprint' })),
    new Promise(resolve => self.channelPort.postMessage({ route, action, key: 'build-commenced' })),
    new Promise(resolve => self.channelPort.postMessage({ route, action, key: 'coming-soon' }))
  ]

  await Promise.all(promises)
}
