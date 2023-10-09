import { buildingSettingsHandler } from '../../data-handlers'

const [route, action, section] = ['settings', 'get', 'buildingSettings']

export const getBuildingSettings = () => ({
  status: 200,
  route,
  action,
  section,
  result: buildingSettingsHandler()
})
