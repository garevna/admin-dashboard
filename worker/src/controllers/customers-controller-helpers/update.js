export async function updateCustomer (request) {
  self.postMessage(await self.updateCustomer(request.key, request.data))
}

export async function patchCustomer (request) {
  self.postMessage(await self.patchCustomer(request.key, request.data))
}

export async function patchCustomersGroupService (request) {
  self.postMessage(await self.patchCustomersGroupService(request.data))
}

export async function updateServiceCancelationDate (request) {
  self.postMessage(await self.updateCustomerServiceCancelationDate(request.customerId, request.serviceId, request.date))
}

export async function updateServiceSuspensionDate (request) {
  self.postMessage(await self.updateCustomerServiceSuspensionDate(request.customerId, request.serviceId, request.date))
}

export async function updateServiceResumingDate (request) {
  self.postMessage(await self.updateCustomerServiceResumingDate(request.customerId, request.serviceId, request.date))
}
