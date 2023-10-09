const filters = {}

const availableKeys = ['partnerId', 'serviceId', 'type', 'serviceStatus', 'serviceActivationMonth']

const removeItem = itemName => { delete filters[itemName] }

export const customerFiltersHandler = function (filtersData) {
  if (!filtersData) return filters

  availableKeys
    .forEach(key => filtersData[key] ? Object.assign(filters, { [key]: filtersData[key] }) : removeItem(key))
}
