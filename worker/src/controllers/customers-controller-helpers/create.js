export async function createCustomer (request) {
  self.postMessage(await self.createCustomer(request.data))
}
