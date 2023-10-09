class SettingsController {
  async refresh () {
    self.postMessage(await self.refreshSettings())
  }

  async get (request) {
    if (request.key === 'all' || request.key === '*') self.postMessage(await self.getSettings(request.section))
    else self.postMessage(await self.getSettings(request.section, request.key))
  }

  async update (request) {
    self.postMessage(await self.updateSettings(request.section, request.data))
  }
}

export const settingsController = new SettingsController()
