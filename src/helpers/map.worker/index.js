// import { getBuildingHandler } from './getBuildingHandler'
// import { saveBuildingHandler } from './saveBuildingHandler'
// import { listBuildingsHandler } from './listBuildingsHandler'
// import { buildingsErrorHandler } from './buildingsErrorHandler'
// import { buildingsMessageHandler } from './buildingsMessageHandler'

const mapWorkerEvents = [
  'on-net',
  'footprint',
  'construction-commenced',
  'comming-soon',
  'not-available',
  'buildings-address-list',
  'buildings-data-list',
  'get-by-id',
  'get-by-address',
  'put',
  'post'
]

export const setBuildingHandlers = function () {
  mapWorkerEvents.forEach((eventName) => {
    console.log(eventName)
    window[Symbol.for('map.worker')].addEventListener(eventName, function (event) {
      window[Symbol.for('vue.instance')].$root.$emit(eventName, event.data)
    })
  })
  // window[Symbol.for('map.worker')].addEventListener('message', function (event) {
  //   if (event.data.status === 300) {
  //     event.stopImmediatePropagation()
  //     return console.log('DEBUGGING MESSAGE FROM WORKER:\n', event.data)
  //   }
  // })
  // getBuildingHandler()
  // saveBuildingHandler()
  // listBuildingsHandler()
  // buildingsErrorHandler()
  // buildingsMessageHandler()
}
