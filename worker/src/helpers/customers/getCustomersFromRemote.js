import { countRecords } from '../db'

// const [route, action] = ['customers', 'refresh']

export const getCustomersFromRemote = async () => {
  const { status, result } = await countRecords('customers')

  if (status !== 200) return self.errorMessage('countCustomersDataError')

  return result === 0 ? await self.downloadAllCustomers() : await self.refreshUpdatedCustomersOnly()
}
