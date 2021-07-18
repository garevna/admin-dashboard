import { readLocalFile, post } from '../AJAX'

import { uploads, invalidFileType, uploadFailed } from '../../configs'

export const uploadNewSLA = async (title, file) => {
  self.postDebugMessage({ title, file, uploads })

  const success = {
    message: true,
    messageType: 'File upload',
    messageText: `File ${file.name} has been uploaded as ${title}`
  }

  if (file.type !== 'application/pdf') return invalidFileType

  const loaded = await readLocalFile(file)

  if (loaded.status !== 200) return loaded

  const response = await post('sla', { title, content: loaded.result })

  self.postDebugMessage({ response })

  return response.status !== 200 ? Object.assign(response, uploadFailed)
    : Object.assign(success, { status: 200, result: response.data, route: 'sla', action: 'post' })
}
