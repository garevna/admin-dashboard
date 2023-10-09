module.exports = function (service) {
  return service.status === 'Active' && service.activationDate
    ? service.activationDate.slice(0, 7)
    : new Date(Object.keys(service.log).pop() - 0).toISOString().slice(0, 7)
}
