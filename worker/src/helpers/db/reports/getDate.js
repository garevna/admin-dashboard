export const getDate = service => !service.activationDate
  ? new Date(service.modified).toISOString().slice(0, 10)
  : service.activationDate
