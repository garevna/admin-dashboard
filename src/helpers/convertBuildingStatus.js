const menuOptions = {
  'On-net': ['LIT', 'ServiceAvailable'],
  Footprint: ['Footprint'],
  'Construction commenced': ['BuildCommenced', 'UnderConstruction', 'ConstructionCommenced'],
  'Coming soon': ['ComingSoon'],
  'N/A': ['Other']
}

export const convertBuildingStatus = function (value) {
  if (Object.keys(menuOptions).includes(value)) return menuOptions[value]
  for (const key in menuOptions) {
    if (menuOptions[key].includes(value)) return key
  }
  return 'Not defined'
}
