const { documentsController } = require('../../controllers').default

export const documents = {
  refresh: documentsController.refresh,
  folders: documentsController.folders,
  list: documentsController.list,
  dir: documentsController.folderContent,
  rsp: documentsController.listForPartner,
  get: documentsController.get,
  read: documentsController.read,
  post: documentsController.post,
  update: documentsController.update,
  patch: documentsController.patch
}
