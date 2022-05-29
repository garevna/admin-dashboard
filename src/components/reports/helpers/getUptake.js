import { roundFloat } from './'

export const getUptake = (sourceData) => {
  const { premisesPassed, connections } = sourceData

  const [total, residential, commercial] = [
    roundFloat(connections.active * 100 / premisesPassed.total) + '%',
    roundFloat(connections.residential * 100 / premisesPassed.total) + '%',
    roundFloat(connections.commercial * 100 / premisesPassed.total) + '%'
  ]

  return { total, residential, commercial }
}
