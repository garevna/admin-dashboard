import { put } from '../AJAX'

export const updateSLA = async (record) => {
  self.postDebugMessage(record)

  const success = {
    message: true,
    messageType: 'SLA update',
    messageText: `${record.title} has been updated`
  }

  const updateSLAFailed = {
    error: true,
    errorType: 'SLA update',
    errorMessage: `Update for ${record.title} failed`
  }

  const response = await put(`sla/${record._id}`, record)

  self.postDebugMessage({ response })

  return response.status !== 200 ? Object.assign(response, updateSLAFailed)
    : Object.assign(success, { status: 200, result: response.data, route: 'sla', action: 'update' })
}
