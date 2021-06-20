const { updateStatusError } = require('../error-handlers').default

export const moveRecordToJobQueue = async (request) => {
  const { status } = await self.updateCustomerServiceStatus(request)

  if (status !== 200) return updateStatusError(status, 'schedule', 'update', true)

  self.updateScheduleLots()

  return { status: 200, route: 'schedule', action: 'job', result: (await self.getSchedule()).result }
}
