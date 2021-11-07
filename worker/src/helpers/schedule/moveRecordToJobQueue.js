export const moveRecordToJobQueue = async (request) => {
  self.postDebugMessage({ request })

  const { status } = await self.updateCustomerServiceStatus(request)

  if (status !== 200) return self.errorMessage('updateStatusError')

  self.createNewScheduleLot(request.installation.date, request.installation.period)

  return { status: 200, route: 'schedule', action: 'job', result: (await self.buildSchedule()).result }
}
