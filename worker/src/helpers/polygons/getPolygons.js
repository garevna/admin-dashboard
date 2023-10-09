import {
  polygonColors,
  polygonsEndpoint
} from '../../configs'

function updatePolygonStyles (collection) {
  for (const feature of collection.features) {
    Object.assign(feature.properties, {
      stroke: polygonColors[feature.properties.typeOf],
      'stroke-width': 0.5,
      'stroke-opacity': 0.7,
      fill: polygonColors[feature.properties.typeOf],
      'fill-opacity': 0.4
    })
  }

  return collection
}

export const getPolygons = async () => {
  const response = await (await fetch(polygonsEndpoint)).json()

  return updatePolygonStyles(response.data)
}
