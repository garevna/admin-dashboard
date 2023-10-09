// const { testBuildingsForErrors } = require('../../errors').errors
// const { notValid, requestFailed } = getBuildingsByPostcodeErrors
//
// const [route, action] = ['channel', 'table']
//
// let errors = []
//
// let resolve = response => console.log(response)
//
// const callback = event => {
//   const { route, action, status, result: buildings } = event.data
//
//   if (route !== 'channel' || action !== 'table') {
//     console.warn('Unknown response from map.worker', route, action, status, buildings)
//     resolve(requestFailed)
//   }
//
//   const result = buildings.filter(building => building.addressComponents.postCode === postalCode)
//
//   resolve({ status, route: 'building', action: 'get-buildings-by-postcode', result })
// }
//
// export const testBuildingsForErrors = async (handler) => {
//   resolve = handler
//
//   const promise = new Promise(resolve => {
//     self.channelPort.postMessage({ route, action, key: 'lit' })
//     self.channelPort.onmessage = callback
//   })
//
//   await promise
// }
