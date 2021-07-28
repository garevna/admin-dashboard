class BuildingController {
  async patch (request) {
    self.postMessage(await self.patchBuildingDetails(request.buildingId, request.details))
  }
}

export const buildingController = new BuildingController()
