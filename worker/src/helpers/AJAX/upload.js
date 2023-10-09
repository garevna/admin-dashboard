import { readLocalFile, uploadFile } from './'

import { uploads, invalidRoute, invalidFileType, uploadFailed } from '../../configs'

const testSubroute = subroute => Object.keys(uploads.building).includes(subroute)

export const upload = async ({ file, recordId, route, subroute }) => {
  if (Object.keys(uploads).indexOf(route) === -1) return invalidRoute
  if (route === 'building' && !testSubroute(subroute)) return invalidRoute

  const descriptor = route === 'building' ? uploads.building[subroute] : uploads[route]

  if (file.type.indexOf(descriptor.type) === -1) return invalidFileType

  const loaded = await readLocalFile(file)

  if (loaded.status !== 200) return loaded

  const response = await uploadFile[route](loaded.result, recordId, subroute)

  return response.status !== 200 ? Object.assign(response, uploadFailed) : response
}
