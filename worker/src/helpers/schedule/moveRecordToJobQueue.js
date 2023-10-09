// import { sendNotification } from '../updates'

const [route, action] = ['schedule', 'job']

export const moveRecordToJobQueue = async (request) => {
  const { status } = await self.updateCustomerServiceStatus(request)

  if (status !== 200) return self.errorMessage('updateStatusError')

  self.createNewScheduleLot(request.installation.date, request.installation.period)

  // await sendNotification(partnerId, 'service', service._id)

  return {
    status: 200,
    route,
    action,
    result: (await self.buildSchedule()).result,
    message: true,
    messageType: 'Scheduling',
    messageText: 'Request submitted.'
  }
}
