import { getAllRecords } from '../db'

const [route, action] = ['documents', 'folders']

export const getDocumentFolders = async () => {
  const { status, result } = await getAllRecords('documents')

  if (status !== 200) return self.errorMessage('documentsFolderListError')

  return {
    status,
    route,
    action,
    result: Array.from(new Set(result.map(document => document.folder)))
  }
}
