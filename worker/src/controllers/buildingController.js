class BuildingController {
  async patch (request) {
    self.postMessage(await self.patchBuildingDetails(request.buildingId, request.details))
  }

  async delete (request) {
    self.postMessage(await self.deleteBuilding(request.buildingId))
  }
}

export const buildingController = new BuildingController()
