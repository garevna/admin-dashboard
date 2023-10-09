module.exports = record => ({
  total: record.numberOfDwellings || 0,
  residential: record.buildingType === 'Residential' ? (record.numberOfDwellings || 0) : 0,
  commercial: record.buildingType === 'Commercial' ? (record.numberOfDwellings || 0) : 0,
  mixed: record.buildingType === 'Mixed' ? (record.numberOfDwellings || 0) : 0
})
