import { patch } from '../AJAX'

const [route, action] = ['documents', 'post']

export const patchDocument = async (documentId, data) => {
  if (!documentId) return self.errorMessage('invalidRequest')

  const { status, result } = await patch(`documents/${documentId}`, data)

  if (status !== 200) return self.errorMessage('updateDocumentError')

  return { status, route, action, result }
}
