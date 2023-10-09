import { get } from '../AJAX'

const [route, action] = ['documents', 'get']

export const getDocumentContent = async (documentId) => {
  const { status, result } = await get(`documents/${documentId}`)

  if (status !== 200) return self.errorMessage('documentContentError')

  return { status, route, action, result }
}
