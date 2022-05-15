export const getUptake = (sourceData) => {
  const { premisesPassed, connections } = sourceData

  const [total, residential, commercial] = [
    Math.round(connections.active * 10000 / premisesPassed.total) / 100 + ' %',
    Math.round(connections.residential * 10000 / premisesPassed.total) / 100 + ' %',
    Math.round(connections.commercial * 10000 / premisesPassed.total) / 100 + ' %'
  ]

  return { total, residential, commercial }
}
