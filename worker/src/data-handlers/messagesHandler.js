let messages = []

const executor = function (value) {
  if (!value) return messages
  if (Array.isArray(value)) { messages = JSON.parse(JSON.stringify(value)) } else messages.push(value)
}

const update = function (updates) {
  self.postDebugMessage({ 'messages-updates-received-by-handler': updates })
}

export const messagesHandler = Object.assign(executor, { update })
