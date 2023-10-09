module.exports = function (buildingDynamic) {
  const dynamic = {}

  for (const record of buildingDynamic) {
    for (const date in record.data) {
      if (!dynamic[date]) dynamic[date] = 0
      dynamic[date] += record.data[date]
    }
  }

  return dynamic
}
