import { get } from '../AJAX'
import { putRecordByKey } from '../db'

const [route, action] = ['documents', 'refresh']

export const refreshDocumentsList = async function () {
  const response = await get('documents')

  if (response.status !== 200) return self.errorMessage('refreshDocumentsListError')

  for (const document of response.result) {
    const { status } = await putRecordByKey('documents', document._id, document)
    if (status !== 200) return self.errorMessage('refreshDocumentsListError')
  }

  return Object.assign(response, { route, action })
}
