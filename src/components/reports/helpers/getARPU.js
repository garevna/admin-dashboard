export const getARPU = sourceData => {
  const { dynamic, residentialDynamic, commercialDynamic, connections } = sourceData
  const current = Object.keys(dynamic).sort().pop()

  const [total, residential, commercial] = [
    `$ ${Math.round((dynamic[current] / connections.active + Number.EPSILON) * 100) / 100}`,
    `$ ${Math.round((residentialDynamic[current] / connections.residential + Number.EPSILON) * 100) / 100}`,
    `$ ${Math.round((commercialDynamic[current] / connections.commercial + Number.EPSILON) * 100) / 100}`
  ]

  return { total, residential, commercial }
}
