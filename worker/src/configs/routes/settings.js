const { settingsController } = require('../../controllers').default

export const settings = {
  refresh: settingsController.refresh,
  get: settingsController.get,
  update: settingsController.update
}
