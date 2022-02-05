import { messagesHandler } from '../../helpers/data-handlers'

const updateMessages = messages => messagesHandler(messages)

export function updatesCallback (event) {
  event.stopPropagation()

  const { result: updates } = event.data

  // console.log(updates)

  updateMessages(updates.messages)

  Object.keys(updates)
    .forEach(key => window[Symbol.for('vue.instance')].$emit(`${key}-updates-received`, updates[key]))
}
