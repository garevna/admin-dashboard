import { getPolygons } from './getPolygons'

const tokml = require('tokml')

const [route, action] = ['polygons', 'kml']

export const convertToKML = async function () {
  const geojson = await getPolygons()

  const kml = tokml(geojson, {
    name: 'name',
    description: 'description',
    documentName: 'DGtek polygons',
    documentDescription: 'DGtek polygons',
    simplestyle: true
  })

  const blob = new Blob(kml.split(''))

  return ({ status: 200, route, action, result: blob })
}
