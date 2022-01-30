import { messagesHandler } from '../../helpers/data-handlers'

const updateMessages = messages => messagesHandler(messages)

const updatesKeys = [
  'customers',
  'tickets',
  'messages',
  'registration',
  'partners'
]

const updates = {
  customers: [],
  tickets: [],
  messages: [],
  registration: [],
  partners: []
}

export function updatesCallback (event) {
  event.stopPropagation()
  const { status, route, action, ...data } = event.data

  Object.assign(updates, ...updatesKeys.map(key => ({ [key]: data.result.find(item => item.action === key) || [] })))

  updateMessages(updates.messages.result)

  updatesKeys
    .forEach(name => window[Symbol.for('vue.instance')].$emit(`${name}-updates-received`, updates[name]?.result))
}
