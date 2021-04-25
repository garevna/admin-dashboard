import { getBuildingHandler } from './getBuildingHandler'
import { saveBuildingHandler } from './saveBuildingHandler'
import { listBuildingsHandler } from './listBuildingsHandler'
import { buildingsErrorHandler } from './buildingsErrorHandler'
import { buildingsMessageHandler } from './buildingsMessageHandler'

export const setBuildingHandlers = function () {
  window[Symbol.for('map.worker')].addEventListener('message', function (event) {
    if (event.data.status === 300) {
      event.stopImmediatePropagation()
      return console.log('DEBUGGING MESSAGE FROM WORKER:\n', event.data)
    }
  })
  getBuildingHandler()
  saveBuildingHandler()
  listBuildingsHandler()
  buildingsErrorHandler()
  buildingsMessageHandler()
}
