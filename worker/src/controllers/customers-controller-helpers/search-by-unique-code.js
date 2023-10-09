export async function searchByUniqueCode (request) {
  self.postMessage(await self.getCustomersByUniqueCode(request.uniqueCodeList))
}
