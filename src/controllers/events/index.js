import { admin } from './admin'
import { customers } from './customers'
import { tickets } from './tickets'
import { services } from './services'
import { rsp } from './rsp'
import { mapWorkerEvents } from './map-worker-events'

const adminWorkerEvents = {
  admin,
  customers,
  tickets,
  services,
  rsp
}

export {
  adminWorkerEvents,
  mapWorkerEvents
}
