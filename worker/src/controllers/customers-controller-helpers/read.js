export async function getAllCustomers () {
  self.postMessage(await self.getAllCustomers())
}

export async function getCustomer (request) {
  self.postMessage(await self.getCustomer(request.key))
}

export async function getCustomersEngineeringData () {
  self.postMessage(await self.getCustomersEngineeringData())
}

export async function getShortListOfCustomers () {
  self.postMessage(await self.getShortListOfCustomers())
}

export async function getFilteredShortListOfCustomers (request) {
  self.postMessage(await self.getFilteredShortListOfCustomers(request.filter))
}

export async function getCustomersByResellerId (request) {
  self.postMessage(await self.getCustomersByResellerId(request.resellerId))
}

export async function getCustomersByPageNumber (pageNumber) {
  self.postMessage(await self.getCustomersByPageNumber(pageNumber))
}

export async function getCustomerServices (request) {
  self.postMessage(await self.getCustomerServices(request.customerId))
}

export async function getCustomersForExcel (request) {
  self.postMessage(await self.getCustomersForExcelTable(request.data))
}
