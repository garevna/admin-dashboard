import {
  dbName,
  storeNames,
  mainKeys,
  dbKeys,

  dbVersionHandler,
  correctVersionNumber,
  testDBVersion,
  upgradeNeededEventHandler,
  upgradeDB
} from './initDB'

// import { putBooking } from './putBooking'
import { filteredHandler, iterateCustomers, getCustomersForExcel, updateStatistics, search } from './customers'

import { clearStore } from './clearStore'
import { putRecordByKey } from './putRecordByKey'
import { putRecords } from './putRecords'

import { getRecordByKey } from './getRecordByKey'
import { getAllRecords } from './getAllRecords'
import { deleteRecordByKey } from './deleteRecordByKey'

import { countRecords } from './countRecords'

import {
  searchServiceByName,
  partialSearchService
} from './services'

export {
  dbName,
  storeNames,
  mainKeys,
  dbKeys,

  dbVersionHandler,
  correctVersionNumber,
  testDBVersion,
  upgradeNeededEventHandler,
  upgradeDB,

  searchServiceByName,
  partialSearchService,

  clearStore,
  putRecordByKey,
  putRecords,
  getRecordByKey,
  countRecords,
  deleteRecordByKey,
  getAllRecords,
  iterateCustomers,
  updateStatistics,
  getCustomersForExcel,
  search,

  filteredHandler
}
