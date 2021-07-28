import { admin } from './admin'
import { customers } from './customers'
import { tickets } from './tickets'
import { categories } from './categories'
import { services, sla } from './services'
import { rsp } from './rsp'
import { mapWorkerEvents } from './map-worker-events'
import { schedule, booking } from './schedule'

import { building } from './building'

const adminWorkerEvents = {
  admin,
  customers,
  tickets,
  categories,
  services,
  sla,
  rsp,
  schedule,
  booking,
  building
}

export {
  adminWorkerEvents,
  mapWorkerEvents
}
