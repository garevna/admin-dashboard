let messages = []

const executor = function (value) {
  if (!value) return messages
  if (Array.isArray(value)) { messages = self.__clone(value) } else messages.push(value)
}

const update = function (updates) {
  console.warn({ 'messages-updates-received-by-handler': updates })
}

export const messagesHandler = Object.assign(executor, { update })
