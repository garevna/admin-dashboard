export async function importCustomerUpdates (request) {
  try {
    self.postMessage(await self.importCustomerUpdates(request.file))
  } catch (err) {
    // console.warn('Response from parser:\n', err)
    self.postMessage(Object.assign(err, { route: 'customers', action: 'import-updates' }))
  }
}
