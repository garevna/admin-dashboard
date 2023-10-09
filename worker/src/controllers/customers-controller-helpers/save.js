export async function saveCustomers (request) {
  self.postMessage(await self.saveGroupOfCustomers(request.customers))
}
