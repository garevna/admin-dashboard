import { get } from '../AJAX'
import { putRecordByKey } from '../db'

// import { remoteServerError } from '../../errors'

const [route, action] = ['updates', 'partners']

// const remoteError = Object.assign(remoteServerError, { route, action })

export const getPartnerUpdates = async (notifications) => {
  if (!notifications || !Array.isArray(notifications)) return { status: 204, route, action, result: [] }

  let promises = notifications
    .filter(item => item.target === 'partner')
    .map(note => note.id)
    .map(id => get(`user/${id}`))

  const responses = promises && promises.length ? await Promise.all(promises) : []

  const updates = responses && responses.length ? responses.map(response => response.result) : []

  promises = updates.map(partner => putRecordByKey('rsp', partner._id, partner))

  await Promise.all(promises)

  return { status: 200, route, action, result: updates }
}
