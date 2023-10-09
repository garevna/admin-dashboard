import { roundFloat } from './'

export const getARPU = sourceData => {
  const { dynamic, residentialDynamic, commercialDynamic, connections } = sourceData
  const current = Object.keys(dynamic).sort().pop()

  const [total, residential, commercial] = [
    `$ ${roundFloat(dynamic[current] / connections.active)}`,
    `$ ${roundFloat(residentialDynamic[current] / connections.residential)}`,
    `$ ${roundFloat(commercialDynamic[current] / connections.commercial)}`
  ]

  return { total, residential, commercial }
}
