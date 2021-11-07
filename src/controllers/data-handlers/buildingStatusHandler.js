const { footprintOptions } = require('../../configs').default

export const buildingStatusHandler = (function () {
  let status = {
    title: 'On-net buildings',
    value: 'lit',
    status: 'LIT'
  }

  return function (data) {
    if (!data) return status

    const found = footprintOptions.find(item => item.value === data.value && item.title === data.title && item.status === data.status)

    status = found || status
  }
})()
