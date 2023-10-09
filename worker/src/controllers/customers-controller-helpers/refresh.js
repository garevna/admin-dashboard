export async function refresh () {
  self.getCustomersFromRemote()
  self.postMessage(await self.refreshSchedule())
}

export async function refreshUpdatedCustomersOnly () {
  self.postMessage(await self.refreshUpdatedCustomersOnly())
}

export async function hardRefresh () {
  self.postMessage(await self.hardCustomersRefresh())
}
