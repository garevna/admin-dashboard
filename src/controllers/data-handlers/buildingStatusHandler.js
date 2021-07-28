export const buildingStatusHandler = (function () {
  let status = 'lit'

  const available = ['lit', 'footprint', 'build', 'soon', 'other']

  const convert = {
    LIT: 'lit',
    Footprint: 'footprint',
    BuildCommenced: 'build',
    UnderConstruction: 'build',
    ComingSoon: 'soon',
    Other: 'other'
  }

  return function (value) {
    if (!value) return status

    status = available.includes(value) ? value : convert[value] ? convert[value] : status
  }
})()
