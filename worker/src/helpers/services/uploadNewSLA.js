import { readLocalFile, post } from '../AJAX'

import { invalidFileType, uploadFailed } from '../../configs'

const [route, action] = ['files', 'read']

export const uploadNewSLA = async (title, file) => {
  const success = {
    message: true,
    messageType: 'File upload',
    messageText: `File ${file.name} has been uploaded as ${title}`
  }

  if (file.type !== 'application/pdf') return invalidFileType

  const loaded = await readLocalFile(file)

  if (loaded.status !== 200) return loaded

  const response = await post('sla', { title, content: loaded.result })

  return response.status !== 200
    ? Object.assign(response, uploadFailed)
    : Object.assign(success, { status: 200, route, action, result: response.data })
}
