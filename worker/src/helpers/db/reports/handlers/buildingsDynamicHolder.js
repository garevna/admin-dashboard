const { calculateMRR } = require('../overviewHelpers')
const { roundFloat } = require('../lib')

let buildingsDynamicHolder = {}

const calcMRR = function (postCode) {
  const { dynamic, residentialDynamic, commercialDynamic, pending: pend } = buildingsDynamicHolder[postCode]
  const MRR = calculateMRR(dynamic, residentialDynamic, commercialDynamic, pend)
  return roundFloat(MRR.residential + MRR.commercial)
}

buildingsDynamicHolder.init = () => {
  buildingsDynamicHolder = {}
}

buildingsDynamicHolder.getKeys = () => Object.keys(JSON.parse(JSON.stringify(buildingsDynamicHolder)))

buildingsDynamicHolder.addRecord = (postCode, data, pending) => {
  if (!buildingsDynamicHolder[postCode]) {
    buildingsDynamicHolder[postCode] = data
    buildingsDynamicHolder[postCode].pending = pending
    buildingsDynamicHolder[postCode].MRR = 0
    return
  }

  Array.isArray(pending) && buildingsDynamicHolder[postCode].pending.push(...pending)

  for (const section of ['dynamic', 'residentialDynamic', 'commercialDynamic']) {
    for (const date in buildingsDynamicHolder[postCode][section]) {
      buildingsDynamicHolder[postCode][section][date] += data[section] ? (data[section][date] || 0) : 0
    }
  }

  buildingsDynamicHolder[postCode].MRR = calcMRR(postCode)
}

buildingsDynamicHolder.getRecord = postCode => JSON.parse(JSON.stringify(buildingsDynamicHolder[postCode]))

buildingsDynamicHolder.getAll = () => buildingsDynamicHolder

module.exports = {
  buildingsDynamicHolder
}
