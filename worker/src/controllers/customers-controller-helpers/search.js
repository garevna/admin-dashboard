export async function search (request) {
  self.postMessage(await self.searchCustomers(request.filters))
}
