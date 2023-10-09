export async function deleteCustomer (request) {
  self.postMessage(await self.deleteCustomer(request.key))
}

export async function deleteGroupOfCustomers (request) {
  self.postMessage(await self.deleteCustomers(request.keys))
}
