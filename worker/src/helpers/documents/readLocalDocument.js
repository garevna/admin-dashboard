import { readLocalFile } from '../AJAX'

export const readLocalDocument = async (file) => {
  return Object.assign(await readLocalFile(file), { route: 'documents', action: 'read' })
}
