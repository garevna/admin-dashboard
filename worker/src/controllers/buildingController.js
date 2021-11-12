class BuildingController {
  async post (request) {
    self.postMessage(await self.postBuilding(request.details))
  }

  async patch (request) {
    self.postMessage(await self.patchBuildingDetails(request.key, request.details))
  }

  async patchGroup (request) {
    self.postMessage(await self.patchBuildingsGroup(request.keys, request.details))
  }

  async delete (request) {
    self.postMessage(await self.deleteBuilding(request.key))
  }

  async excel (request) {
    self.postDebugMessage({ data: request.data })
    self.postMessage(await self.createBuildingExcelFile(request.data))
  }
}

export const buildingController = new BuildingController()
