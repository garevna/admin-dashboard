export const moveRecordToJobQueue = async (request) => {
  await Promise.all([
    self.updateScheduleRecord(request.record),
    self.updateScheduleLots(),
    self.updateCustomerServiceStatus(request.record)
  ])

  return { status: 200, route: 'schedule', action: 'job', result: (await self.getSchedule()).result }
}
