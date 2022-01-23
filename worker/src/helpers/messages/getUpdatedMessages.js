// import { get } from '../AJAX'

const [route, action] = ['messages', 'updated']

const getMessagesError = {
  status: 500,
  route,
  action,
  error: true,
  errorType: 'Messages',
  errorMessage: 'Failed to fetch messages from remote server'
}

// const typesForUpdates = ['update-customer-details', 'update-company-details']

export const getUpdatedMessages = async () => {
  const { status, result } = await self.getMessages()

  if (status !== 200) return getMessagesError

  // const forUpdates = result.messages.filter(message => typesForUpdates.includes(message.type))

  const updated = result
    .filter(message => Array.isArray(message.fields) ? message.fields.filter(item => item.updated).length : message.fields)

  for (const message of updated) {
    const partner = (await self.getResellerDetails(message.resellerId)).result
    if (!partner) continue
    Object.assign(message, { partner: partner.company.name })
  }

  return {
    status,
    route,
    action,
    result: updated
  }
}
