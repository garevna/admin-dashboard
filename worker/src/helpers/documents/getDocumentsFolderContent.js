import { getAllRecords } from '../db'

const [route, action] = ['documents', 'dir']

export const getDocumentsFolderContent = async (folder) => {
  const { status, result } = await getAllRecords('documents')

  if (status !== 200) return self.errorMessage('documentsFolderListError')

  return {
    status,
    route,
    action,
    result: result.map(document => document.folder === folder)
  }
}
