class DocumentsController {
  async refresh () {
    self.postMessage(await self.refreshDocumentsList())
  }

  async folders () {
    self.postMessage(await self.getDocumentFolders())
  }

  async folderContent (request) {
    self.postMessage(await self.getDocumentsFolderContent(request.folder))
  }

  async list () {
    self.postMessage(await self.getFullDocumentsList())
  }

  async listForPartner (request) {
    self.postMessage(await self.getDocumentsByRSP(request.resellerId))
  }

  async get (request) {
    self.postMessage(await self.getDocumentContent(request.key))
  }

  async read (request) {
    self.postMessage(await self.readLocalDocument(request.file))
  }

  async post (request) {
    self.postMessage(await self.postDocument(request.data))
  }

  async update (request) {
    self.postMessage(await self.updateDocument(request.key, request.data))
  }

  async patch (request) {
    self.postMessage(await self.patchDocument(request.key, request.data))
  }
}

export const documentsController = new DocumentsController()
