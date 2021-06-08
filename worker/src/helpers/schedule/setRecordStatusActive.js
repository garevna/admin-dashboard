export const setRecordStatusActive = async (request) => {
  await Promise.all([
    self.removeScheduleRecord(request._id),
    self.updateScheduleLots(),
    self.updateCustomerServiceStatus(Object.assign(request, { status: 'Active' }))
  ])

  return { status: 200, route: 'schedule', action: 'job', result: (await self.getSchedule()).result }
}
