let messages = []

export const messagesHandler = function (data) {
  if (!data) return messages
  messages = JSON.parse(JSON.stringify(data))
}
