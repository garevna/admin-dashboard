let [dynamic, residentialDynamic, commercialDynamic] = [{}, {}, {}]

function init () {
  [dynamic, residentialDynamic, commercialDynamic] = [{}, {}, {}]
}

function reduce (recordDynamic) {
  if (!recordDynamic.length) return

  for (const service of recordDynamic) {
    for (const date in service.data) {
      if (!dynamic[date]) dynamic[date] = 0
      if (!residentialDynamic[date]) residentialDynamic[date] = 0
      if (!commercialDynamic[date]) commercialDynamic[date] = 0

      dynamic[date] += service.data[date] || 0
      residentialDynamic[date] += service.serviceType === 'residential' ? (service.data[date] || 0) : 0
      commercialDynamic[date] += service.serviceType === 'commercial' ? (service.data[date] || 0) : 0
    }
  }

  for (const object of [dynamic, residentialDynamic, commercialDynamic]) {
    Object.keys(object).forEach(key => Object.assign(object, { [key]: self.__roundFloat(object[key]) }))
  }
}

function get () {
  return { dynamic, residentialDynamic, commercialDynamic }
}

module.exports = {
  init,
  reduce,
  get
}
