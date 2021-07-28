export const moveRecordToJobQueue = async (request) => {
  const { status } = await self.updateCustomerServiceStatus(request)

  if (status !== 200) return self.errorMessage('updateStatusError')

  self.updateScheduleLots()

  return { status: 200, route: 'schedule', action: 'job', result: (await self.buildSchedule()).result }
}
