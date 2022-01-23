import { getAllRecords } from '../db'

const [route, action] = ['documents', 'list']

export const getFullDocumentsList = async () => {
  const { status, result } = await getAllRecords('documents')

  if (status !== 200) return self.errorMessage('documentsFolderListError')

  return { status, route, action, result }
}
