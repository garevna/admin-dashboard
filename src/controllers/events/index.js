import { admin } from './admin'
import { customers } from './customers'
import { documents } from './documents'
import { tickets } from './tickets'
import { categories } from './categories'
import { services, sla } from './services'
import { rsp } from './rsp'

import { mapWorkerEvents } from './map-worker-events'

import { searchBuildingEvents } from './search-building-events'
import { otherBuildingEvents } from './other-building-events'

import { schedule, booking } from './schedule'

import { settings } from './settings'

import { building } from './building'

const adminWorkerEvents = {
  admin,
  customers,
  documents,
  tickets,
  categories,
  services,
  sla,
  rsp,
  schedule,
  booking,
  settings,
  building
}

export {
  adminWorkerEvents,
  mapWorkerEvents,
  searchBuildingEvents,
  otherBuildingEvents
}
