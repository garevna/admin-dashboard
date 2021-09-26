class BuildingController {
  async post (request) {
    self.postMessage(await self.postBuilding(request.details))
  }

  async patch (request) {
    self.postMessage(await self.patchBuildingDetails(request.key, request.details))
  }

  async delete (request) {
    self.postMessage(await self.deleteBuilding(request.key))
  }
}

export const buildingController = new BuildingController()
