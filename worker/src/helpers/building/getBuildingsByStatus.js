// import { endpoints } from './endpoints'

const { getBuildingsByPostcodeErrors } = require('../../errors').errors
const { /* notValid, */ requestFailed } = getBuildingsByPostcodeErrors

const [route, action] = ['channel', 'table']

let resolve = response => console.log(response)

const callback = event => {
  const { route, action, status, result: buildings } = event.data

  if (route !== 'channel' || action !== 'table') {
    console.warn('Unknown response from map.worker', route, action, status, buildings)
    resolve(requestFailed)
  }

  resolve(buildings)
}

export const getBuildingsByStatus = async (status, handler) => {
  // if (!endpoints.includes(status)) return notValid

  resolve = handler

  const promise = new Promise(() => {
    self.channelPort.postMessage({ route, action, key: status })
    self.channelPort.onmessage = callback
  })

  await promise
}
