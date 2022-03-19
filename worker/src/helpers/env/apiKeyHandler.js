let apiKey = ''

export const apiKeyHandler = function (value) {
  if (value) { apiKey = value } else return apiKey
}
