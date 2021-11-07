// import { searchBuildingEvents, otherBuildingEvents } from '../events'
// import { catchMapWorkerEvent } from './catchMapWorkerEvent'

export const mapWorkerReadyCallback = function (event) {
  console.log('MAP WORKER IS READY\n', event)
  window[Symbol.for('map.worker')].onmessage = null
  console.log(window[Symbol.for('map.worker')])

  console.group('MAP WORKER EVENTS')
  // for (const eventName of searchBuildingEvents.concat(otherBuildingEvents)) {
  //   console.log(eventName)
  //   window[Symbol.for('map.worker')].addEventListener('message', catchMapWorkerEvent)
  // }
  console.groupEnd('MAP WORKER EVENTS')
}
